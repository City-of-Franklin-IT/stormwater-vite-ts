import { useContext } from "react"
import { useParams } from "react-router"
import { useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { useOnCancelBtnClick } from "../../create/CreateViolationForm/hooks"
import EnforcementCtx from "@/components/enforcement/context"
import { useEnableQuery } from "@/helpers/hooks"
import { formatDate } from "@/helpers/utils"
import { errorPopup, savedPopup } from "@/utils/Toast/Toast"
import { handleUpdateViolation } from "./utils"

// Types
import * as AppTypes from "@/context/App/types"

/**
* Returns update violation form methods, form submit function, and cancel button onClick handler
**/
export const useHandleUpdateViolationForm = (violation: AppTypes.ConstructionViolationInterface) => {
  const methods = useUpdateViolationForm(violation)
  const handleFormSubmit = useHandleFormSubmit()
  const onCancelBtnClick = useOnCancelBtnClick()

  return { methods, handleFormSubmit, onCancelBtnClick }
}

/**
* Returns update violation form methods
**/
const useUpdateViolationForm = (violation: AppTypes.ConstructionViolationInterface) => {

  return useForm<AppTypes.ConstructionViolationCreateInterface>({
    mode: "onBlur",
    defaultValues: {
      ...violation,
      date: formatDate(violation.date),
      penaltyDate: violation.penaltyDate ? formatDate(violation.penaltyDate) : null,
      penaltyDueDate: violation.penaltyDueDate ? formatDate(violation.penaltyDueDate) : null,
      paymentReceived: violation.paymentReceived ? formatDate(violation.paymentReceived) : null,
      swoDate: violation.swoDate ? formatDate(violation.swoDate) : null,
      swoLiftedDate: violation.swoLiftedDate ? formatDate(violation.swoLiftedDate) : null,
      FollowUpDates: violation.FollowUpDates?.map(followup => ({
        ...followup,
        followUpDate: formatDate(followup.followUpDate)
      })) || []
    }
  })
}

/**
* Returns update violation form submit function
**/
const useHandleFormSubmit = () => {
  const { dispatch } = useContext(EnforcementCtx)

  const queryClient = useQueryClient()
  const { uuid: siteUUID } = useParams<{ uuid: string }>()

  const { enabled, token } = useEnableQuery()

  return async (formData: AppTypes.ConstructionViolationCreateInterface) => {
    if(!enabled || !token) return

    const result = await handleUpdateViolation(formData, token).catch(err => console.log(err))

    if(!result?.success) {
      return errorPopup(result?.msg || "Error Updating Violation")
    }

    savedPopup(result.msg)
    queryClient.invalidateQueries({ queryKey: ["getViolations"] })
    queryClient.invalidateQueries({ queryKey: ["getSite", siteUUID] })
    queryClient.invalidateQueries({ queryKey: ["getSites"] })
    queryClient.invalidateQueries({ queryKey: ["getInspector"] })
    queryClient.invalidateQueries({ queryKey: ["getViolation", formData.uuid] })
    dispatch({ type: "RESET_CTX" })
  }
}