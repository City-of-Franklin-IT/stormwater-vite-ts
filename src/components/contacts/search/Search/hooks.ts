import { useContext } from "react"
import ContactsCtx from "../../context"

// Types
import { ChangeEvent } from "react"

export interface SearchProps { // Search props
  placeholder: string
}

export const useHandleSearch = () => {
  const { dispatch } = useContext(ContactsCtx)

  return (e: ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.currentTarget.value

    dispatch({ type: "SET_SEARCH_VALUE", payload: searchValue })
  }
}