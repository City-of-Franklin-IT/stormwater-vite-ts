import React, { useContext, useState, useEffect, useCallback } from "react"
import { useNavigate } from "react-router"
import Map from '@arcgis/core/Map'
import MapView from '@arcgis/core/views/MapView'
import Point from '@arcgis/core/geometry/Point'
import Graphic from '@arcgis/core/Graphic'
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer'
import PictureMarkerSymbol from "@arcgis/core/symbols/PictureMarkerSymbol"
import Search from "@arcgis/core/widgets/Search"
import { TextSymbol } from "@arcgis/core/symbols"
import { mapHitTest } from "@/helpers/utils"
import SitesCtx, { BasemapType } from "../../context"
import { setSiteMarker } from './utils'

// Types
import * as AppTypes from '@/context/App/types'
import Multipoint from '@arcgis/core/geometry/Multipoint'
import { MapHitInterface } from './types'

export const useSetTableDataProps = () => {
  const { searchValue, showActiveSitesOnly, showOpenIssuesOnly } = useContext(SitesCtx)

  return { searchValue, showActiveSitesOnly, showOpenIssuesOnly }
}

type UseSetTableDataProps = { sites: AppTypes.SiteInterface[], searchValue: string, showActiveSitesOnly: boolean, showOpenIssuesOnly: boolean }

export const useSetTableData = (props: UseSetTableDataProps) => {
  let array = props.sites || []

  if(props.searchValue) {
    const regex = new RegExp(props.searchValue, 'i')

    array = array.filter(site => {
      const searchableProps: (keyof AppTypes.SiteInterface)[] = ['name', 'cof', 'permit']
      
      return searchableProps.some(prop => {
        const value = site[prop]
        return value && regex.test(value as string)
      })
    })
  }

  if(props.showActiveSitesOnly) { // Show active sites only filter
    array = array.filter(site => !site.inactive)
  }

  if(props.showOpenIssuesOnly) { // Show open issues only filter
    array = array.filter(site => {
      if(site.hasOpenComplaint || site.hasOpenIllicitDischarge || site.hasOpenViolation) {
        return site
      }
    })
  }

  return array
}

export const useSetSitesMapView = (mapRef: React.RefObject<HTMLDivElement>, sites: AppTypes.SiteInterface[]) => {
  const [state, setState] = useState<{ view: __esri.MapView | null, isLoaded: boolean }>({ view: null, isLoaded: false })

  useCreateMapView(mapRef, sites, setState)

  useSetMapGraphics(sites, state)

  useEffect(() => {
    if(state.view) {
      state.view.when(() => {
        setState(prevState => ({ ...prevState, isLoaded: true }))
      })
    }
  }, [state.view])
}

export const useHandleSearch = () => {
  const { searchValue, dispatch } = useContext(SitesCtx)

  const cb = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_SEARCH_VALUE', payload: e.currentTarget.value })
  }, [dispatch])

  return { onSearchChange: cb, searchValue }
}

export const useHandleBtns = () => {
  const { showActiveSitesOnly, dispatch } = useContext(SitesCtx)

  const onActiveSitesBtnClick = () => dispatch({ type: 'TOGGLE_SHOW_ACTIVE_SITES_ONLY' })

  const onOpenIssuesBtnClick = () => dispatch({ type: 'TOGGLE_OPEN_ISSUES_ONLY' })

  return { onActiveSitesBtnClick, onOpenIssuesBtnClick, showActiveSitesOnly }
}

export const useHandleBasemapSelect = () => {
  const { basemap, dispatch } = useContext(SitesCtx)

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: 'SET_BASEMAP', payload: e.currentTarget.value as BasemapType})
  }

  return { onChange, basemap }
}

export const useSetMapViewProperties = (sites: AppTypes.SiteInterface[], mapRef: React.RefObject<HTMLDivElement>) => {

  return useCallback((map: __esri.Map) => {
    if(sites.length) {
      const multipoint = new Multipoint({
        points: sites.map(site => [site.xCoordinate, site.yCoordinate])
      })

      const viewExtent = multipoint.extent

      const properties: __esri.MapViewProperties = {
        container: mapRef.current as HTMLDivElement,
        map,
        extent: viewExtent?.expand(1.1),
        ui: { components: [] }
      }

      return properties
    }

    const properties: __esri.MapViewProperties = {
      container: mapRef.current as HTMLDivElement,
      map,
      center: [-86.86897349, 35.92531721],
      zoom: 12,
      ui: { components: [] }
    }

    return properties
  }, [sites, mapRef])
}

const useCreateMapView = (mapRef: React.RefObject<HTMLDivElement>, sites: AppTypes.SiteInterface[], setState: React.Dispatch<React.SetStateAction<{ view: __esri.MapView | null, isLoaded: boolean }>>) => {
  const { basemap } = useContext(SitesCtx)
  
  const navigate = useNavigate()

  const mapViewPropertes = useSetMapViewProperties(sites, mapRef)

  useEffect(() => {
    if(!mapRef?.current) return

    const map = new Map({ basemap })

    const properties = mapViewPropertes(map)

    const mapView = new MapView({ ...properties })

    mapView.when(() => {
      const searchWidget = new Search({ view: mapView })
      
      mapView.ui.add(searchWidget, {
        position: 'top-left'
      })

      setState(prevState => ({ ...prevState, view: mapView }))
    })

    const pointGraphicsLayer = new GraphicsLayer({ id: 'pointGraphicsLayer' })
    const textGraphicsLayer = new GraphicsLayer({ id: 'textGraphicsLayer', minScale: 20000 })
    map.addMany([pointGraphicsLayer, textGraphicsLayer])

    const onMapClick = mapView.on("click", async (e) => {
      const results = (await mapView.hitTest(e)).results

      const siteHit = mapHitTest(results)

      if(siteHit) {
        const hit = siteHit as MapHitInterface
        navigate(`/site/${ hit.graphic.attributes.uuid }`)
      }
    })

    return () => {
      setTimeout(() => {
        onMapClick.remove()
        mapView.destroy()
      }, 50)
    }
  }, [mapRef, basemap, navigate, mapViewPropertes, setState])
}

const useSetMapGraphics = (sites: AppTypes.SiteInterface[], state: { view: __esri.MapView | null }) => {

  useEffect(() => {
    if(!state.view) return

    const pointGraphicsLayer = state.view.map?.findLayerById('pointGraphicsLayer') as GraphicsLayer
    const textGraphicsLayer = state.view.map?.findLayerById('textGraphicsLayer') as GraphicsLayer
    pointGraphicsLayer.removeAll()
    textGraphicsLayer.removeAll()

    sites.forEach(site => {
      const point = new Point({
        longitude: site.xCoordinate,
        latitude: site.yCoordinate
      })

      const pictureMarker = new PictureMarkerSymbol({
        url: setSiteMarker(site), 
        width: "32px",
        height: "32px",
        yoffset: "14px"
      })

      const graphic = new Graphic({
        geometry: point,
        symbol: pictureMarker,
        attributes: { uuid: site.uuid }
      })

      const labelText = new TextSymbol({
        text: site.name,
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
    })
  }, [state, sites])
}