import { useContext, useState, useEffect } from "react"
import { useNavigate } from "react-router"
import Point from "@arcgis/core/geometry/Point"
import Graphic from "@arcgis/core/Graphic"
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer"
import PictureMarkerSymbol from "@arcgis/core/symbols/PictureMarkerSymbol"
import { TextSymbol } from "@arcgis/core/symbols"
import { mapHitTest } from "@/helpers/utils"
import SitesCtx from "../../context"
import { setSiteMarker } from "./utils"

// Types
import * as AppTypes from "@/context/App/types"
import Multipoint from "@arcgis/core/geometry/Multipoint"

export interface MapHitInterface {
  graphic: {
    attributes: {
      name: string
      hasOpenViolation: boolean
      uuid: string
    }
  }
}

export type FilterableCtx = {
  searchValue: string
  showActiveSitesOnly: boolean
  showOpenIssuesOnly: boolean
  dispatch: React.Dispatch<
    | { type: "TOGGLE_SHOW_ACTIVE_SITES_ONLY" }
    | { type: "TOGGLE_OPEN_ISSUES_ONLY" }
  >
}

/**
* Returns sites table data, active sites button props, and open issues button onClick handler
**/
export const useHandleSitesContainer = (sites: AppTypes.SiteInterface[]) => {
  const tableData = useSetTableData(SitesCtx, sites)
  const { activeSitesBtnProps, onOpenIssuesBtnClick } = useHandleBtns(SitesCtx)

  return { tableData, activeSitesBtnProps, onOpenIssuesBtnClick }
}

/**
* Handles sites map view, extent, and graphics; mapRef points to the declarative <arcgis-map> element
**/
export const useSetSitesMapView = (mapRef: React.RefObject<HTMLArcgisMapElement>, sites: AppTypes.SiteInterface[]) => {
  const [state, setState] = useState<{ view: __esri.MapView | null, isLoaded: boolean }>({ view: null, isLoaded: false })

  useMapViewReady(mapRef, setState)
  useUpdateMapExtent(state.view, sites)
  useSetMapGraphics(sites, state)
}

/**
* Returns sites table data; applies filters and searchValue from context when applicable
**/
export const useSetTableData = <T extends FilterableCtx>(ctx: React.Context<T>, sites: AppTypes.SiteInterface[]) => {
  const { searchValue, showActiveSitesOnly, showOpenIssuesOnly } = useContext(ctx)

  let array = sites || []

  if(searchValue) {
    const regex = new RegExp(searchValue, "i")

    array = array.filter(site => {
      const searchableProps: (keyof AppTypes.SiteInterface)[] = ["name", "cof", "permit"]
      
      return searchableProps.some(prop => {
        const value = site[prop]
        return value && regex.test(value as string)
      })
    })
  }

  if(showActiveSitesOnly) { // Show active sites only filter
    array = array.filter(site => !site.InactiveSite?.siteId && !site.IncompleteSite?.siteId)
  }

  if(showOpenIssuesOnly) { // Show open issues only filter
    array = array.filter(site =>
      site.hasOpenComplaint || site.hasOpenIllicitDischarge || site.hasOpenViolation
    )
  }

  return array
}

/**
* Returns active sites only and open issues only button props
**/
export const useHandleBtns = <T extends FilterableCtx>(ctx: React.Context<T>) => {
  const { showActiveSitesOnly, dispatch } = useContext(ctx)

  const onActiveSitesBtnClick = () => {
    dispatch({ type: "TOGGLE_SHOW_ACTIVE_SITES_ONLY" })
  }

  const onOpenIssuesBtnClick = () => {
    dispatch({ type: "TOGGLE_OPEN_ISSUES_ONLY" })
  }

  const activeSitesBtnProps = {
    showActiveSitesOnly,
    onClick: onActiveSitesBtnClick
  }

  return { activeSitesBtnProps, onOpenIssuesBtnClick }
}

/**
* Reads the MapView off the declarative <arcgis-map> element once it's ready, wires up
* the point/text graphics layers, and forwards marker clicks to the site page
**/
const useMapViewReady = (mapRef: React.RefObject<HTMLArcgisMapElement>, setState: React.Dispatch<React.SetStateAction<{ view: __esri.MapView | null, isLoaded: boolean }>>) => {
  const navigate = useNavigate()

  useEffect(() => {
    const mapEl = mapRef.current
    if(!mapEl) return

    let clickHandle: { remove: () => void } | undefined

    const onViewReady = () => {
      const view = mapEl.view
      if(!view) return

      const pointGraphicsLayer = new GraphicsLayer({ id: "pointGraphicsLayer" })
      const textGraphicsLayer = new GraphicsLayer({ id: "textGraphicsLayer", minScale: 20000 })
      view.map?.addMany([pointGraphicsLayer, textGraphicsLayer])

      clickHandle = view.on("click", async (e) => {
        const results = (await view.hitTest(e)).results as __esri.ViewHit[]

        const siteHit = mapHitTest(results)

        if(siteHit) {
          const hit = siteHit as MapHitInterface
          navigate(`/site/${ hit.graphic.attributes.uuid }`)
        }
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
  }, [mapRef, setState, navigate])
}

/**
* Handles sites map extent changes
**/
const useUpdateMapExtent = (view: __esri.MapView | null, sites: AppTypes.SiteInterface[]) => {

  useEffect(() => {
    if(!view) return

    if(sites.length) {
      const multipoint = new Multipoint({
        points: sites.map(site => [site.xCoordinate, site.yCoordinate])
      })

      const viewExtent = multipoint.extent

      if(viewExtent) {
        view.goTo(viewExtent.expand(1.1), {
          animate: true,
          duration: 300
        }).catch(err => console.log(err))
      }
    }
  }, [view, sites])
}

/**
* Handles sites map graphics changes
**/
const useSetMapGraphics = (sites: AppTypes.SiteInterface[], state: { view: __esri.MapView | null }) => {

  useEffect(() => {
    if(!state.view) return

    const pointGraphicsLayer = state.view.map?.findLayerById("pointGraphicsLayer") as GraphicsLayer
    const textGraphicsLayer = state.view.map?.findLayerById("textGraphicsLayer") as GraphicsLayer
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