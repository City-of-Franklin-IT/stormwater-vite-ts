import { useCallback, useContext } from "react"
import { useParams } from "react-router"
import { useQueryClient } from "react-query"
import { useForm, useFormContext } from "react-hook-form"
import InspectorTableCtx from "@/components/inspectors/tables/InspectorTable/context"
import { useEnableQuery } from "@/helpers/hooks"
import { errorPopup } from "@/utils/Toast/Toast"
import { handleCreateMultipleSiteLogs } from './utils'

export const useCreateMultipleSiteLogsForm = () => { // CreateMultipleSiteLogsForm useForm
  const { selection } = useContext(InspectorTableCtx)

  return useForm<{ siteIds: string[], inspectionDate: string }>({
    defaultValues: {
      siteIds: selection,
      inspectionDate: new Date().toISOString().split('T')[0]
    }
  })
}

export const useCreateMultipleSiteLogsFormContext = () => { // CreateMultipleSiteLogsForm context
  const methods = useFormContext<{ siteId: string[], inspectionDate: string }>()

  return methods
}

export const useOnCancelBtnClick = () => {
  const { dispatch } = useContext(InspectorTableCtx)

  return () => dispatch({ type: 'TOGGLE_FORM_OPEN' })
}

export const useHandleFormSubmit = () => { // Handle form submit
  const { dispatch } = useContext(InspectorTableCtx)

  // TODO verify hook
  const { slug } = useParams<{ slug: string }>()

  const queryClient = useQueryClient()

  const { enabled, token } = useEnableQuery()

  return useCallback((formData: { siteIds: string[], inspectionDate: string }) => {
    if(!enabled || !token) return

    handleCreateMultipleSiteLogs(formData, token)
      .then(() => {
        queryClient.invalidateQueries(['getInspector', slug])
        dispatch({ type: 'RESET_CTX' })
      })
      .catch(err => errorPopup(err))
  }, [enabled, token, queryClient, slug, dispatch])
}