import { useContext } from "react"
import { useParams } from "react-router"
import { useQueryClient } from "@tanstack/react-query"
import { useForm, useFormContext } from "react-hook-form"
import InspectorTableCtx from "@/components/inspectors/tables/InspectorTable/context"
import { useEnableQuery } from "@/helpers/hooks"
import { handleCreateMultipleSiteLogs } from './utils'

/**
* Returns create multiple site logs form methods, form submit function, and cancel button onClick handler
**/
export const useHandleCreateMultipleSiteLogsForm = () => {
  const methods = useCreateMultipleSiteLogsForm()
  const handleFormSubmit = useHandleFormSubmit()
  const onCancelBtnClick = useOnCancelBtnClick()

  return { methods, handleFormSubmit, onCancelBtnClick }
}

/**
* Returns create multiple site logs form context
**/
export const useCreateMultipleSiteLogsFormContext = () => {
  const methods = useFormContext<{ siteId: string[], inspectionDate: string }>()

  return methods
}

/**
* Returns create multiple site logs form methods
**/
const useCreateMultipleSiteLogsForm = () => {
  const { selection } = useContext(InspectorTableCtx)

  return useForm<{ siteIds: string[], inspectionDate: string }>({
    defaultValues: {
      siteIds: selection,
      inspectionDate: new Date().toISOString().split('T')[0]
    }
  })
}

/**
* Returns cancel button onClick handler
**/
const useOnCancelBtnClick = () => {
  const { dispatch } = useContext(InspectorTableCtx)

  return () => dispatch({ type: 'TOGGLE_FORM_OPEN' })
}

/**
* Returns create multiple site logs form submit function
**/
const useHandleFormSubmit = () => { // Handle form submit
  const { dispatch } = useContext(InspectorTableCtx)

  const { slug } = useParams<{ slug: string }>()
  const queryClient = useQueryClient()

  const { enabled, token } = useEnableQuery()

  return async (formData: { siteIds: string[], inspectionDate: string }) => {
    if(!enabled || !token) return

    await handleCreateMultipleSiteLogs(formData, token)

    queryClient.invalidateQueries({ queryKey: ['getInspector', slug] })
    dispatch({ type: 'RESET_CTX' })
  }
}