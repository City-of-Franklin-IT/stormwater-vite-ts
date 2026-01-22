import { useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router"
import { useForm, useFormContext } from "react-hook-form"
import { useEnableQuery } from "@/helpers/hooks"
import { errorPopup, savedPopup } from "@/utils/Toast/Toast"
import { handleCreateInspectorFormSubmit } from './utils'

// Types
import * as AppTypes from '@/context/App/types'

/**
* Returns create inspector form methods, form submit function, and cancel button onClick handler
**/
export const useHandleCreateInspectorForm = () => {
  const methods = useCreateInspectorForm()
  const handleFormSubmit = useHandleFormSubmit()
  const onCancelBtnClick = useOnCancelBtnClick()

  return { methods, handleFormSubmit, onCancelBtnClick }
}

/**
* Returns create inspector form context
**/
export const useCreateInspectorFormContext = () => { // CreateInspectorForm context
  const methods = useFormContext<AppTypes.InspectorCreateInterface>()

  return methods
}

/**
* Returns create inspector form methods
**/
const useCreateInspectorForm = () => {

  return useForm<AppTypes.InspectorCreateInterface>({
    mode: 'onBlur',
    defaultValues: {
      name: '',
      email: ''
    }
  })
}

/**
* Returns create inspector form cancel button onClick handler
**/
const useOnCancelBtnClick = () => {
  const navigate = useNavigate()

  return () => navigate('/sites')
}

/**
* Returns create inspector form submit function
**/
const useHandleFormSubmit = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { enabled, token } = useEnableQuery()

  return async (formData: AppTypes.InspectorCreateInterface) => {
    if(!enabled || !token) return

    const result = await handleCreateInspectorFormSubmit(formData, token)

    if(!result.success) {
      errorPopup(result.msg)
      navigate('/sites')
      return
    } else savedPopup(result.msg)

    queryClient.invalidateQueries({ queryKey: ['getInspectors'] })
    navigate(`/inspectors/${ result.data.slug }`)
  }
}