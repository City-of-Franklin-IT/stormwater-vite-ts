import React, { useCallback, useEffect, useContext, useState } from "react"
import { useParams, useNavigate } from "react-router"
import { useQueryClient } from "react-query"
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
import { handleCreateComplaint } from './utils'

// Types
import * as AppTypes from '@/context/App/types'

export const useCreateComplaintForm = (site: AppTypes.SiteInterface | undefined) => { 
  const { formDate } = useContext(EnforcementCtx)

  return useForm<AppTypes.ComplaintCreateInterface>({
    mode: 'onBlur',
    defaultValues: {
      siteId: site?.siteId || null,
      date: formatDate(formDate),
      details: '',
      inspectorId: site?.inspectorId || null,
      name: '',
      address: '',
      phone: '',
      email: '',
      xCoordinate: site?.xCoordinate || null,
      yCoordinate: site?.yCoordinate || null,
      locationDescription: '',
      concern: undefined,
      otherConcern: '',
      responsibleParty: '',
      comments: '',
      compliance: null,
      closed: null,
      FollowUpDates: []
    }
  })
}

export const useCreateComplaintFormContext = () => { 
  const methods = useFormContext<AppTypes.ComplaintCreateInterface>()

  return methods
}

export const useSetComplaintsMapView = (mapRef: React.RefObject<HTMLDivElement>) => {
  const [state, setState] = useState<{ view: __esri.MapView | null, isLoaded: boolean }>({ view: null, isLoaded: false })

  useCreateMapView(mapRef, setState)
  useSetMapGraphics(state)

  useEffect(() => {
    if(state.view) {
      state.view.when(() => {
        setState(prevState => ({ ...prevState, isLoaded: true }))
      })
    }
  }, [state.view])
}

export const useHandleFormSubmit = () => { // Handle form submit
  const { enabled, token } = useEnableQuery()

  const navigate = useNavigate()

  const queryClient = useQueryClient()

  const { uuid: siteUUID } = useParams<{ uuid: string }>()

  return useCallback((formData: AppTypes.ComplaintCreateInterface) => {
    if(!enabled || !token) {
      return
    }

    handleCreateComplaint(formData, token)
      .then(() => {
        queryClient.invalidateQueries('getComplaints')
        queryClient.invalidateQueries(['getSite', siteUUID])
        navigate('/enforcement/complaints')
      })
      .catch(err => errorPopup(err))
  }, [enabled, token, navigate, queryClient, siteUUID])
}

const useCreateMapView = (mapRef: React.RefObject<HTMLDivElement>, setState: React.Dispatch<React.SetStateAction<{ view: __esri.MapView | null, isLoaded: boolean }>>) => {
  const { setValue } = useFormContext<AppTypes.ComplaintCreateInterface>()

  useEffect(() => {
    if(!mapRef?.current || !mapRef.current.isConnected) return

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
      onMapClick?.remove()
      searchWidget?.destroy()
      mapView.destroy()
    }
  }, [mapRef, setValue, setState])
}

const useSetMapGraphics = (state: { view: __esri.MapView | null }) => {
  const { watch } = useFormContext<AppTypes.ComplaintCreateInterface>()

  const xCoordinate = watch('xCoordinate')
  const yCoordinate = watch('yCoordinate')


  useEffect(() => {
    if(!state.view) return

    const pointGraphicsLayer = state.view.map.findLayerById('pointGraphicsLayer') as GraphicsLayer
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
        text: 'Complaint Location',
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