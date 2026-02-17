import { useContext } from "react"
import { useParams } from "react-router"
import { useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { useOnCancelBtnClick } from "../../create/CreateViolationForm/hooks"
import EnforcementCtx from "@/components/enforcement/context"
import { useEnableQuery } from "@/helpers/hooks"
import { formatDate } from "@/helpers/utils"
import { errorPopup, savedPopup } from "@/utils/Toast/Toast"
import { handleUpdateComplaint } from "./utils"

// Types
import * as AppTypes from "@/context/App/types"

/**
* Returns update complaint form methods, form submit function, and cancel button onClick handler
**/
export const useHandleUpdateComplaintForm = (complaint: AppTypes.ComplaintInterface) => {
  const methods = useUpdateComplaintForm(complaint)
  const handleFormSubmit = useHandleFormSubmit()
  const onCancelBtnClick = useOnCancelBtnClick()

  return { methods, handleFormSubmit, onCancelBtnClick }
}

/**
* Returns update complaint form methods
**/
const useUpdateComplaintForm = (complaint: AppTypes.ComplaintInterface) => {

  return useForm<AppTypes.ComplaintCreateInterface>({
    defaultValues: {
      ...complaint,
      date: formatDate(complaint.date),
      FollowUpDates: complaint.FollowUpDates?.map(followup => ({
        ...followup,
        followUpDate: formatDate(followup.followUpDate)
      }))
    }
  })
}

/**
* Returns update complaint form submit function
**/
const useHandleFormSubmit = () => {
  const { dispatch } = useContext(EnforcementCtx)

  const queryClient = useQueryClient()
  const { uuid: siteUUID } = useParams<{ uuid: string }>()

  const { enabled, token } = useEnableQuery()

  return async (formData: AppTypes.ComplaintCreateInterface) => {
    if(!enabled || !token) return

    const result = await handleUpdateComplaint(formData, token).catch(err => console.log(err))

    if(!result?.success) {
      errorPopup(result?.msg || "Error Updating Complaint")
    } else savedPopup(result.msg)

    queryClient.invalidateQueries({ queryKey: ["getComplaints"] })
    queryClient.invalidateQueries({ queryKey: ["getSite", siteUUID] })
    queryClient.invalidateQueries({ queryKey: ["getSites"] })
    queryClient.invalidateQueries({ queryKey: ["getInspector"] })
    queryClient.invalidateQueries({ queryKey: ["getComplaint", formData.uuid] })
    dispatch({ type: "RESET_CTX" })
  }
}