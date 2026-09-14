import { useContext, useEffect, useState, useRef } from "react"
import Map from "@arcgis/core/Map"
import MapView from "@arcgis/core/views/MapView"
import Point from "@arcgis/core/geometry/Point"
import Graphic from "@arcgis/core/Graphic"
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer"
import PictureMarkerSymbol from "@arcgis/core/symbols/PictureMarkerSymbol"
import Home from "@arcgis/core/widgets/Home"
import Zoom from "@arcgis/core/widgets/Zoom"
import BasemapGallery from "@arcgis/core/widgets/BasemapGallery"
import Expand from "@arcgis/core/widgets/Expand"
import { TextSymbol } from "@arcgis/core/symbols"
import { setSiteMarker } from "@/components/sites/containers/SitesContainer/utils"
import EnforcementCtx from "@/components/enforcement/context"
import SiteCtx from "../../context"
import { useAuth } from "@/context/Auth"

// Types
import type * as AppTypes from "@/context/App/types"

/**
* Initializes and manages the ArcGIS map view for a single site page
**/
export const useSetSiteMapView = (mapRef: React.RefObject<HTMLDivElement>, site: AppTypes.SiteInterface) => {
  const [state, setState] = useState<{ view: __esri.MapView | null, isLoaded: boolean }>({ view: null, isLoaded: false })

  useCreateMapView(mapRef, setState, site)
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

/**
* Returns form ref and visibility based on active enforcement form or site UUID
**/
export const useHandleForm = () => {
  const { activeForm } = useContext(EnforcementCtx)
  const { siteUUID } = useContext(SiteCtx)

  const formRef = useRef<HTMLDivElement>(null)

  const visible = !!activeForm || !!siteUUID

  return { formRef, visible }
}

/**
* Returns update site button onClick handler and visibility based on user role
**/
export const useHandleButtons = (uuid: string) => {
  const { siteUUID, dispatch } = useContext(SiteCtx)

  const { canUpdate } = useAuth()

  const onClick = () => {
    const payload = !siteUUID ? uuid : ""
    dispatch({ type: "SET_SITE_UUID", payload })
  }

  const visible = canUpdate

  return { onClick, visible }
}

/**
* Returns checked state and onChange handler for the show closed site issues checkbox
**/
export const useHandleSiteIssuesCheckbox = () => {
  const { showClosedSiteIssues, dispatch } = useContext(SiteCtx)

  const onChange = () => {
    dispatch({ type: "TOGGLE_SHOW_CLOSED_SITE_ISSUES" })
  }

  return { checked: showClosedSiteIssues, onChange }
}

/**
* Creates the ArcGIS MapView instance with basemap widgets and click handler
**/
const useCreateMapView = (mapRef: React.RefObject<HTMLDivElement>, setState: React.Dispatch<React.SetStateAction<{ view: __esri.MapView | null, isLoaded: boolean }>>, site: AppTypes.SiteInterface) => {
  useEffect(() => {
    if(!mapRef?.current) return

    const map = new Map({ basemap: "dark-gray-vector" })

    const mapView = new MapView({
      container: mapRef.current,
      map,
      center: [site.xCoordinate, site.yCoordinate],
      zoom: 16,
      ui: { components: [] }
    })

    mapView.when(() => {
      const homeWidget = new Home({ view: mapView })
      const zoomWidget = new Zoom({ view: mapView })
      const basemapGallery = new BasemapGallery({ view: mapView })
      const basemapExpand = new Expand({ view: mapView, content: basemapGallery })

      mapView.ui.add(homeWidget, { position: "bottom-right" })
      mapView.ui.add(zoomWidget, { position: "bottom-right" })
      mapView.ui.add(basemapExpand, { position: "bottom-right" })

      setState(prevState => ({ ...prevState, view: mapView }))
    })

    const pointGraphicsLayer = new GraphicsLayer({ id: "pointGraphicsLayer" })
    const textGraphicsLayer = new GraphicsLayer({ id: "textGraphicsLayer", minScale: 20000 })
    map.addMany([pointGraphicsLayer, textGraphicsLayer])

    return () => {
      setTimeout(() => {
        mapView.destroy()
      }, 50)
    }
  }, [mapRef, setState, site])
}

/**
* Animates the map view to center on the site coordinates
**/
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

/**
* Renders the site marker and label graphics on the map
**/
const useSetMapGraphics = (site: AppTypes.SiteInterface, state: { view: __esri.MapView | null }) => {

  useEffect(() => {
    if(!state.view || !site) return

    const pointGraphicsLayer = state.view.map?.findLayerById("pointGraphicsLayer") as GraphicsLayer
    const textGraphicsLayer = state.view.map?.findLayerById("textGraphicsLayer") as GraphicsLayer
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