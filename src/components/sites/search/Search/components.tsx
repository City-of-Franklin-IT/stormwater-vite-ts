import { Context } from "react"
import { useHandleSearch, useHandleClearBtn, SearchableCtx } from "./hooks"

export const Header = () => {
  return (
    <h2 className="text-primary-content text-2xl font-[play] uppercase font-bold">Search</h2>
  )
}

export const SearchInput = <T extends SearchableCtx>({ ctx }: { ctx: Context<T> }) => {
  const inputProps = useHandleSearch(ctx)

  return (
    <input
      type="text"
      placeholder="by project name, COF #, or permit #.."
      className="input w-full"
      { ...inputProps } />
  )
}

export const ClearBtn = <T extends SearchableCtx>({ ctx }: { ctx: Context<T> }) => {
  const { visible, onClick } = useHandleClearBtn(ctx)

  if(!visible) return

  return (
    <button
      type="button"
      onClick={onClick}
      className="btn btn-primary uppercase">
        Clear
    </button>
  )
}