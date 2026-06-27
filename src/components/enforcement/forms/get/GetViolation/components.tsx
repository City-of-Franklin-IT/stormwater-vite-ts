// Types
import type * as AppTypes from "@/context/App/types"

// Components
import UpdateViolationForm from "../../update/UpdateViolationForm"
import DeleteBtn from "../../../../form-elements/buttons/DeleteBtn"

export const Form = ({ violation, handleDeleteBtn }: { violation: AppTypes.ConstructionViolationInterface | undefined, handleDeleteBtn: { onClick: React.MouseEventHandler<HTMLButtonElement>, label: string } }) => { // Update violation form
  const { onClick, label } = handleDeleteBtn

  if(!violation) return null

  return (
    <div className="flex flex-col gap-6 items-center">
      <UpdateViolationForm violation={violation} />
      <DeleteBtn onClick={onClick}>
        {label}
      </DeleteBtn>
    </div>
  )
}