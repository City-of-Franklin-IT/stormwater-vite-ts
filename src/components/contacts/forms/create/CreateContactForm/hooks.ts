import { useContext } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { useForm, useFormContext } from "react-hook-form"
import { useNavigate } from "react-router"
import { useEnableQuery } from "@/helpers/hooks"
import { useOnCancelBtnClick } from "@/components/enforcement/forms/create/CreateViolationForm/hooks"
import ContactsCtx from "@/components/contacts/context"
import { handleCreateContact } from './utils'
import { errorPopup, savedPopup } from "@/utils/Toast/Toast"

// Types
import * as AppTypes from '@/context/App/types'

/**
* Returns create contact form methods, form submit function, and cancel button onClick handler
**/
export const useHandleCreateContactForm = () => {
  const methods = useCreateContactForm()
  const handleFormSubmit = useHandleFormSubmit()
  const onCancelBtnClick = useOnCancelBtnClick()

  return { methods, handleFormSubmit, onCancelBtnClick }
}

/**
* Returns create contact form context
**/
export const useCreateContactFormContext = () => {
  
  return useFormContext<AppTypes.ContactCreateInterface>()
}

/**
* Returns create contact form methods
**/
const useCreateContactForm = () => {

  return useForm<AppTypes.ContactCreateInterface>({
    mode: 'onBlur',
    defaultValues: {
      name: '',
      company: '',
      phone: '',
      email: ''
    }
  })
}

/**
* Returns create contact form submit function
**/
const useHandleFormSubmit = () => {
  const { dispatch } = useContext(ContactsCtx)

  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const { enabled, token } = useEnableQuery()

  return async (formData: AppTypes.ContactCreateInterface) => {
    if(!enabled || !token) return

    const result = await handleCreateContact(formData, token)

    if(!result.success) {
      errorPopup(result.msg)
    } else savedPopup(result.msg)

    queryClient.invalidateQueries({ queryKey: ['getContacts'] })
    dispatch({ type: 'RESET_CTX' })
    navigate('/contacts')
  }
}