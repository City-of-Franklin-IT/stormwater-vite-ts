import { useContext } from "react"
import ContactsCtx from "../../context"
import { useHandleSearch } from "./hooks"

export const Header = () => {

  return (
    <h2 className="text-neutral-content text-xl font-[play] uppercase">Search:</h2>
  )
}

export const SearchInput = () => {
  const { searchValue } = useContext(ContactsCtx)

  const handleSearch = useHandleSearch()

  return (
    <input 
      type="text" 
      value={searchValue} 
      placeholder="by contact name or company.." 
      onChange={(e) => handleSearch(e)} 
      className="input w-[300px] h-full" />
  )
}

export const ClearBtn = () => { // Clear search button
  const { searchValue, dispatch } = useContext(ContactsCtx)

  if(!searchValue) return null

  return (
    <button 
      type="button" 
      onClick={() => dispatch({ type: "SET_SEARCH_VALUE", payload: "" })}
      className="btn btn-primary uppercase h-full shadow-xl">
        Clear
    </button>
  )
}