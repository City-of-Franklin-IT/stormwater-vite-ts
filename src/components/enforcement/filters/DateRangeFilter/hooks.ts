import React, { useContext } from "react"
import EnforcementCtx from "@/components/enforcement/context"

/**
* Returns clear button visibility and onClick handler for resetting the date range filter
**/
export const useHandleClearBtn = () => {
  const { dateRangeFilter, dispatch } = useContext(EnforcementCtx)

  const visible = dateRangeFilter.start || dateRangeFilter.end

  const onClick = () => {
    dispatch({ type: "RESET_DATE_RANGE_FILTER" })
  }

  return { visible, onClick }
}

/**
* Returns onChange handler and value for a date range filter input field
**/
export const useHandleDateInput = (field: "start" | "end") => {
  const { dateRangeFilter: { start, end }, dispatch } = useContext(EnforcementCtx)

  const onChange = field === "start" ?
    (e: React.ChangeEvent<HTMLInputElement>) => dispatch({ type: "SET_DATE_RANGE_FILTER_START", payload: e.currentTarget.value }) :
    (e: React.ChangeEvent<HTMLInputElement>) => dispatch({ type: "SET_DATE_RANGE_FILTER_END", payload: e.currentTarget.value })

  const value = field === "start" ? start : end

  return { onChange, value }
}