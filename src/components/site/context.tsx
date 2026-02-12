import { createContext, useReducer } from "react"

// Types
import { ReactNode, Reducer, Dispatch } from "react"
import { BasemapType } from "../sites/context"

export type FormType = 
  | "createSiteLog"
  | "createViolation"
  | "createComplaint"
  | "createIllicitDischarge"
  | "updateSite"
  | "updateSiteLog"
  | "updateViolation"
  | "updateComplaint"
  | "updateIllicitDischarge"

type SiteCtx = {
  dispatch: Dispatch<SiteAction>
  basemap: BasemapType
  dateRangeFilter: {
    start: string
    end: string
  }
  formDate: string
  siteUUID: string
  showClosedSiteIssues: boolean
}

type SiteState = Omit<SiteCtx, "dispatch">

type SiteAction =
  | { type: "SET_SITE_UUID", payload: string }
  | { type: "SET_BASEMAP", payload: BasemapType }
  | { type: "SET_FORM_DATE", payload: string }
  | { type: "TOGGLE_SHOW_CLOSED_SITE_ISSUES" }
  | { type: "SET_DATE_RANGE_FILTER_START", payload: string }
  | { type: "SET_DATE_RANGE_FILTER_END", payload: string }
  | { type: "RESET_DATE_RANGE_FILTER" }
  | { type: "RESET_CTX" }

const initialState: SiteState = {
  basemap: "dark-gray-vector",
  dateRangeFilter: {
    start: "",
    end: ""
  },
  formDate: new Date().toISOString().split("T")[0],
  siteUUID: "",
  showClosedSiteIssues: false
}

const SiteCtx = createContext<SiteCtx>({
  ...initialState,
  dispatch: () => null
})

const siteReducer = (state: SiteState, action: SiteAction) => {

  switch(action.type) {
    case "SET_SITE_UUID":
      return {
        ...state,
        siteUUID: action.payload
      }
    case "SET_BASEMAP":
      return {
        ...state,
        basemap: action.payload
      }
    case "SET_FORM_DATE":
      return {
        ...state,
        formDate: action.payload
      }
    case "TOGGLE_SHOW_CLOSED_SITE_ISSUES":
      return {
        ...state,
        showClosedSiteIssues: !state.showClosedSiteIssues
      }
    case "SET_DATE_RANGE_FILTER_START":
      return {
        ...state,
        dateRangeFilter: {
          start: action.payload,
          end: state.dateRangeFilter.end
        }
      }
    case "SET_DATE_RANGE_FILTER_END":
      return {
        ...state,
        dateRangeFilter: {
          start: state.dateRangeFilter.start,
          end: action.payload
        }
      }
    case "RESET_DATE_RANGE_FILTER":
      return {
        ...state,
        dateRangeFilter: {
          start: "",
          end: ""
        }
      }
    case "RESET_CTX":
      return initialState
    default:
      return state
  }
}

export const SiteProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer<Reducer<SiteState, SiteAction>>(siteReducer, initialState)

  return (
    <SiteCtx.Provider value={{ ...state, dispatch }}>
      {children}
    </SiteCtx.Provider>
  ) 
}

export default SiteCtx