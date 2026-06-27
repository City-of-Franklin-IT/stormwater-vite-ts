import { useContext, useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router"
import { useQueryClient, useQuery } from "@tanstack/react-query"
import { useForm, useFormContext } from "react-hook-form"
import EnforcementCtx from "@/components/enforcement/context"
import Map from "@arcgis/core/Map"
import MapView from "@arcgis/core/views/MapView"
import Point from "@arcgis/core/geometry/Point"
import Graphic from "@arcgis/core/Graphic"
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer"
import PictureMarkerSymbol from "@arcgis/core/symbols/PictureMarkerSymbol"
import Search from "@arcgis/core/widgets/Search"
import { TextSymbol } from "@arcgis/core/symbols"
import pinErrorIcon from "@/assets/icons/pin/error-pin.png"
import { useEnableQuery, withTokenRefresh } from "@/helpers/hooks"
import { errorPopup, savedPopup } from "@/utils/Toast/Toast"
import * as AppActions from "@/context/App/AppActions"
import { authHeaders, formatDate } from "@/helpers/utils"
import { useOnCancelBtnClick } from "../CreateViolationForm/hooks"
import { handleCreateIllicitDischarge } from "./utils"

// Types
import * as AppTypes from "@/context/App/types"

export enum StreamWatershedEnum {
  AenonCreek = "Aenon Creek",
  Carothers = "Carothers",
  CarriagePark = "Carriage Park",
  DelRio = "Del Rio",
  DonelsonCreek = "Donelson Creek",
  DryBranch = "Dry Branch",
  Ewingville = "Ewingville",
  FiveMileCreek = "Five Mile Creek",
  ForrestCrossing = "Forrest Crossing",
  GlassSpring = "Glass Spring",
  GooseCreek = "Goose Creek",
  GreenHill = "Green Hill",
  Harpeth = "Harpeth",
  HatcherSpring = "Hatcher Spring",
  KellyBranch = "Kelly Branch",
  LibertyCreek = "Liberty Creek",
  LittleHarpeth = "Little Harpeth",
  LongLane = "Long Lane",
  LynwoodBranch = "Lynwood Branch",
  MayesCreek = "Mayes Creek",
  McGavockCreek = "McGavock Creek",
  MonticelloWest = "Monticello West",
  NolenCemetery = "Nolen Cemetery",
  PolkCreek = "Polk Creek",
  RalstonBranch = "Ralston Branch",
  ReeseCreek = "Reese Creek",
  RobinsonLake = "Robinson Lake",
  SawMillCreek = "Saw Mill Creek",
  SewardHills = "Seward Hills",
  SharpsBranch = "Sharps Branch",
  SouthEwingvilleCreek = "South Ewingville Creek",
  SpencerCreek = "Spencer Creek",
  WatsonBranch = "Watson Branch",
  WestHarpeth = "West Harpeth",
  WillowPlunge = "Willow Plunge",
  BaughBranch = "Baugh Branch",
  BeechCreek = "Beech Creek",
  BerrysChapelBranch = "Berry's Chapel Branch",
  BishopBranch = "Bishop Branch",
  BoydBranch = "Boyd Branch",
  BoydMillBranch = "Boyd Mill Branch",
  BuchananBranch = "Buchanan Branch",
  CameronSpring = "Cameron Spring",
  CarlisleBranch = "Carlisle Branch",
  CarothersBranch = "Carothers Branch",
  CloverdaleCreek = "Cloverdale Creek",
  CottonGinBranch = "Cotton Gin Branch",
  CowellBranch = "Cowell Branch",
  CurdBranch = "Curd Branch",
  DeerfieldBranch = "Deerfield Branch",
  DelRioCreek = "Del Rio Creek",
  EastSewardHillsBranch = "East Seward Hills Branch",
  EastWilsonPikeCreek = "East Wilson Pike Creek",
  EdgmonBranch = "Edgmon Branch",
  FivemileCreek = "Fivemile Creek",
  GermanBranch = "German Branch",
  GlassBranch = "Glass Branch",
  GreenBranch = "Green Branch",
  GuffeeBranch = "Guffee Branch",
  HalfacreBranch = "Halfacre Branch",
  HamiltonBrownBranch = "Hamilton-Brown Branch",
  HarlinsdaleSpring = "Harlinsdale Spring",
  HarveyBranch = "Harvey Branch",
  HarveySpring = "Harvey Spring",
  HeadwaterCreek = "Headwater Creek",
  HerbertBranch = "Herbert Branch",
  HerbertCreek = "Herbert Creek",
  HillCemeteryBranch = "Hill Cemetery Branch",
  HodgeBranch = "Hodge Branch",
  HuffineSpringBranch = "Huffine Spring Branch",
  HurricaneCreek = "Hurricane Creek",
  JewellBranch = "Jewell Branch",
  LaddBranch = "Ladd Branch",
  LittleHarpethRiver = "Little Harpeth River",
  LookoutHillBranch = "Lookout Hill Branch",
  MalloryBranch = "Mallory Branch",
  McKaysBranch = "McKays Branch",
  MonticelloCreek = "Monticello Creek",
  NolenBranch = "Nolen Branch",
  NorthEwingvilleCreek = "North Ewingville Creek",
  NorthProng = "North Prong",
  ParishBranch = "Parish Branch",
  PewittBranch = "Pewitt Branch",
  PickeringBranch = "Pickering Branch",
  PrattCreek = "Pratt Creek",
  QuarryBranch = "Quarry Branch",
  ReidHillBranch = "Reid Hill Branch",
  RobertsBranch = "Roberts Branch",
  RobinsonSpringBranch = "Robinson Spring Branch",
  RogersBurn = "Rogers Burn",
  RoyalBranch = "Royal Branch",
  SappingtonBranch = "Sappington Branch",
  ShuemateBranch = "Shuemate Branch",
  SouthProng = "South Prong",
  SouthSewardHillsBranch = "South Seward Hills Branch",
  SplitlogCreek = "Splitlog Creek",
  StramblerCreek = "Strambler Creek",
  SwansonBranch = "Swanson Branch",
  ThomsonSheltonBranch = "Thomson-Shelton Branch",
  TollHouseBranch = "Toll House Branch",
  WestHarpethRiver = "West Harpeth River",
  WestMainBranch = "West Main Branch",
  WestSewardHillsBranch = "West Seward Hills Branch",
  WestSlidersBranch = "West Sliders Branch",
  WidowNeelyBranch = "Widow Neely Branch",
  WilliamsBranch = "Williams Branch",
  WillowPlungeCreek = "Willow Plunge Creek",
  WilloughbyBranch = "Willoughby Branch",
  WilsonPikeCreek = "Wilson Pike Creek",
  WilsonSpringBranch = "Wilson Spring Branch",
  Other = "Other"
}

/**
* Returns create illicit discharge form methods, form submit function, and cancel button onClick handler
**/
export const useHandleCreateIllicitDischargeForm = (site: AppTypes.SiteInterface | undefined) => {
  const methods = useCreateIllicitDischargeForm(site)
  const handleFormSubmit = useHandleFormSubmit()
  const onCancelBtnClick = useOnCancelBtnClick()

  return { methods, handleFormSubmit, onCancelBtnClick }
}

/**
* Returns create illicit discharge form context
**/
export const useCreateIllicitDischargeFormContext = () => { // CreateSiteIllicitDischargeForm context
  const methods = useFormContext<AppTypes.IllicitDischargeCreateInterface>()

  return methods
}

/**
* Returns inspector options for inspector select component
**/
export const useSetInspectorOptions = () => { // Return inspectors and set <select> options
  const { enabled, token, refreshToken } = useEnableQuery()

  const result = useQuery({
    queryKey: ["getInspectors"],
    queryFn: () => withTokenRefresh(
      () => AppActions.getInspectors(authHeaders(token)),
      refreshToken
    ),
    enabled
  })

  if(result.data?.success) {
    const inspectors = result.data.data

    return inspectors.map(inspector => {
      return { value: inspector.inspectorId, text: inspector.name }
    })
  } else return []
}

/**
* Handles illicit discharge map view and graphics
**/
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

/**
* Returns create illicit discharge form methods
**/
const useCreateIllicitDischargeForm = (site: AppTypes.SiteInterface | undefined) => { // CreateSiteIllicitDischargeForm useForm
  const { formDate } = useContext(EnforcementCtx)

  return useForm<AppTypes.IllicitDischargeCreateInterface>({
    mode: "onBlur",
    defaultValues: {
      siteId: site?.siteId || null,
      date: formatDate(formDate),
      xCoordinate: site?.xCoordinate || null,
      yCoordinate: site?.yCoordinate || null,
      locationDescription: "",
      inspectorId: site?.inspectorId || null,
      details: "",
      responsibleParty: "",
      volumeLost: "",
      streamWatershed: undefined,
      otherStreamWatershed: "",
      enforcementAction: "",
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

/**
* Returns illicit discharge create form submit function
**/
const useHandleFormSubmit = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  
  const { enabled, token } = useEnableQuery()

  const { uuid: siteUUID } = useParams<{ uuid: string }>()

  return async (formData: AppTypes.IllicitDischargeCreateInterface) => {
    if(!enabled || !token) return

    const result = await handleCreateIllicitDischarge(formData, token).catch(err => console.log(err))

    if(!result?.success) {
      return errorPopup(result?.msg || "Error Creating Illicit Discharge")
    }

    savedPopup(result.msg)
    queryClient.invalidateQueries({ queryKey: ["getIllicitDischarges"] })
    queryClient.invalidateQueries({ queryKey: ["getSite", siteUUID] })
    queryClient.invalidateQueries({ queryKey: ["getSites"] })
    queryClient.invalidateQueries({ queryKey: ["getInspector"] })
    navigate("/enforcement/discharges")
  }
}

/**
* Handles illicit discharge map view
**/
const useCreateMapView = (mapRef: React.RefObject<HTMLDivElement>, setState: React.Dispatch<React.SetStateAction<{ view: __esri.MapView | null, isLoaded: boolean }>>) => {
  const { setValue } = useFormContext<AppTypes.IllicitDischargeCreateInterface>()

  useEffect(() => {
    if(!mapRef?.current) return

    const map = new Map({ basemap: "dark-gray-vector" })

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
        position: "top-left"
      })

      setState(prevState => ({ ...prevState, view: mapView }))
    })

    const pointGraphicsLayer = new GraphicsLayer({ id: "pointGraphicsLayer" })
    map.add(pointGraphicsLayer)

    setState(prevState => ({ ...prevState, view: mapView }))

    const onMapClick = mapView.on("click", (e) => {
      const mappoint = e.mapPoint

      setValue("xCoordinate", mappoint.longitude, { shouldValidate: true, shouldDirty: true })
      setValue("yCoordinate", mappoint.latitude, { shouldValidate: true, shouldDirty: true })
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

/**
* Handles illicit discharge map graphics
**/
const useSetMapGraphics = (state: { view: __esri.MapView | null }) => {
  const { watch } = useFormContext<AppTypes.IllicitDischargeCreateInterface>()

  const xCoordinate = watch("xCoordinate")
  const yCoordinate = watch("yCoordinate")


  useEffect(() => {
    if(!state?.view?.map) return

    const coordinates = { xCoordinate, yCoordinate }

    const pointGraphicsLayer = state.view.map.findLayerById("pointGraphicsLayer") as GraphicsLayer

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
        text: "Illicit Discharge Location",
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