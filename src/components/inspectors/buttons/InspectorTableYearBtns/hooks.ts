import { useContext } from "react"
import InspectorTableCtx from "../../tables/InspectorTable/context"

export const useHandleInspectorTableYearBtns = () => {
  const { year, dispatch } = useContext(InspectorTableCtx)

  const onPrevBtnClick = () => {
    dispatch({ type: "SET_YEAR", payload: year - 1 })
  }

  const onNextBtnClick = () => {
    dispatch({ type: "SET_YEAR", payload: year + 1 })
  }

  const nextBtnDisabled = new Date().getFullYear() === year

  return { onPrevBtnClick, onNextBtnClick, nextBtnDisabled, year }
}