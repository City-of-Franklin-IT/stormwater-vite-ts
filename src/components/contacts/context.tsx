import { createContext, useReducer } from "react"

// Types
import { Reducer, Dispatch } from "react"

type ContactsCtx = {
  dispatch: Dispatch<ContactsAction>
  currentPage: number
  formUUID: string
  searchValue: string
  totalPages: number
  showInactiveContacts: boolean
}

type ContactsState = Omit<ContactsCtx, "dispatch">

type ContactsAction =
  | { type: "SET_SEARCH_VALUE", payload: string }
  | { type: "TOGGLE_SHOW_INACTIVE_CONTACTS" }
  | { type: "SET_FORM_UUID", payload: string }
  | { type: "SET_TOTAL_PAGES", payload: number }
  | { type: "SET_CURRENT_PAGE", payload: number }
  | { type: "RESET_CTX" }

const initialState: ContactsState = {
  currentPage: 1,
  formUUID: "",
  searchValue: "",
  showInactiveContacts: false,
  totalPages: 1
}

const ContactsCtx = createContext<ContactsCtx>({
  ...initialState,
  dispatch: () => null
})

const contactsReducer = (state: ContactsState, action: ContactsAction) => {

  switch(action.type) {
    case "SET_SEARCH_VALUE":
      return {
        ...state,
        searchValue: action.payload
      }
    case "TOGGLE_SHOW_INACTIVE_CONTACTS":
      return {
        ...state,
        showInactiveContacts: !state.showInactiveContacts
      }
    case "SET_FORM_UUID":
      return {
        ...state,
        formUUID: action.payload
      }
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
    case "RESET_CTX":
      return initialState 
    default:
      return state
  }
}

export const ContactsProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer<Reducer<ContactsState, ContactsAction>>(contactsReducer, initialState)
  
  return (
    <ContactsCtx.Provider value={{ ...state, dispatch }}>
      {children}
    </ContactsCtx.Provider>
  ) 
}

export default ContactsCtx