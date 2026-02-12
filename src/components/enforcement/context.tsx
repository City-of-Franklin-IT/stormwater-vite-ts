import { createContext, useReducer } from "react"

// Types
import { ReactNode, Reducer, Dispatch } from "react"
import { FormType } from "../site/context"

type EnforcementCtx = {
  dispatch: Dispatch<EnforcementAction>
  activeForm: FormType | undefined
  currentPage: number
  dateRangeFilter: {
    start: string
    end: string
  }
  formDate: string
  formUUID: string
  selectedSite: string
  showClosedSiteIssues: boolean
  totalPages: number
}

type EnforcementState = Omit<EnforcementCtx, "dispatch">

type EnforcementAction =
  | { type: "SET_TOTAL_PAGES", payload: number }
  | { type: "SET_CURRENT_PAGE", payload: number }
  | { type: "SET_DATE_RANGE_FILTER_START", payload: string }
  | { type: "SET_DATE_RANGE_FILTER_END", payload: string }
  | { type: "RESET_DATE_RANGE_FILTER" }
  | { type: "SET_FORM_UUID", payload: string }
  | { type: "TOGGLE_SHOW_CLOSED_SITE_ISSUES" }
  | { type: "SET_SELECTED_SITE", payload: string }
  | { type: "SET_ACTIVE_FORM", payload: FormType | undefined }
  | { type: "SET_FORM_DATE", payload: string }
  | { type: "RESET_CTX" }

const initialState: EnforcementState = {
  currentPage: 1,
  activeForm: undefined,
  dateRangeFilter: {
    start: "",
    end: ""
  },
  formDate: new Date().toISOString().split("T")[0],
  formUUID: "",
  selectedSite: "",
  showClosedSiteIssues: true,
  totalPages: 1
}

const EnforcementCtx = createContext<EnforcementCtx>({
  ...initialState,
  dispatch: () => null
})

const enforcementReducer = (state: EnforcementState, action: EnforcementAction) => {

  switch(action.type) {
    case "SET_TOTAL_PAGES":
      return {
        ...state,
        totalPages: action.payload
      }
    case "SET_CURRENT_PAGE":
      return {
        ...state,
        currentPage: action.payload
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
    case "SET_FORM_UUID":
      return {
        ...state,
        formUUID: action.payload
      }
    case "TOGGLE_SHOW_CLOSED_SITE_ISSUES":
      return {
        ...state,
        showClosedSiteIssues: !state.showClosedSiteIssues
      }
    case "SET_SELECTED_SITE":
      return {
        ...state,
        selectedSite: action.payload
      }
    case "SET_ACTIVE_FORM":
      return {
        ...state,
        activeForm: action.payload
      }
    case "SET_FORM_DATE":
      return {
        ...state,
        formDate: action.payload
      }
    case "RESET_CTX":
      return initialState
    default:
      return state
  }
}

export const EnforcementProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer<Reducer<EnforcementState, EnforcementAction>>(enforcementReducer, initialState)

  return (
    <EnforcementCtx.Provider value={{ ...state, dispatch }}>
      {children}
    </EnforcementCtx.Provider>
  )
}

export default EnforcementCtx