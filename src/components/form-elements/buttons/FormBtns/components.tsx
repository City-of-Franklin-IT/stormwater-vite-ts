import { useFormContext } from "react-hook-form"
import { useDisableBtn } from "./hooks"

export const CancelBtn = ({ onClick }: { onClick: React.MouseEventHandler<HTMLButtonElement> }) => {

  return (
    <button 
      type="button" 
      onClick={onClick}
      className="flex-1 btn btn-error btn-lg uppercase shadow-xl">
        Cancel
    </button>
  )
}

export const ResetBtn = () => {
  const { reset } = useFormContext()

  return (
    <button 
      type="button" 
      onClick={() => reset()}
      className="flex-1 btn btn-warning btn-lg uppercase shadow-xl">
        Reset
    </button>
  )
}

export const SaveBtn = () => {
  const disabled = useDisableBtn()

  return (
    <button 
      type="submit"
      className="flex-1 btn btn-success btn-lg uppercase shadow-xl"
      disabled={disabled}>
        Save
    </button>
  )
}