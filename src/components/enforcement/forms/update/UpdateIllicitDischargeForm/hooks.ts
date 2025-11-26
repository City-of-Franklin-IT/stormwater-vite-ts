import { useCallback, useContext } from "react"
import { useParams } from "react-router"
import { useQueryClient } from "react-query"
import { useForm } from "react-hook-form"
import { useOnCancelBtnClick } from "../../create/CreateViolationForm/hooks"
import EnforcementCtx from "@/components/enforcement/context"
import { useEnableQuery } from "@/helpers/hooks"
import { formatDate } from "@/helpers/utils"
import { errorPopup } from "@/utils/Toast/Toast"
import { handleUpdateIllicitDischarge } from './utils'

// Types
import * as AppTypes from '@/context/App/types'
import { StreamWatershedEnum } from "../../create/CreateIllicitDischargeForm/types"

export const useHandleUpdateIllicitDischargeForm = (illicitDischarge: AppTypes.IllicitDischargeInterface) => {
  const methods = useUpdateIllicitDischargeForm(illicitDischarge)
  const handleFormSubmit = useHandleFormSubmit()
  const onCancelBtnClick = useOnCancelBtnClick()

  return { methods, handleFormSubmit, onCancelBtnClick }
}

const useUpdateIllicitDischargeForm = (illicitDischarge: AppTypes.IllicitDischargeInterface) => {
  const setStreamWatershed = useSetStreamWatershed(illicitDischarge.streamWatershed) 

  return useForm<AppTypes.IllicitDischargeCreateInterface>({
    mode: 'onBlur',
    defaultValues: {
      ...illicitDischarge,
      date: formatDate(illicitDischarge.date),
      streamWatershed: setStreamWatershed,
      otherStreamWatershed: setStreamWatershed === 'Other' ? illicitDischarge.streamWatershed : '',
      penaltyDate: illicitDischarge.penaltyDate ? formatDate(illicitDischarge.penaltyDate) : null,
      penaltyDueDate: illicitDischarge.penaltyDueDate ? formatDate(illicitDischarge.penaltyDueDate) : null,
      paymentReceived: illicitDischarge.paymentReceived ? formatDate(illicitDischarge.paymentReceived) : null,
      FollowUpDates: illicitDischarge.FollowUpDates?.map(followup => ({
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

  return useCallback((formData: AppTypes.IllicitDischargeCreateInterface) => {
    if(!enabled || !token) {
      return
    }

    handleUpdateIllicitDischarge(formData, token)
      .then(() => {
        queryClient.invalidateQueries('getIllicitDischarges')
        queryClient.invalidateQueries(['getIllicitDischarge', formData.uuid])
        queryClient.invalidateQueries(['getSite', siteUUID])
        dispatch({ type: 'RESET_CTX' })
      })
      .catch(err => errorPopup(err))
  }, [enabled, token, queryClient, dispatch, siteUUID])
}

const useSetStreamWatershed = (streamWatershed: StreamWatershedEnum | string) => {
  if(streamWatershed in StreamWatershedEnum) {
    return streamWatershed as StreamWatershedEnum
  } else return 'Other'
}