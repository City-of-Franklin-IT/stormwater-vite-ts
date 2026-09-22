import { useEffect, useContext, useState } from "react"
import { useParams, useNavigate } from "react-router"
import { useQueryClient } from "@tanstack/react-query"
import { useForm, useFormContext } from "react-hook-form"
import EnforcementCtx from "@/components/enforcement/context"
import Point from "@arcgis/core/geometry/Point"
import Graphic from "@arcgis/core/Graphic"
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer"
import PictureMarkerSymbol from "@arcgis/core/symbols/PictureMarkerSymbol"
import TextSymbol from "@arcgis/core/symbols/TextSymbol"
import pinErrorIcon from "@/assets/icons/pin/error-pin.png"
import { useEnableQuery } from "@/helpers/hooks"
import { formatDate } from "@/helpers/utils"
import { errorPopup, infoPopup, savedPopup } from "@/utils/Toast/Toast"
import { useOnCancelBtnClick } from "../CreateViolationForm/hooks"
import { handleCreateIllicitDischarge } from "../CreateIllicitDischargeForm/utils"
import { handleCreateComplaint } from "./utils"

// Types
import * as AppTypes from "@/context/App/types"
import type MapView from "@arcgis/core/views/MapView"
import type { ClickEvent } from "@arcgis/core/views/input/types"

export enum ConcernEnum {
  AssistanceRequest = "Assistance Request",
  Buffer = "Buffer",
  Draining = "Draining",
  Dumping = "Dumping",
  ErosionSedimentConstruction = "Erosion / Sediment / Construction",
  FishKillSpill = "Fish Kill / Spill",
  FloodingDraining = "Flooding / Draining",
  GarbageDebris = "Garbage / Debris",
  IllicitDischargeSpill = "Illicit Discharge / Spill",
  Leak = "Leak",
  Mosquitoes = "Mosquitoes",
  PostConstructionStormwaterPTP = "Post-construction Stormwater / PTP",
  WaterLineBreak = "Water Line Break",
  Other = "Other"
}

/**
* Returns create complaint form methods, form submit function, and cancel button onClick handler
**/
export const useHandleCreateComplaintForm = (site: AppTypes.SiteInterface | undefined) => {
  const methods = useCreateComplaintForm(site)
  const handleFormSubmit = useHandleFormSubmit()
  const onCancelBtnClick = useOnCancelBtnClick()

  return { methods, handleFormSubmit, onCancelBtnClick }
}

/**
* Returns create complaint form context
**/
export const useCreateComplaintFormContext = () => { 
  const methods = useFormContext<AppTypes.ComplaintCreateInterface>()

  return methods
}

/**
* Handles complaint map view and graphics; mapRef points to the declarative <arcgis-map> element
**/
export const useSetComplaintsMapView = (mapRef: React.RefObject<HTMLArcgisMapElement>) => {
  const [state, setState] = useState<{ view: MapView | null, isLoaded: boolean }>({ view: null, isLoaded: false })

  useMapViewReady(mapRef, setState)
  useSetMapGraphics(state)
}

/**
* Returns create complaint form methods
**/
const useCreateComplaintForm = (site: AppTypes.SiteInterface | undefined) => { 
  const { formDate } = useContext(EnforcementCtx)

  return useForm<AppTypes.ComplaintCreateInterface>({
    mode: "onBlur",
    defaultValues: {
      siteId: site?.siteId || null,
      date: formatDate(formDate),
      details: "",
      inspectorId: site?.inspectorId || null,
      name: "",
      address: "",
      phone: "",
      email: "",
      xCoordinate: site?.xCoordinate || null,
      yCoordinate: site?.yCoordinate || null,
      locationDescription: "",
      concern: undefined,
      otherConcern: "",
      responsibleParty: "",
      comments: "",
      compliance: null,
      closed: null,
      FollowUpDates: []
    }
  })
}

