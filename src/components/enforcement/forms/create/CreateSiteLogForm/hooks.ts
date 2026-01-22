import { useContext } from "react"
import { useParams } from "react-router"
import { useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import EnforcementCtx from "@/components/enforcement/context"
import { useEnableQuery } from "@/helpers/hooks"
import { formatDate } from "@/helpers/utils"
import { errorPopup, savedPopup } from "@/utils/Toast/Toast"
import { handleCreateSiteLog } from './utils'

// Types
import * as AppTypes from '@/context/App/types'

/**
* Returns create site log form methods, form submit function, and cancel button onClick handler
**/
export const useHandleCreateSiteLogForm = (site: AppTypes.SiteInterface) => {
  const methods = useCreateSiteLogForm(site.siteId)
  const handleFormSubmit = useHandleFormSubmit()
  const onCancelBtnClick = useOnCancelBtnClick()

  return { methods, handleFormSubmit, onCancelBtnClick }
}

/**
* Returns cancel button onClick handler
**/
export const useOnCancelBtnClick = () => {
  const { dispatch } = useContext(EnforcementCtx)

  return () => dispatch({ type: 'RESET_CTX' })
}

/**
* Returns create site log form methods
**/
const useCreateSiteLogForm = (siteId: string) => {
  const { formDate } = useContext(EnforcementCtx)

  return useForm<AppTypes.SiteLogCreateInterface>({
    defaultValues: {
      siteId,
      inspectionDate: formatDate(formDate)
    }
  })
}

/**
* Returns create site log form submit function
**/
const useHandleFormSubmit = () => {
  const { dispatch } = useContext(EnforcementCtx)

  const queryClient = useQueryClient()
  const { uuid: siteUUID } = useParams<{ uuid: string }>()

  const { enabled, token } = useEnableQuery()

  return async (formData: AppTypes.SiteLogCreateInterface) => {
    if(!enabled || !token) return

    const result = await handleCreateSiteLog(formData, token)

    if(!result.success) {
      errorPopup(result.msg)
    } else savedPopup(result.msg)

    queryClient.invalidateQueries({ queryKey: ['getSite', siteUUID] })
    dispatch({ type: 'RESET_CTX' })
  }
}