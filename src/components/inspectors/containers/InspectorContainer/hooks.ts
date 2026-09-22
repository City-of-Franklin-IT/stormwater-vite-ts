import { useContext, useEffect, useCallback, useState, useRef } from "react"
import { useNavigate } from "react-router"
import { useQueryClient } from "@tanstack/react-query"
import Point from "@arcgis/core/geometry/Point"
import Multipoint from "@arcgis/core/geometry/Multipoint"
import Graphic from "@arcgis/core/Graphic"
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer"
import PictureMarkerSymbol from "@arcgis/core/symbols/PictureMarkerSymbol"
import { TextSymbol } from "@arcgis/core/symbols"
import * as AppActions from "@/context/App/AppActions"
import { mapHitTest, authHeaders } from "@/helpers/utils"
import InspectorCtx from "../../context"
import { useAuth } from "@/context/Auth"
import { useEnableQuery, withTokenRefresh } from "@/helpers/hooks"
import { setSiteMarker } from "@/components/sites/containers/SitesContainer/utils"
import { useSetTableData, useHandleBtns } from "@/components/sites/containers/SitesContainer/hooks"
import { savedPopup, errorPopup } from "@/utils/Toast/Toast"

// Types
import * as AppTypes from "@/context/App/types"
import { MapHitInterface } from "@/components/sites/containers/SitesContainer/hooks"

/**
* Returns table data, active sites button props, and open issues button onClick handler
**/
export const useHandleInspectorContainer = (sites: AppTypes.SiteInterface[]) => {
  const tableData = useSetTableData(InspectorCtx, sites)
  const { activeSitesBtnProps, onOpenIssuesBtnClick } = useHandleBtns(InspectorCtx)

  return { tableData, activeSitesBtnProps, onOpenIssuesBtnClick }
}

/**
* Initializes and manages the ArcGIS map view for the inspector page; mapRef points to the declarative <arcgis-map> element
**/
export const useSetInspectorMapView = (mapRef: React.RefObject<HTMLArcgisMapElement>, sites: AppTypes.SiteInterface[]) => {
  const [state, setState] = useState<{ view: __esri.MapView | null, isLoaded: boolean }>({ view: null, isLoaded: false })

  useMapViewReady(mapRef, setState)
  useUpdateMapExtent(state.view, sites)
  useSetMapGraphics(sites, state)
}

/**
* Returns cancel button onClick handler that resets InspectorCtx
**/
export const useOnCancelBtnClick = () => {
  const { dispatch } = useContext(InspectorCtx)

  return () => dispatch({ type: "RESET_CTX" })
}

/**
* Returns view toggle label, onClick handler, and props for calendar and table components
**/
export const useHandleCalendarAndTable = (tableData: AppTypes.SiteInterface[]) => {
  const [state, setState] = useState<{ view: "calendar" | "table" }>({ view: "calendar" })

  const label = state.view === "calendar" ? 
    "Switch To Table View" : 
    "Switch To Calendar View"

  const onClick = () => {
    const payload = state.view === "calendar" ?
      "table" :
      "calendar"

    setState({ view: payload })
  }

  const calendarProps = {
    visible: state.view === "calendar",
    tableData
  }

  const tableProps = {
    visible: state.view === "table",
    tableData
  }

  return { label, onClick, calendarProps, tableProps }
}

/**
* Returns form ref, delete button props, and visibility for the inspector update form
**/
export const useHandleUpdateForm = () => {
  const { inspectorId } = useContext(InspectorCtx)

  const formRef = useRef<HTMLDivElement>(null)

  const deleteBtnProps = useHandleDeleteBtn()

  const visible = !!inspectorId

  return { formRef, deleteBtnProps, visible }
}

/**
* Returns visibility and onClick handler for the update inspector button based on user role
**/
export const useHandleUpdateInspectorBtn = (inspectorId: string) => {
  const { dispatch } = useContext(InspectorCtx)

  const { canUpdate } = useAuth()

  const visible = canUpdate

  const onClick = () => {
    dispatch({ type: "SET_INSPECTOR_ID", payload: inspectorId })
  }

  return { visible, onClick }
}

/**
* Returns two-step delete button onClick handler and label for inspector deletion
**/
export const useHandleDeleteBtn = () => {
  const [state, setState] = useState<{ active: boolean }>({ active: false })
  const { inspectorId } = useContext(InspectorCtx)

  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { enabled, token, refreshToken } = useEnableQuery()

  const onClick = useCallback(async () => {
    if(!state.active) {
      setState({ active: true })
      return
    }

    if(enabled) {
      const result = await withTokenRefresh(
        () => AppActions.deleteInspector(inspectorId, authHeaders(token)),
        refreshToken
      ).catch(() => { errorPopup('An error occurred. Please try again.'); return null })

      if(result?.success) {
        queryClient.invalidateQueries({ queryKey: ["getInspectors"] })
        navigate("/sites")
        savedPopup(result.msg)
      } else if(result) errorPopup(result.msg)
    }
  }, [state.active, enabled, token, refreshToken, inspectorId, queryClient, navigate])

  const label = !state.active ?
    "Delete Inspector" :
    "Confirm Delete"

  return { onClick, label}
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
* Animates the map view to fit all site points within the extent
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
* Renders site marker and label graphics on the map for each site
**/
const useSetMapGraphics = (sites: AppTypes.SiteInterface[], state: { view: __esri.MapView | null }) => {

  useEffect(() => {
    if(!state.view || !sites.length) return

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