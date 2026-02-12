import { createContext, useReducer } from "react"

// Types
import { ReactNode, Reducer, Dispatch } from "react"
import { BasemapType } from "../sites/context"

type InspectorCtx = {
  dispatch: Dispatch<InspectorAction>
  basemap: BasemapType
  inspectorId: string
  searchValue: string
  showActiveSitesOnly: boolean
  showOpenIssuesOnly: boolean
}

type InspectorState = Omit<InspectorCtx, "dispatch">

type InspectorAction =
  | { type: "SET_SEARCH_VALUE", payload: string }
  | { type: "TOGGLE_SHOW_ACTIVE_SITES_ONLY" }
  | { type: "TOGGLE_OPEN_ISSUES_ONLY" }
  | { type: "SET_INSPECTOR_ID", payload: string }
  | { type: "SET_BASEMAP", payload: BasemapType }
  | { type: "RESET_CTX" }

const initialState: InspectorState = {
  basemap: "dark-gray-vector",
  inspectorId: "",
  searchValue: "",
  showActiveSitesOnly: true,
  showOpenIssuesOnly: false
}

const InspectorCtx = createContext<InspectorCtx>({
  ...initialState,
  dispatch: () => null
})

const inspectoReducer = (state: InspectorState, action: InspectorAction) => {

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
    case "SET_INSPECTOR_ID":
      return {
        ...state,
        inspectorId: action.payload
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

export const InspectorProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer<Reducer<InspectorState, InspectorAction>>(inspectoReducer, initialState)

  return (
    <InspectorCtx.Provider value={{ ...state, dispatch }}>
      {children}
    </InspectorCtx.Provider>
  ) 
}

export default InspectorCtx