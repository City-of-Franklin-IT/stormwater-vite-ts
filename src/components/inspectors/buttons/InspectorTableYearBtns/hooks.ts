import { useContext } from "react"
import InspectorTableCtx from "../../tables/InspectorTable/context"

/**
* Returns prev/next year button props and current year for the inspector table
**/
export const useHandleInspectorTableYearBtns = () => {
  const { year, dispatch } = useContext(InspectorTableCtx)

  const onPrevBtnClick = () => {
    dispatch({ type: "SET_YEAR", payload: year - 1 })
  }

  const onNextBtnClick = () => {
    dispatch({ type: "SET_YEAR", payload: year + 1 })
  }

  const prevPageBtnProps = {
    onClick: onPrevBtnClick
  }

  const nextPageBtnProps = {
    onClick: onNextBtnClick,
    disabled: new Date().getFullYear() === year
  }

  return { prevPageBtnProps, nextPageBtnProps, year }
}