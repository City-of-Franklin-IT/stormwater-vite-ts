import { useContext, useEffect, useCallback, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { useQueryClient } from "react-query"
import Map from '@arcgis/core/Map'
import MapView from '@arcgis/core/views/MapView'
import Point from '@arcgis/core/geometry/Point'
import Multipoint from '@arcgis/core/geometry/Multipoint'
import Graphic from '@arcgis/core/Graphic'
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer'
import PictureMarkerSymbol from "@arcgis/core/symbols/PictureMarkerSymbol"
import Search from "@arcgis/core/widgets/Search"
import { TextSymbol } from "@arcgis/core/symbols"
import * as AppActions from '@/context/App/AppActions'
import { mapHitTest, authHeaders } from "@/helpers/utils"
import InspectorCtx from "../../context"
import { useEnableQuery } from "@/helpers/hooks"
import { setSiteMarker } from "@/components/sites/containers/SitesContainer/utils"
import { savedPopup, errorPopup } from "@/utils/Toast/Toast"

// Types
import * as AppTypes from '@/context/App/types'
import { MapHitInterface } from "@/components/sites/containers/SitesContainer/types"
import { BasemapType } from "@/components/sites/context"

export const useSetTableDataProps = () => {
  const { searchValue, showActiveSitesOnly, showOpenIssuesOnly } = useContext(InspectorCtx)

  return { searchValue, showActiveSitesOnly, showOpenIssuesOnly }
}

export const useHandleSearch = () => {
  const { searchValue, dispatch } = useContext(InspectorCtx)

  const cb = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.currentTarget.value

    dispatch({ type: 'SET_SEARCH_VALUE', payload: searchValue })
  }, [dispatch])

  return { onSearchChange: cb, searchValue }
}

export const useHandleBtns = () => {
  const { showActiveSitesOnly, dispatch } = useContext(InspectorCtx)

  const onActiveSitesBtnClick = () => dispatch({ type: 'TOGGLE_SHOW_ACTIVE_SITES_ONLY' })

  const onOpenIssuesBtnClick = () => dispatch({ type: 'TOGGLE_OPEN_ISSUES_ONLY' })

  return { onActiveSitesBtnClick, onOpenIssuesBtnClick, showActiveSitesOnly }
}

export const useHandleBasemapSelect = () => {
  const { basemap, dispatch } = useContext(InspectorCtx)

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: 'SET_BASEMAP', payload: e.currentTarget.value as BasemapType })
  }

  return { onChange, basemap }
}

export const useSetInspectorMapView = (mapRef: React.RefObject<HTMLDivElement>, sites: AppTypes.SiteInterface[]) => {
  const [state, setState] = useState<{ view: __esri.MapView | null, isLoaded: boolean }>({ view: null, isLoaded: false })

  useCreateMapView(mapRef, setState)

  useUpdateMapExtent(state.view, sites)

  useSetMapGraphics(sites, state)

  useEffect(() => {
    if(state.view) {
      state.view.when(() => {
        setState(prevState => ({ ...prevState, isLoaded: true }))
      })
    }
  }, [state.view])
}

export const useHandleDeleteBtn = () => {
  const [state, setState] = useState<{ active: boolean }>({ active: false })
  const { inspectorId } = useContext(InspectorCtx)

  const navigate = useNavigate()

  const { enabled, token } = useEnableQuery()

  const queryClient = useQueryClient()

  const { uuid: siteUUID } = useParams<{ uuid: string }>()

  const onClick = useCallback(async () => {
    if(!state.active) {
      setState({ active: true })
      return
    } 

    if(enabled) {
      const result = await AppActions.deleteInspector(inspectorId, authHeaders(token))

      if(result.success) {
        queryClient.invalidateQueries('getInspectors')
        navigate('/sites')
        savedPopup(result.msg)
      } else errorPopup(result.msg)
    }
  }, [state.active, enabled, token, inspectorId, queryClient, siteUUID, navigate])

  const label = !state.active ? 'Delete Inspector' : 'Confirm Delete'

  return { onClick, label}
}

export const useOnCancelBtnClick = () => { // Handle cancel btn click
  const { dispatch } = useContext(InspectorCtx)

  return () => dispatch({ type: 'RESET_CTX' })
}

const useCreateMapView = (mapRef: React.RefObject<HTMLDivElement>, setState: React.Dispatch<React.SetStateAction<{ view: __esri.MapView | null, isLoaded: boolean }>>) => {
  const { basemap } = useContext(InspectorCtx)

  const navigate = useNavigate()

  useEffect(() => {
    if(!mapRef?.current) return

    const map = new Map({ basemap })

    const mapView = new MapView({
      container: mapRef.current as HTMLDivElement,
      map,
      center: [-86.86897349, 35.92531721],
      zoom: 12,
      ui: { components: [] }
    })

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
  }, [mapRef, basemap, setState, navigate])
}

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

const useSetMapGraphics = (sites: AppTypes.SiteInterface[], state: { view: __esri.MapView | null }) => {

  useEffect(() => {
    if(!state.view || !sites.length) return

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