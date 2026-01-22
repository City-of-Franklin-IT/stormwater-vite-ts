import { useContext } from "react"
import { useParams } from "react-router"
import { useForm } from "react-hook-form"
import { useQueryClient } from "@tanstack/react-query"
import { useEnableQuery } from "@/helpers/hooks"
import InspectorCtx from "@/components/inspectors/context"
import { useOnCancelBtnClick } from '@/components/inspectors/containers/InspectorContainer/hooks'
import { errorPopup, savedPopup } from "@/utils/Toast/Toast"
import { handleUpdateInspector } from './utils'

// Types
import * as AppTypes from '@/context/App/types'

/**
* Returns update inspector form methods, cancel button onClick handler, and form submit function
**/
export const useHandleUpdateInspectorForm = (inspector: AppTypes.InspectorInterface) => {
  const methods = useUpdateInspectorForm(inspector)
  const onCancelBtnClick = useOnCancelBtnClick()
  const handleFormSubmit = useHandleFormSubmit()

  return { methods, onCancelBtnClick, handleFormSubmit }
}

/**
* Returns update inspector form methods
**/
const useUpdateInspectorForm = (inspector: AppTypes.InspectorInterface) => { 
  
  return useForm<AppTypes.InspectorInterface>({
    mode: 'onBlur',
    defaultValues: {
      name: inspector.name,
      email: inspector.email,
      inspectorId: inspector.inspectorId,
      uuid: inspector.uuid
    }
  })
}

/**
* Returns update inspector form submit function
**/
const useHandleFormSubmit = () => {
  const { dispatch } = useContext(InspectorCtx)

  const { slug } = useParams<{ slug: string}>()
  const queryClient = useQueryClient()

  const { enabled, token } = useEnableQuery()

  return async (formData: AppTypes.InspectorCreateInterface) => {
    if(!enabled || !token) return

    const result = await handleUpdateInspector(formData, token)

    if(!result.success) {
      errorPopup(result.msg)
    } else savedPopup(result.msg)

    queryClient.invalidateQueries({ queryKey: ['getInspectors'] })
    queryClient.invalidateQueries({ queryKey: ['getInspector', slug] })
    dispatch({ type: 'RESET_CTX' })
  }
}