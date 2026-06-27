import { useHandleDateRangeInput, useHandleClearBtn } from "./hooks"

export const DateRangeInputs = () => (
  <div className="flex gap-10">
    <DateRangeInput param={"start"} />
    <DateRangeInput param={"end"} />
  </div>
)

export const ClearBtn = () => {
  const { visible, onClick } = useHandleClearBtn()

  if(!visible) return null

  return (
    <ClearFilterBtn onClick={onClick}>
      Remove Date Range Filter
    </ClearFilterBtn>
  )
}

const DateRangeInput = ({ param }: { param: "start" | "end" }) => {
  const inputParams = useHandleDateRangeInput(param)

  return (
    <div className="flex flex-col items-center">
      <label htmlFor={param} className="text-warning">{param.toUpperCase()}:</label>
      <input 
        id={param}
        type="date"
        className="input input-warning bg-neutral"
        { ...inputParams } />
    </div>
  )
}

type ClearFilterBtnProps = { 
  onClick: React.MouseEventHandler<HTMLButtonElement>
  children: React.ReactNode 
}

const ClearFilterBtn = (props: ClearFilterBtnProps) => (
  <button 
    type="button"
    onClick={props.onClick}
    className="btn btn-warning btn-outline font-[play] uppercase">
      {props.children}
  </button>
)