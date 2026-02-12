import { createContext, useReducer } from "react"

// Types
import { ReactNode, Reducer, Dispatch } from "react"

type InspectorTableCtx = {
  dispatch: Dispatch<InspectorTableAction>
  selection: string[]
  formOpen: boolean
  year: number
}

type InspectorTableState = Omit<InspectorTableCtx, "dispatch">

type InspectorTableAction =
  | { type: "ADD_TO_SELECTION", payload: string }
  | { type: "REMOVE_FROM_SELECTION", payload: string }
  | { type: "TOGGLE_FORM_OPEN" }
  | { type: "SET_YEAR", payload: number }
  | { type: "RESET_CTX" }

const initialState: InspectorTableState = {
  selection: [],
  formOpen: false,
  year: new Date().getFullYear()
}

const InspectorTableCtx = createContext<InspectorTableCtx>({
  ...initialState,
  dispatch: () => null
})

const inspectorTableReducer = (state: InspectorTableState, action: InspectorTableAction) => {
  
  switch(action.type) {
    case "ADD_TO_SELECTION":
      return {
        ...state,
        selection: [ ...state.selection, action.payload ]
      }
    case "REMOVE_FROM_SELECTION":
      return {
        ...state,
        selection: state.selection.filter(item => item !== action.payload)
      }
    case "TOGGLE_FORM_OPEN":
      return {
        ...state,
        formOpen: !state.formOpen
      }
    case "SET_YEAR":
      return {
        ...state,
        year: action.payload
      }
    case "RESET_CTX":
      return initialState
    default:
      return state
  }
}

export const InspectorTableProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer<Reducer<InspectorTableState, InspectorTableAction>>(inspectorTableReducer, initialState)

  return (
    <InspectorTableCtx.Provider value={{ ...state, dispatch }}>
      {children}
    </InspectorTableCtx.Provider>
  )
}

export default InspectorTableCtx