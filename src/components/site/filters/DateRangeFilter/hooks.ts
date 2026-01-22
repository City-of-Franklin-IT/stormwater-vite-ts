import { useContext } from "react"
import SiteCtx from "../../context"

/**
* Returns date range filter input onChange handler and value from context
**/
export const useHandleDateRangeInput = (param: 'start' | 'end') => {
  const { dateRangeFilter, dispatch } = useContext(SiteCtx)

  const value = dateRangeFilter[param]

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const payload = e.currentTarget.value

    const type = param === 'start' ?
      'SET_DATE_RANGE_FILTER_START' : 
      'SET_DATE_RANGE_FILTER_END'

    dispatch({ type, payload })
  }

  return { value, onChange }
}

/**
* Returns clear search button visibility boolean and onClick handler
**/
export const useHandleClearBtn = () => {
  const { dateRangeFilter, dispatch } = useContext(SiteCtx)

  const visible = !!dateRangeFilter.start || !!dateRangeFilter.end

  const onClick = () => {
    dispatch({ type: 'RESET_DATE_RANGE_FILTER' })
  }

  return { visible, onClick }
}