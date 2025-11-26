import { useHandleClearBtn, useHandleDateInput } from './hooks'

export const DateRangeInputs = () => {

  return (
    <div className="flex gap-10">
      <StartInput />
      <EndInput />
    </div>
  )
}

export const ClearBtn = () => { // Clear date range filter button
  const { visible, onClick } = useHandleClearBtn()

  if(!visible) return

  return (
    <ClearFilterBtn onClick={onClick}>
      Remove Date Range Filter
    </ClearFilterBtn>
  )
}

const StartInput = () => { // Date range filter start input
  const inputProps = useHandleDateInput('start')

  return (
    <div className="flex flex-col items-center">
      <label htmlFor="start" className="text-warning">Start:</label>
      <input 
        id="start"
        type="date"
        className="input input-warning bg-neutral"
        { ...inputProps } />
    </div>
  )
}

const EndInput = () => { // Date range filter start input
  const inputProps = useHandleDateInput('end')

  return (
    <div className="flex flex-col items-center">
      <label htmlFor="end" className="text-warning">End:</label>
      <input 
        id="end"
        type="date"
        className="input input-warning bg-neutral"
        { ...inputProps } />
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