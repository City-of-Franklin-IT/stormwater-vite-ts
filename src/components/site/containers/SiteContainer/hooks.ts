import { useContext, useEffect, useState } from "react"
import SiteCtx from "../../context"
import Map from '@arcgis/core/Map'
import MapView from '@arcgis/core/views/MapView'
import Point from '@arcgis/core/geometry/Point'
import Graphic from '@arcgis/core/Graphic'
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer'
import PictureMarkerSymbol from "@arcgis/core/symbols/PictureMarkerSymbol"
import { TextSymbol } from "@arcgis/core/symbols"
import { setSiteMarker } from "@/components/sites/containers/SitesContainer/utils"

// Types
import * as AppTypes from '@/context/App/types'

export const useSetSiteMapView = (mapRef: React.RefObject<HTMLDivElement>, site: AppTypes.SiteInterface) => {
  const [state, setState] = useState<{ view: __esri.MapView | null, isLoaded: boolean }>({ view: null, isLoaded: false })

  useCreateMapView(mapRef, setState)

  useUpdateMapExtent(state.view, site)

  useSetMapGraphics(site, state)

  useEffect(() => {
    if(state.view) {
      state.view.when(() => {
        setState(prevState => ({ ...prevState, isLoaded: true }))
      })
    }
  }, [state.view])
}

export const useOnUpdateBtnClick = (uuid: string) => {
  const { siteUUID, dispatch } = useContext(SiteCtx)

  const payload = !siteUUID ? uuid : ''

  return () => dispatch({ type: 'SET_SITE_UUID', payload })
}

const useCreateMapView = (mapRef: React.RefObject<HTMLDivElement>, setState: React.Dispatch<React.SetStateAction<{ view: __esri.MapView | null, isLoaded: boolean }>>) => {
  const { basemap } = useContext(SiteCtx)

  useEffect(() => {
    if(!mapRef?.current) return

    const map = new Map({ basemap })

    const mapView = new MapView({
      container: mapRef.current as HTMLDivElement,
      map,
      center: [-86.86897349, 35.92531721],
      zoom: 16,
      ui: { components: [] }
    })

    mapView.when(() => {
      setState(prevState => ({ ...prevState, view: mapView }))
    })

    const pointGraphicsLayer = new GraphicsLayer({ id: 'pointGraphicsLayer' })
    const textGraphicsLayer = new GraphicsLayer({ id: 'textGraphicsLayer', minScale: 20000 })
    map.addMany([pointGraphicsLayer, textGraphicsLayer])

    return () => {
      setTimeout(() => {
        mapView.destroy()
      }, 50)
    }
  }, [mapRef, basemap, setState])
}

const useUpdateMapExtent = (view: __esri.MapView | null, site: AppTypes.SiteInterface) => {

  useEffect(() => {
    if(!view || !site) return

    const point = new Point({
      longitude: site.xCoordinate,
      latitude: site.yCoordinate
    })

    view.goTo({
      target: point,
      zoom: 16
    }, {
      animate: true,
      duration: 300
    }).catch(err => console.log(err))
  }, [view, site])
}

const useSetMapGraphics = (site: AppTypes.SiteInterface, state: { view: __esri.MapView | null }) => {

  useEffect(() => {
    if(!state.view || !site) return

    const pointGraphicsLayer = state.view.map?.findLayerById('pointGraphicsLayer') as GraphicsLayer
    const textGraphicsLayer = state.view.map?.findLayerById('textGraphicsLayer') as GraphicsLayer
    pointGraphicsLayer.removeAll()
    textGraphicsLayer.removeAll()

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
      symbol: pictureMarker
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
  }, [state, site])
}