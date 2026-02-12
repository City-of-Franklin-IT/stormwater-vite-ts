import { useContext } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import ContactsCtx from "@/components/contacts/context"
import { useEnableQuery } from "@/helpers/hooks"
import { handleUpdateContact } from "./utils"

// Types
import * as AppTypes from "@/context/App/types"
import { errorPopup, savedPopup } from "@/utils/Toast/Toast"

/**
* Returns update contact form methods, form submit function, and cancel button onClick handler
**/
export const useHandleUpdateContactForm = (contact: AppTypes.ContactInterface) => {
  const methods = useUpdateContactForm(contact)
  const handleFormSubmit = useHandleFormSubmit()
  const onCancelBtnClick = useOnCancelBtnClick()

  return { methods, handleFormSubmit, onCancelBtnClick }
}

/**
* Returns update contact form methods
**/
const useUpdateContactForm = (contact: AppTypes.ContactInterface) => {

  return useForm<AppTypes.ContactCreateInterface>({
    mode: "onBlur",
    defaultValues: {
      name: contact.name,
      company: contact.company,
      phone: contact.phone,
      email: contact.email,
      inactive: contact.inactive,
      uuid: contact.uuid
    }
  })
}

/**
* Returns cancel button onClick handler
**/
const useOnCancelBtnClick = () => {
  const { dispatch } = useContext(ContactsCtx)

  return () => dispatch({ type: "RESET_CTX" })
}

/**
* Returns update contact form submit function
**/
const useHandleFormSubmit = () => {
  const { dispatch } = useContext(ContactsCtx)

  const queryClient = useQueryClient()

  const { enabled, token } = useEnableQuery()

  return async (formData: AppTypes.ContactCreateInterface) => {
    if(!enabled || !token) return

    const result = await handleUpdateContact(formData, token).catch(err => console.log(err))

    if(!result?.success) {
      errorPopup(result?.msg)
    } else savedPopup(result.msg)

    queryClient.invalidateQueries({ queryKey: ["getContacts"] })
    queryClient.invalidateQueries({ queryKey: ["getContact", formData.uuid] })
    dispatch({ type: "RESET_CTX" })
  }
}