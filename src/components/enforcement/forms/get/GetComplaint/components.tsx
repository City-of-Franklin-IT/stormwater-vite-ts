// Types
import * as AppTypes from "@/context/App/types"

// Components
import UpdateSiteComplaintForm from "../../update/UpdateComplaintForm"
import DeleteBtn from "@/components/form-elements/buttons/DeleteBtn"

export const Form = ({ complaint, handleDeleteBtn }: { complaint: AppTypes.ComplaintInterface | undefined, handleDeleteBtn: { onClick: React.MouseEventHandler<HTMLButtonElement>, label: string } }) => { // Update site complaint form
  const { onClick, label } = handleDeleteBtn

  if(!complaint) return null

  return (
    <div className="flex flex-col gap-6 items-center">
      <UpdateSiteComplaintForm complaint={complaint} />
      <DeleteBtn onClick={onClick}>
        {label}
      </DeleteBtn>
    </div>
  )
}