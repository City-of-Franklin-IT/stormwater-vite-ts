import { useContext } from "react"
import { useParams } from "react-router"
import { useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { useOnCancelBtnClick } from "../../create/CreateViolationForm/hooks"
import EnforcementCtx from "@/components/enforcement/context"
import { useEnableQuery } from "@/helpers/hooks"
import { formatDate } from "@/helpers/utils"
import { errorPopup, savedPopup } from "@/utils/Toast/Toast"
import { handleUpdateIllicitDischarge } from './utils'

// Types
import * as AppTypes from '@/context/App/types'
import { StreamWatershedEnum } from "../../create/CreateIllicitDischargeForm/types"

/**
* Returns update illicit discharge form methods, form submit function, and cancel button onClick handler
**/
export const useHandleUpdateIllicitDischargeForm = (illicitDischarge: AppTypes.IllicitDischargeInterface) => {
  const methods = useUpdateIllicitDischargeForm(illicitDischarge)
  const handleFormSubmit = useHandleFormSubmit()
  const onCancelBtnClick = useOnCancelBtnClick()

  return { methods, handleFormSubmit, onCancelBtnClick }
}

/**
* Returns update illicit discharge form methods
**/
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

/**
* Returns update illicit discharge form submit function
**/
const useHandleFormSubmit = () => { // Handle form submit
  const { dispatch } = useContext(EnforcementCtx)

  const queryClient = useQueryClient()
  const { uuid: siteUUID } = useParams<{ uuid: string }>()

  const { enabled, token } = useEnableQuery()

  return async (formData: AppTypes.IllicitDischargeCreateInterface) => {
    if(!enabled || !token) return

    const result = await handleUpdateIllicitDischarge(formData, token)

    if(!result.success) {
      errorPopup(result.msg)
    } else savedPopup(result.msg)

    queryClient.invalidateQueries({ queryKey: ['getIllicitDischarges'] })
    queryClient.invalidateQueries({ queryKey: ['getIllicitDischarge', formData.uuid] })
    queryClient.invalidateQueries({ queryKey: ['getSite', siteUUID] })
    dispatch({ type: 'RESET_CTX' })
  }
}

const useSetStreamWatershed = (streamWatershed: StreamWatershedEnum | string) => {
  if(streamWatershed in StreamWatershedEnum) {
    return streamWatershed as StreamWatershedEnum
  } else return 'Other'
}