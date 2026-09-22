import { useContext, useEffect, useState, useRef } from "react"
import Point from "@arcgis/core/geometry/Point"
import Graphic from "@arcgis/core/Graphic"
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer"
import PictureMarkerSymbol from "@arcgis/core/symbols/PictureMarkerSymbol"
import TextSymbol from "@arcgis/core/symbols/TextSymbol"
import { setSiteMarker } from "@/components/sites/containers/SitesContainer/utils"
import EnforcementCtx from "@/components/enforcement/context"
import SiteCtx from "../../context"
import { useAuth } from "@/context/Auth"

// Types
import type * as AppTypes from "@/context/App/types"
import type MapView from "@arcgis/core/views/MapView"

/**
* Initializes and manages the ArcGIS map view for a single site page; mapRef points to the declarative <arcgis-map> element
**/
export const useSetSiteMapView = (mapRef: React.RefObject<HTMLArcgisMapElement>, site: AppTypes.SiteInterface) => {
  const [state, setState] = useState<{ view: MapView | null, isLoaded: boolean }>({ view: null, isLoaded: false })

  useMapViewReady(mapRef, setState)
  useUpdateMapExtent(state.view, site)
  useSetMapGraphics(site, state)
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
* Reads the MapView off the declarative <arcgis-map> element once it's ready and wires up the point/text graphics layers
**/
const useMapViewReady = (mapRef: React.RefObject<HTMLArcgisMapElement>, setState: React.Dispatch<React.SetStateAction<{ view: MapView | null, isLoaded: boolean }>>) => {
  useEffect(() => {
    const mapEl = mapRef.current
    if(!mapEl) return

    const onViewReady = () => {
      const view = mapEl.view
      if(!view) return

      const pointGraphicsLayer = new GraphicsLayer({ id: "pointGraphicsLayer" })
      const textGraphicsLayer = new GraphicsLayer({ id: "textGraphicsLayer", minScale: 20000 })
      view.map?.addMany([pointGraphicsLayer, textGraphicsLayer])

      view.when(() => {
        setState(prevState => ({ ...prevState, view, isLoaded: true }))
      })
    }

    mapEl.addEventListener("arcgisViewReadyChange", onViewReady, { once: true })

    return () => {
      mapEl.removeEventListener("arcgisViewReadyChange", onViewReady)
    }
  }, [mapRef, setState])
}

/**
* Animates the map view to center on the site coordinates
**/
const useUpdateMapExtent = (view: MapView | null, site: AppTypes.SiteInterface) => {

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
const useSetMapGraphics = (site: AppTypes.SiteInterface, state: { view: MapView | null }) => {

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