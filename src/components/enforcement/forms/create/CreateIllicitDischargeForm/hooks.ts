import React, { useCallback, useContext, useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router"
import { useQueryClient, useQuery } from "react-query"
import { useForm, useFormContext } from "react-hook-form"
import EnforcementCtx from "@/components/enforcement/context"
import Map from '@arcgis/core/Map'
import MapView from '@arcgis/core/views/MapView'
import Point from '@arcgis/core/geometry/Point'
import Graphic from '@arcgis/core/Graphic'
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer'
import PictureMarkerSymbol from "@arcgis/core/symbols/PictureMarkerSymbol"
import Search from "@arcgis/core/widgets/Search"
import { TextSymbol } from "@arcgis/core/symbols"
import pinErrorIcon from '@/assets/icons/pin/error-pin.png'
import { useEnableQuery } from "@/helpers/hooks"
import { formatDate } from "@/helpers/utils"
import { errorPopup } from "@/utils/Toast/Toast"
import * as AppActions from '@/context/App/AppActions'
import { authHeaders } from "@/helpers/utils"
import { handleCreateIllicitDischarge } from "./utils"

// Types
import * as AppTypes from '@/context/App/types'

export const useCreateIllicitDischargeForm = (site: AppTypes.SiteInterface | undefined) => { // CreateSiteIllicitDischargeForm useForm
  const { formDate } = useContext(EnforcementCtx)

  return useForm<AppTypes.IllicitDischargeCreateInterface>({
    mode: 'onBlur',
    defaultValues: {
      siteId: site?.siteId || null,
      date: formatDate(formDate),
      xCoordinate: site?.xCoordinate || null,
      yCoordinate: site?.yCoordinate || null,
      locationDescription: '',
      inspectorId: site?.inspectorId || null,
      details: '',
      responsibleParty: '',
      volumeLost: '',
      streamWatershed: undefined,
      otherStreamWatershed: '',
      enforcementAction: '',
      penaltyDate: null,
      penaltyAmount: null,
      penaltyDueDate: null,
      paymentReceived: null,
      compliance: null,
      closed: null,
      FollowUpDates: []
    }
  })
}

export const useCreateIllicitDischargeFormContext = () => { // CreateSiteIllicitDischargeForm context
  const methods = useFormContext<AppTypes.IllicitDischargeCreateInterface>()

  return methods
}

export const useSetInspectorOptions = () => { // Return inspectors and set <select> options
  const { enabled, token } = useEnableQuery()

  const result = useQuery('getInspectors', () => AppActions.getInspectors(authHeaders(token)), { enabled })

  if(result.data?.success) {
    const inspectors = result.data.data

    return inspectors.map(inspector => {
      return { value: inspector.inspectorId, text: inspector.name }
    })
  } else return []
}

export const useSetIllicitDischargeMapView = (mapRef: React.RefObject<HTMLDivElement>) => {
  const [state, setState] = useState<{ view: __esri.MapView | null, isLoaded: boolean }>({ view: null, isLoaded: false })

  useCreateMapView(mapRef, setState)
  useSetMapGraphics(state)

  useEffect(() => {
    if(state.view) {
      state.view.when(() => {
        setState(prevState => ({ ...prevState, isLoaded: true }))
      })
    }

    return () => state.view?.destroy()
  }, [state.view])
}

export const useHandleFormSubmit = () => { // Handle form submit
  const { enabled, token } = useEnableQuery()

  const queryClient = useQueryClient()

  const navigate = useNavigate()

  const { uuid: siteUUID } = useParams<{ uuid: string }>()

  return useCallback((formData: AppTypes.IllicitDischargeCreateInterface) => {
    if(!enabled || !token) {
      return
    }

    handleCreateIllicitDischarge(formData, token)
      .then(() => {
        queryClient.invalidateQueries('getIllicitDischarges')
        queryClient.invalidateQueries(['getSite', siteUUID])
        navigate('/enforcement/discharges')
      })
      .catch(err => errorPopup(err))
  }, [enabled, token, navigate, queryClient, siteUUID])
}

const useCreateMapView = (mapRef: React.RefObject<HTMLDivElement>, setState: React.Dispatch<React.SetStateAction<{ view: __esri.MapView | null, isLoaded: boolean }>>) => {
  const { setValue } = useFormContext<AppTypes.IllicitDischargeCreateInterface>()

  useEffect(() => {
    if(!mapRef?.current) return

    const map = new Map({ basemap: 'dark-gray-vector' })

    const mapView = new MapView({
      container: mapRef.current,
      map,
      center: [-86.86897349, 35.92531721],
      zoom: 12,
      ui: { components: [] }
    })

    const searchWidget = new Search({ view: mapView })

    mapView.when(() => {
      mapView.ui.add(searchWidget, {
        position: 'top-left'
      })

      setState(prevState => ({ ...prevState, view: mapView }))
    })

    const pointGraphicsLayer = new GraphicsLayer({ id: 'pointGraphicsLayer' })
    map.add(pointGraphicsLayer)

    setState(prevState => ({ ...prevState, view: mapView }))

    const onMapClick = mapView.on("click", (e) => {
      const mappoint = e.mapPoint

      setValue('xCoordinate', mappoint.longitude, { shouldValidate: true, shouldDirty: true })
      setValue('yCoordinate', mappoint.latitude, { shouldValidate: true, shouldDirty: true })
    })

    return () => {
      setTimeout(() => {
        onMapClick?.remove()
        searchWidget?.destroy()
        mapView?.destroy()
      }, 50)
    }
  }, [mapRef, setValue, setState])
}

const useSetMapGraphics = (state: { view: __esri.MapView | null }) => {
  const { watch } = useFormContext<AppTypes.IllicitDischargeCreateInterface>()

  const xCoordinate = watch('xCoordinate')
  const yCoordinate = watch('yCoordinate')


  useEffect(() => {
    if(!state.view) return

    const coordinates = { xCoordinate, yCoordinate }

    const pointGraphicsLayer = state.view.map.findLayerById('pointGraphicsLayer') as GraphicsLayer

    pointGraphicsLayer.removeAll()

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
        text: 'Illicit Discharge Location',
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