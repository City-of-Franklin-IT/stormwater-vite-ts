import React, { useContext } from "react"

export type SearchableCtx = {
  searchValue: string
  dispatch: React.Dispatch<{ type: 'SET_SEARCH_VALUE', payload: string }>
}

export const useHandleSearch = <T extends SearchableCtx>(ctx: React.Context<T>) => {
  const { searchValue, dispatch } = useContext(ctx)

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_SEARCH_VALUE', payload: e.currentTarget.value })
  }

  return { onChange, value: searchValue }
}

export const useHandleClearBtn = <T extends SearchableCtx>(ctx: React.Context<T>) => {
  const { searchValue, dispatch } = useContext(ctx)

  const visible = !!searchValue

  const onClick = () => {
    dispatch({ type: 'SET_SEARCH_VALUE', payload: '' })
  }

  return { visible, onClick }
}