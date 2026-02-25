import { useContext } from "react"
import { useParams } from "react-router"
import { useQueryClient } from "@tanstack/react-query"
import { useForm, useFormContext } from "react-hook-form"
import InspectorTableCtx from "@/components/inspectors/tables/InspectorTable/context"
import { useEnableQuery } from "@/helpers/hooks"
import { handleCreateMultipleSiteLogs } from "./utils"
import { errorPopup, savedPopup } from "@/utils/Toast/Toast"

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
      inspectionDate: new Date().toISOString().split("T")[0]
    }
  })
}

/**
* Returns cancel button onClick handler
**/
const useOnCancelBtnClick = () => {
  const { dispatch } = useContext(InspectorTableCtx)

  return () => dispatch({ type: "TOGGLE_FORM_OPEN" })
}

/**
* Returns create multiple site logs form submit function
**/
const useHandleFormSubmit = () => {
  const { dispatch } = useContext(InspectorTableCtx)

  const { slug } = useParams<{ slug: string }>()
  const queryClient = useQueryClient()

  const { enabled, token } = useEnableQuery()

  return async (formData: { siteIds: string[], inspectionDate: string }) => {
    if(!enabled || !token) return

    const result = await handleCreateMultipleSiteLogs(formData, token)
      .catch(err => {
        errorPopup(err || "Error Creating Site Logs")
        console.log(err)
      })

    if(result) savedPopup(result)

    queryClient.invalidateQueries({ queryKey: ["getInspector", slug] })
    queryClient.invalidateQueries({ queryKey: ["getSites"] })
    dispatch({ type: "RESET_CTX" })
  }
}