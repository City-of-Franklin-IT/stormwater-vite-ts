import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { useForm, useFormContext } from "react-hook-form"
import { useQueryClient } from "@tanstack/react-query"
import Point from "@arcgis/core/geometry/Point"
import Graphic from "@arcgis/core/Graphic"
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer"
import PictureMarkerSymbol from "@arcgis/core/symbols/PictureMarkerSymbol"
import { TextSymbol } from "@arcgis/core/symbols"
import { useEnableQuery } from "@/helpers/hooks"
import pinWarningIcon from "@/assets/icons/pin/warning-pin.png"
import { handleCreateSite } from "./utils"

// Types
import * as AppTypes from "@/context/App/types"
import { errorPopup, savedPopup } from "@/utils/Toast/Toast"

/**
* Returns create site form methods, form submit function, and cancel button onClick handler
**/
export const useHandleCreateSiteForm = () => {
  const methods = useCreateSiteForm()
  const handleFormSubmit = useHandleFormSubmit()
  const onCancelBtnClick = useOnCancelBtnClick()

  return { methods, handleFormSubmit, onCancelBtnClick }
}

/**
* Returns create site form context
**/
export const useCreateSiteFormContext = () => { // CreateSiteForm context
  const methods = useFormContext<AppTypes.SiteCreateInterface>()

  return methods
}

/**
* Handles create site map view and graphics; mapRef points to the declarative <arcgis-map> element
**/
export const useSetCreateSiteMapView = (mapRef: React.RefObject<HTMLArcgisMapElement>) => {
  const [state, setState] = useState<{ view: __esri.MapView | null, isLoaded: boolean }>({ view: null, isLoaded: false })

  useMapViewReady(mapRef, setState)
  useSetMapGraphics(state)
}

/**
* Returns cancel button onClick handler
**/
const useOnCancelBtnClick = () => {
  const navigate = useNavigate()

  const onClick = () => {
    navigate("/sites")
  }

  return onClick
}

/**
* Returns create site form methods
**/
const useCreateSiteForm = () => { // CreateSiteForm useForm state

  return useForm<AppTypes.SiteCreateInterface>({
    mode: "onBlur",
    defaultValues: {
      inspectorId: "",
      name: "",
      preconDate: "",
      location: "",
      xCoordinate: undefined,
      yCoordinate: undefined,
      permit: "",
      cof: "",
      tnq: "",
      greenInfrastructure: null,
      SiteContacts: [],
    }
  })
}

/**
* Returns create site form submit function
**/
const useHandleFormSubmit = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const { enabled, token } = useEnableQuery()

  return async (formData: AppTypes.SiteCreateInterface) => {
    if(!enabled || !token) return 

    const result = await handleCreateSite(formData, token).catch(err => console.log(err))

    if(!result?.success) {
      errorPopup(result?.msg || 'Error Creating Site')
      navigate("/sites")
      return
    } else savedPopup(result?.msg)

    queryClient.invalidateQueries({ queryKey: ["getSites"] })
    queryClient.invalidateQueries({ queryKey: ["getInspector"] })
    navigate(`/site/${ result.data.uuid }`)
  }
}

/**
* Reads the MapView off the declarative <arcgis-map> element once it's ready, wires up the
* point/text graphics layers, and sets the form's coordinates from map clicks
**/
const useMapViewReady = (mapRef: React.RefObject<HTMLArcgisMapElement>, setState: React.Dispatch<React.SetStateAction<{ view: __esri.MapView | null, isLoaded: boolean }>>) => {
  const { setValue } = useFormContext<AppTypes.SiteCreateInterface>()

  useEffect(() => {
    const mapEl = mapRef.current
    if(!mapEl) return

    let clickHandle: { remove: () => void } | undefined

    const onViewReady = () => {
      const view = mapEl.view
      if(!view) return

      const pointGraphicsLayer = new GraphicsLayer({ id: "pointGraphicsLayer" })
      const textGraphicsLayer = new GraphicsLayer({ id: "textGraphicsLayer" })
      view.map?.addMany([pointGraphicsLayer, textGraphicsLayer])

      clickHandle = view.on("click", async (e) => {
        const mappoint = e.mapPoint

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
  }, [mapRef, setState, setValue])
}

/**
* Handles map graphics
**/
const useSetMapGraphics = (state: { view: __esri.MapView | null }) => {
  const { watch } = useFormContext<AppTypes.SiteCreateInterface>()

  const xCoordinate = watch("xCoordinate")
  const yCoordinate = watch("yCoordinate")

  useEffect(() => {
    if(!state.view) return

    const coordinates = { xCoordinate, yCoordinate }

    const pointGraphicsLayer = state.view.map?.findLayerById("pointGraphicsLayer") as GraphicsLayer
    const textGraphicsLayer = state.view.map?.findLayerById("textGraphicsLayer") as GraphicsLayer
    pointGraphicsLayer.removeAll()
    textGraphicsLayer.removeAll()

    if(coordinates.xCoordinate && coordinates.yCoordinate) {
      const point = new Point({
      longitude: coordinates.xCoordinate,
      latitude: coordinates.yCoordinate
      })

      const pictureMarker = new PictureMarkerSymbol({
        url: pinWarningIcon, 
        width: "32px",
        height: "32px",
        yoffset: "14px"
      })

      const graphic = new Graphic({
        geometry: point,
        symbol: pictureMarker
      })

      const labelText = new TextSymbol({
        text: "New Site Location",
        color: "#FFFFFF",
        yoffset: -14,
        font: { size: 10 }
      })

      const label = new Graphic({
        geometry: point,
        symbol: labelText
      })

      pointGraphicsLayer.add(graphic)
      textGraphicsLayer.add(label)
    }
  }, [state, xCoordinate, yCoordinate])
}