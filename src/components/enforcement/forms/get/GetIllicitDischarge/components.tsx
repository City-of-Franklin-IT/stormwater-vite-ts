// Types
import * as AppTypes from "@/context/App/types"

// Components
import UpdateSiteIllicitDischargeForm from "../../update/UpdateIllicitDischargeForm"
import DeleteBtn from "../../../../form-elements/buttons/DeleteBtn"

export const Form = ({ illicitDischarge, handleDeleteBtn }: { illicitDischarge: AppTypes.IllicitDischargeInterface | undefined, handleDeleteBtn: { onClick: React.MouseEventHandler<HTMLButtonElement>, label: string } }) => { // Update site illicit discharge form
  const { onClick, label } = handleDeleteBtn

  if(!illicitDischarge) return null

  return (
    <div className="flex flex-col gap-6 items-center">
      <UpdateSiteIllicitDischargeForm illicitDischarge={illicitDischarge} />
      <DeleteBtn onClick={onClick}>
        {label}
      </DeleteBtn>
    </div>
  )
}