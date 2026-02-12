import { useContext } from "react"
import { useParams } from "react-router"
import { useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { useEnableQuery } from "@/helpers/hooks"
import EnforcementCtx from "@/components/enforcement/context"
import { formatDate } from "@/helpers/utils"
import { handleUpdateSiteLog } from "./utils"

// Types
import * as AppTypes from "@/context/App/types"
import { errorPopup, savedPopup } from "@/utils/Toast/Toast"

/**
* Returns update site log form methods, cancel button onClick handler, and form submit function
**/
export const useHandleUpdateSiteLogForm = (siteLog: AppTypes.SiteLogInterface) => {
  const methods = useUpdateSiteLogForm(siteLog)
  const onCancelBtnClick = useOnCancelBtnClick()
  const handleFormSubmit = useHandleFormSubmit()

  return { methods, onCancelBtnClick, handleFormSubmit }
}

/**
* Returns update site log form methods
**/
const useUpdateSiteLogForm = (siteLog: AppTypes.SiteLogInterface) => {

  return useForm<AppTypes.SiteLogCreateInterface>({
    defaultValues: {
      siteId: siteLog.siteId,
      inspectionDate: formatDate(siteLog.inspectionDate),
      uuid: siteLog.uuid
    }
  })
}

/**
* Returns update site log form cancel button onClick handler
**/
const useOnCancelBtnClick = () => {
  const { dispatch } = useContext(EnforcementCtx)

  const onClick = () => {
    dispatch({ type: "RESET_CTX" })
  }

  return onClick
}

/**
* Returns update site log form submit function
**/
const useHandleFormSubmit = () => {
  const { dispatch } = useContext(EnforcementCtx)

  const queryClient = useQueryClient()
  const { uuid: siteUUID } = useParams<{ uuid: string }>()

  const { enabled, token } = useEnableQuery()

  return async (formData: AppTypes.SiteLogCreateInterface) => {
    if(!enabled || !token) return

    const result = await handleUpdateSiteLog(formData, token).catch(err => console.log(err))

    if(!result?.success) {
      errorPopup(result?.msg || "Error Updating Log")
    } else savedPopup(result.msg)

    queryClient.invalidateQueries({ queryKey: ["getSite", siteUUID] })
    dispatch({ type: "RESET_CTX" })
  }
}