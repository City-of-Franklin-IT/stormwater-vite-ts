import { useHandleDeleteBtnClick } from "./hooks"

// Types
import type * as AppTypes from "@/context/App/types"

// Components
import UpdateContactForm from "../../update/UpdateContactForm"
import DeleteBtn from "@/components/form-elements/buttons/DeleteBtn"

export const Form = ({ contact }: { contact: AppTypes.ContactInterface | undefined }) => {
  const { handleClick, active } = useHandleDeleteBtnClick()

  if(!contact) return null

  const label = !active ? 
    "Delete Contact" : 
    "Confirm Delete"

  return (
    <div className="flex flex-col gap-10 items-center">
      <UpdateContactForm contact={contact} />
      <DeleteBtn onClick={handleClick}>
        {label}
      </DeleteBtn>
  </div>
  )
}