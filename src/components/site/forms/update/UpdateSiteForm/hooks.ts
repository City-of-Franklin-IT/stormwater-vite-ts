import { useContext, useEffect, useState, useRef } from "react"
import { useForm, useFormContext } from "react-hook-form"
import { useQueryClient } from "@tanstack/react-query"
import Map from '@arcgis/core/Map'
import MapView from '@arcgis/core/views/MapView'
import Point from '@arcgis/core/geometry/Point'
import Graphic from '@arcgis/core/Graphic'
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer'
import PictureMarkerSymbol from "@arcgis/core/symbols/PictureMarkerSymbol"
import { TextSymbol } from "@arcgis/core/symbols"
import EnforcementCtx from "@/components/enforcement/context"
import SiteCtx from "@/components/site/context"
import { useEnableQuery } from "@/helpers/hooks"
import { formatDate } from "@/helpers/utils"
import pinWarningIcon from '@/assets/icons/pin/warning-pin.png'
import { errorPopup, savedPopup } from "@/utils/Toast/Toast"
import { handleUpdateSite } from "./utils"

// Types
import * as AppTypes from '@/context/App/types'

/**
* Returns update site form methods, cancel button onClick handler, and form submit function
**/
export const useHandleUpdateSiteForm = (site: AppTypes.SiteInterface) => {
  const methods = useUpdateSiteForm(site)
  const onCancelBtnClick = useOnCancelBtnClick()
  const handleFormSubmit = useHandleFormSubmit()

  return { methods, onCancelBtnClick, handleFormSubmit }
}

/**
* Returns update site form context
**/
export const useUpdateSiteFormContext = () => { // UpdateSiteForm context
  const methods = useFormContext<AppTypes.SiteCreateInterface>()

  return methods
}


/**
* Handles update site map view and graphics
**/
export const useSetCreateSiteMapView = () => {
  const [state, setState] = useState<{ view: __esri.MapView | null, isLoaded: boolean }>({ view: null, isLoaded: false })

  const mapRef = useRef<HTMLDivElement|null>(null)

  useCreateMapView(mapRef, setState)
  useSetMapGraphics(state)
  
  useEffect(() => {
    if(state.view) {
      state.view.when(() => {
        setState(prevState => ({ ...prevState, isLoaded: true }))
      })
    }
  }, [state.view])

  return mapRef
}

/**
* Returns inactive site checkbox onChange handler and checked boolean
**/
export const useHandleInactiveCheckbox = () => {
  const { getValues, setValue, watch } = useUpdateSiteFormContext()

  const siteId = getValues('siteId')

  const checked = !!watch('InactiveSite.siteId')

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.checked ? String(siteId) : ''

    setValue('InactiveSite.siteId', value)
  }

  return { checked, onChange }
}

/**
* Returns update site form methods
**/
const useUpdateSiteForm = (site: AppTypes.SiteInterface) => { // UpdateSiteForm useForm state

  return useForm<AppTypes.SiteCreateInterface>({
    mode: 'onBlur',
    defaultValues: {
      siteId: site.siteId,
      name: site.name,
      location: site.location,
      xCoordinate: site.xCoordinate,
      yCoordinate: site.yCoordinate,
      inspectorId: site.inspectorId,
      preconDate: formatDate(site.preconDate),
      permit: site.permit,
      cof: site.cof,
      tnq: site.tnq,
      greenInfrastructure: site.greenInfrastructure,
      SiteContacts: site.SiteContacts,
      InactiveSite: site.InactiveSite,
      uuid: site.uuid
    }
  })
}

/**
* Returns update site cancel button onClick handler
**/
const useOnCancelBtnClick = () => {
  const { dispatch: enforcementDispatch } = useContext(EnforcementCtx)
  const { dispatch: siteDispatch } = useContext(SiteCtx)

  const onClick = () => {
    enforcementDispatch({ type: 'RESET_CTX' })
    siteDispatch({ type: 'RESET_CTX' })
  }

  return onClick
}

/**
* Returns update site form submit function
**/
const useHandleFormSubmit = () => {
  const { dispatch } = useContext(SiteCtx)

  const queryClient = useQueryClient()

  const { enabled, token } = useEnableQuery()

  return async (formData: AppTypes.SiteCreateInterface) => {
    if(!enabled || !token) return

    const result = await handleUpdateSite(formData, token)

    if(!result.success) {
      errorPopup(result.msg)
    } else savedPopup(result.msg)

    queryClient.invalidateQueries({ queryKey: ['getSite', formData.uuid] })
    dispatch({ type: 'RESET_CTX' })
  }
}

/**
* Handles update site map view
**/
const useCreateMapView = (mapRef: React.RefObject<HTMLDivElement>, setState: React.Dispatch<React.SetStateAction<{ view: __esri.MapView | null, isLoaded: boolean }>>) => {
  const { setValue, getValues } = useFormContext<AppTypes.SiteCreateInterface>()

  const xCoordinate = getValues('xCoordinate')
  const yCoordinate = getValues('yCoordinate')

  useEffect(() => {
    const coordinates = { xCoordinate, yCoordinate }

    if(!mapRef?.current || !coordinates) return

    const map = new Map({ basemap: 'dark-gray-vector' })

    const mapView = new MapView({
      container: mapRef.current,
      map,
      center: [coordinates.xCoordinate, coordinates.yCoordinate],
      zoom: 16,
      ui: { components: [] }
    })

    mapView.when(() => setState(prevState => ({ ...prevState, view: mapView })))

    const pointGraphicsLayer = new GraphicsLayer({ id: 'pointGraphicsLayer' })
    const textGraphicsLayer = new GraphicsLayer({ id: 'textGraphicsLayer' })
    map.addMany([pointGraphicsLayer, textGraphicsLayer])

    const onMapClick = mapView.on("click", async (e) => {
      const mappoint = e.mapPoint

      setValue('xCoordinate', mappoint.longitude, { shouldValidate: true, shouldDirty: true })
      setValue('yCoordinate', mappoint.latitude, { shouldValidate: true, shouldDirty: true })
    })

    return () => {
      setTimeout(() => {
        onMapClick?.remove()
        mapView?.destroy()
      }, 50)
    }
  }, [mapRef, xCoordinate, yCoordinate, setState, setValue])
}

/**
* Handles update site map graphics
**/
const useSetMapGraphics = (state: { view: __esri.MapView | null }) => {
  const { watch } = useFormContext<AppTypes.SiteCreateInterface>()

  const xCoordinate = watch('xCoordinate')
  const yCoordinate = watch('yCoordinate')

  useEffect(() => {
    if(!state.view) return

    const coordinates = { xCoordinate, yCoordinate }

    const pointGraphicsLayer = state.view.map?.findLayerById('pointGraphicsLayer') as GraphicsLayer
    const textGraphicsLayer = state.view.map?.findLayerById('textGraphicsLayer') as GraphicsLayer
    pointGraphicsLayer?.removeAll()
    textGraphicsLayer?.removeAll()

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
        text: "Site Location",
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