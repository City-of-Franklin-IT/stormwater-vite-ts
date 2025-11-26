import { useContext } from "react"
import SiteCtx from "../../context"

export const useHandleDateRangeInput = (param: 'start' | 'end') => {
  const { dateRangeFilter, dispatch } = useContext(SiteCtx)

  const value = dateRangeFilter[param]

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const type = param === 'start' ? 'SET_DATE_RANGE_FILTER_START' : 'SET_DATE_RANGE_FILTER_END'

    dispatch({ type, payload: e.currentTarget.value })
  }

  return { value, onChange }
}