/**
* Returns create complaint form submit function
**/
const useHandleFormSubmit = () => {
  const { enabled, token } = useEnableQuery()

  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { uuid: siteUUID } = useParams<{ uuid: string }>()

  return async (formData: AppTypes.ComplaintCreateInterface) => {
    if(!enabled || !token) return

    const result = await handleCreateComplaint(formData, token)

    if(!result?.success) {
      errorPopup(result?.msg)
      navigate("/enforcement/complaints")
      return
    }

    if(result.data && formData.concern === "Illicit Discharge / Spill") {
      const illicitData: AppTypes.IllicitDischargeCreateInterface = {
        complaintId: result.data.complaintId,
        siteId: formData.siteId,
        date: formData.date,
        xCoordinate: formData.xCoordinate,
        yCoordinate: formData.yCoordinate,
        locationDescription: formData.locationDescription,
        inspectorId: formData.inspectorId,
        details: formData.details,
        responsibleParty: formData.responsibleParty,
        volumeLost: "",
        streamWatershed: "",
        otherStreamWatershed: "",
        enforcementAction: null,
        penaltyDate: null,
        penaltyAmount: null,
        penaltyDueDate: null,
        paymentReceived: null,
        compliance: null,
        closed: null,
        FollowUpDates: formData.FollowUpDates
      }

      const illicitRes = await handleCreateIllicitDischarge(illicitData, token)

      if(!illicitRes?.success) {
        errorPopup(illicitRes?.msg)
      }

      queryClient.invalidateQueries({ queryKey: ["getIllicitDischarges"] })
      infoPopup("Illicit Discharge Created")
    }

    queryClient.invalidateQueries({ queryKey: ["getComplaints"] })
    queryClient.invalidateQueries({ queryKey: ["getSite", siteUUID] })
    queryClient.invalidateQueries({ queryKey: ["getSites"] })
    queryClient.invalidateQueries({ queryKey: ["getInspector"] })
    savedPopup(result.msg)

    const href = formData.concern !== "Illicit Discharge / Spill" ?
      "/enforcement/complaints" :
      "/enforcement/discharges"

    navigate(href)
  }
}

/**
* Reads the MapView off the declarative <arcgis-map> element once it's ready, wires up the
* point graphics layer, and sets the form's coordinates from map clicks
**/
const useMapViewReady = (mapRef: React.RefObject<HTMLArcgisMapElement>, setState: React.Dispatch<React.SetStateAction<{ view: MapView | null, isLoaded: boolean }>>) => {
  const { setValue } = useFormContext<AppTypes.ComplaintCreateInterface>()

  useEffect(() => {
    const mapEl = mapRef.current
    if(!mapEl) return

    let clickHandle: { remove: () => void } | undefined

    const onViewReady = () => {
      const view = mapEl.view
      if(!view) return

      const pointGraphicsLayer = new GraphicsLayer({ id: "pointGraphicsLayer" })
      view.map?.add(pointGraphicsLayer)

      clickHandle = view.on("click", (e: ClickEvent) => {
        const mappoint = e.mapPoint
        if(mappoint.longitude == null || mappoint.latitude == null) return

        setValue("xCoordinate", mappoint.longitude, { shouldValidate: true, shouldDirty: true })
        setValue("yCoordinate", mappoint.latitude, { shouldValidate: true, shouldDirty: true })
      })

      view.when(() => {
        setState(prevState => ({ ...prevState, view, isLoaded: true }))
      })
    }

    mapEl.addEventListener("arcgisViewReadyChange", onViewReady, { once: true })

    return () => {
      mapEl.removeEventListener("arcgisViewReadyChange", onViewReady)
      clickHandle?.remove()
    }
  }, [mapRef, setValue, setState])
}

/**
* Handles complaints map graphics
**/
const useSetMapGraphics = (state: { view: MapView | null }) => {
  const { watch } = useFormContext<AppTypes.ComplaintCreateInterface>()

  const xCoordinate = watch("xCoordinate")
  const yCoordinate = watch("yCoordinate")


  useEffect(() => {
    if(!state?.view?.map) return

    const pointGraphicsLayer = state.view.map.findLayerById("pointGraphicsLayer") as GraphicsLayer
    pointGraphicsLayer.removeAll()

    const coordinates = { xCoordinate, yCoordinate }

    if(coordinates.xCoordinate && coordinates.yCoordinate) {
      const point = new Point({
        longitude: coordinates.xCoordinate,
        latitude: coordinates.yCoordinate
      })

      const pictureMarker = new PictureMarkerSymbol({
        url: pinErrorIcon, 
        width: "32px",
        height: "32px",
        yoffset: "14px"
      })

      const graphic = new Graphic({
        geometry: point,
        symbol: pictureMarker
      })

      const labelText = new TextSymbol({
        text: "Complaint Location",
        color: "#FFFFFF",
        yoffset: -14,
        font: { size: 10 }
      })

      const label = new Graphic({
        geometry: point,
        symbol: labelText
      })

      pointGraphicsLayer.addMany([graphic, label])
    }
  }, [state.view, xCoordinate, yCoordinate])
}