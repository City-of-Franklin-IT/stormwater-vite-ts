import { useContext } from "react"
import SiteCtx from "../../context"
import { useHandleDateRangeInput } from './hooks'

export const DateRangeInputs = () => {

  return (
    <div className="flex gap-10">
      <StartInput />
      <EndInput />
    </div>
  )
}

export const ClearBtn = () => { // Clear date range filter button
  const { dateRangeFilter, dispatch } = useContext(SiteCtx)

  if(!dateRangeFilter.start || !dateRangeFilter.end) return null

  return (
    <ClearFilterBtn onClick={() => dispatch({ type: 'RESET_DATE_RANGE_FILTER' })}>
      Remove Date Range Filter
    </ClearFilterBtn>
  )
}

const StartInput = () => { // Date range filter start input
  const inputParams = useHandleDateRangeInput('start')

  return (
    <div className="flex flex-col items-center">
      <label htmlFor="start" className="text-warning">Start:</label>
      <input 
        id="start"
        type="date"
        className="input input-warning bg-neutral"
        { ...inputParams } />
    </div>
  )
}

const EndInput = () => { // Date range filter start input
  const inputParams = useHandleDateRangeInput('end')

  return (
    <div className="flex flex-col items-center">
      <label htmlFor="end" className="text-warning">End:</label>
      <input 
        id="end"
        type="date"
        className="input input-warning bg-neutral"
        { ...inputParams } />
    </div>
  )
}

type ClearFilterBtnProps = { onClick: React.MouseEventHandler<HTMLButtonElement>, children: React.ReactNode }

const ClearFilterBtn = (props: ClearFilterBtnProps) => {

  return (
    <button 
      type="button"
      onClick={props.onClick}
      className="btn btn-warning btn-outline font-[play] uppercase">
        {props.children}
    </button>
  )
}