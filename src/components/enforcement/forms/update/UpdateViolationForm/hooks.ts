import { useCallback, useContext } from "react"
import { useParams } from "react-router"
import { useQueryClient } from "react-query"
import { useForm } from "react-hook-form"
import { useOnCancelBtnClick } from "../../create/CreateViolationForm/hooks"
import EnforcementCtx from "@/components/enforcement/context"
import { useEnableQuery } from "@/helpers/hooks"
import { formatDate } from "@/helpers/utils"
import { errorPopup } from "@/utils/Toast/Toast"
import { handleUpdateViolation } from './utils'

// Types
import * as AppTypes from '@/context/App/types'

export const useHandleUpdateViolationForm = (violation: AppTypes.ConstructionViolationInterface) => {
  const methods = useUpdateViolationForm(violation)
  const handleFormSubmit = useHandleFormSubmit()
  const onCancelBtnClick = useOnCancelBtnClick()

  return { methods, handleFormSubmit, onCancelBtnClick }
}

const useUpdateViolationForm = (violation: AppTypes.ConstructionViolationInterface) => { // UpdateViolationForm useForm

  return useForm<AppTypes.ConstructionViolationCreateInterface>({
    mode: 'onBlur',
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
      }))
    }
  })
}

const useHandleFormSubmit = () => { // Handle form submit
  const { dispatch } = useContext(EnforcementCtx)

  const { enabled, token } = useEnableQuery()

  const queryClient = useQueryClient()

  const { uuid: siteUUID } = useParams<{ uuid: string }>()

  return useCallback((formData: AppTypes.ConstructionViolationCreateInterface) => {
    if(!enabled || !token) {
      return
    }

    handleUpdateViolation(formData, token)
      .then(() => {
        queryClient.invalidateQueries('getViolations')
        queryClient.invalidateQueries(['getSite', siteUUID])
        queryClient.invalidateQueries(['getViolation', formData.uuid])
        dispatch({ type: 'RESET_CTX' })
      })
      .catch(err => errorPopup(err))
  }, [enabled, token, queryClient, dispatch, siteUUID])
}