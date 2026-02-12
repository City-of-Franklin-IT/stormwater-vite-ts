import { createContext, useReducer } from "react"

// Types
import { ReactNode, Reducer, Dispatch } from "react"

export const BasemapMap = new Map<BasemapType, string>([
  ["dark-gray-vector", "Dark Gray"],
  ["streets-vector", "Streets"],
  ["streets-night-vector", "Streets Night"],
  ["satellite", "Satellite"]
])

export type BasemapType =
  | "dark-gray-vector"
  | "streets-vector"
  | "streets-night-vector"
  | "satellite"

type SitesCtx = {
  dispatch: Dispatch<SitesAction>
  basemap: BasemapType
  formUUID: string
  searchValue: string
  showActiveSitesOnly: boolean
  showOpenIssuesOnly: boolean
}

type SitesState = Omit<SitesCtx, "dispatch">

type SitesAction =
  | { type: "SET_SEARCH_VALUE", payload: string }
  | { type: "TOGGLE_SHOW_ACTIVE_SITES_ONLY" }
  | { type: "TOGGLE_OPEN_ISSUES_ONLY" }
  | { type: "SET_FORM_UUID", payload: string }
  | { type: "SET_BASEMAP", payload: BasemapType }
  | { type: "RESET_CTX" }

const initialState: SitesState = {
  basemap: "dark-gray-vector",
  formUUID: "",
  searchValue: "",
  showActiveSitesOnly: true,
  showOpenIssuesOnly: false
}

const SitesCtx = createContext<SitesCtx>({
  ...initialState,
  dispatch: () => null
})

const sitesReducer = (state: SitesState, action: SitesAction) => {

  switch(action.type) {
    case "SET_SEARCH_VALUE":
      return {
        ...state,
        searchValue: action.payload
      }
    case "TOGGLE_SHOW_ACTIVE_SITES_ONLY":
      return {
        ...state,
        showActiveSitesOnly: !state.showActiveSitesOnly
      }
    case "TOGGLE_OPEN_ISSUES_ONLY":
      return {
        ...state,
        showOpenIssuesOnly: !state.showOpenIssuesOnly
      }
    case "SET_FORM_UUID":
      return {
        ...state,
        formUUID: action.payload
      }
    case "SET_BASEMAP":
      return {
        ...state,
        basemap: action.payload
      }
    case "RESET_CTX":
      return initialState
    default:
      return state
  }
}

export const SitesProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer<Reducer<SitesState, SitesAction>>(sitesReducer, initialState)

  return (
    <SitesCtx.Provider value={{ ...state, dispatch }}>
      {children}
    </SitesCtx.Provider>
  ) 
}

export default SitesCtx