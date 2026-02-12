// Components
import * as Components from "./components"

function FormBtns({ onCancelBtnClick }: { onCancelBtnClick: React.MouseEventHandler<HTMLButtonElement> }) {

  return (
    <div className="flex gap-6 h-[44px] mt-6">
      <Components.CancelBtn onClick={onCancelBtnClick} />
      <Components.ResetBtn />
      <Components.SaveBtn />
    </div>
  )
}

export default FormBtns