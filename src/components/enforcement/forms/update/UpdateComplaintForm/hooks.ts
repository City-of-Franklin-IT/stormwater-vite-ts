import { useCallback, useContext } from "react"
import { useParams } from "react-router"
import { useQueryClient } from "react-query"
import { useForm } from "react-hook-form"
import { useOnCancelBtnClick } from "../../create/CreateViolationForm/hooks"
import EnforcementCtx from "@/components/enforcement/context"
import { useEnableQuery } from "@/helpers/hooks"
import { formatDate } from "@/helpers/utils"
import { errorPopup } from "@/utils/Toast/Toast"
import { handleUpdateComplaint } from './utils'

// Types
import * as AppTypes from '@/context/App/types'

export const useHandleComplaintForm = (complaint: AppTypes.ComplaintInterface) => {
  const methods = useUpdateComplaintForm(complaint)
  const handleFormSubmit = useHandleFormSubmit()
  const onCancelBtnClick = useOnCancelBtnClick()

  return { methods, handleFormSubmit, onCancelBtnClick }
}

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

const useHandleFormSubmit = () => { // Handle form submit
  const { dispatch } = useContext(EnforcementCtx)

  const { enabled, token } = useEnableQuery()

  const queryClient = useQueryClient()

  const { uuid: siteUUID } = useParams<{ uuid: string }>()

  return useCallback((formData: AppTypes.ComplaintCreateInterface) => {
    if(!enabled || !token) {
      return
    }

    handleUpdateComplaint(formData, token)
      .then(() => {
        queryClient.invalidateQueries('getComplaints')
        queryClient.invalidateQueries(['getSite', siteUUID])
        queryClient.invalidateQueries(['getComplaint', formData.uuid])
        dispatch({ type: 'RESET_CTX' })
      })
      .catch(err => errorPopup(err))
  }, [enabled, token, queryClient, dispatch, siteUUID])
}