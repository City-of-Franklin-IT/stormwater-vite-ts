import { useCallback, useContext } from 'react'
import { useParams, useNavigate } from 'react-router'
import { useQueryClient } from 'react-query'
import { useForm, useFormContext } from 'react-hook-form'
import EnforcementCtx from '@/components/enforcement/context'
import { useEnableQuery } from '@/helpers/hooks'
import { formatDate } from '@/helpers/utils'
import { errorPopup } from '@/utils/Toast/Toast'
import { handleCreateViolation } from './utils'

// Types
import * as AppTypes from '@/context/App/types'

export const useCreateViolationForm = (site: AppTypes.SiteInterface | undefined) => { // CreateViolationForm useForm
  const { formDate } = useContext(EnforcementCtx)

  return useForm<AppTypes.ConstructionViolationCreateInterface>({
    mode: 'onBlur',
    defaultValues: {
      siteId: site?.siteId,
      date: formatDate(formDate),
      details: '',
      enforcementAction: null,
      penaltyDate: null,
      penaltyAmount: null,
      penaltyDueDate: null,
      paymentReceived: null,
      swoDate: null,
      swoLiftedDate: null,
      compliance: null,
      closed: null,
      FollowUpDates: []
    }
  })
}

export const useCreateViolationFormContext = () => { // CreateViolationForm context
  const methods = useFormContext<AppTypes.ConstructionViolationCreateInterface>()

  return methods
}

export const useOnCancelBtnClick = () => { // Handle cancel btn click
  const navigate = useNavigate()

  return () => navigate('/sites')
}

export const useHandleFormSubmit = () => { // Handle form submit
  const { enabled, token } = useEnableQuery()

  const navigate = useNavigate()

  const queryClient = useQueryClient()

  const { uuid: siteUUID } = useParams<{ uuid: string }>()

  return useCallback((formData: AppTypes.ConstructionViolationCreateInterface) => {
    if(!enabled || !token) return

    handleCreateViolation(formData, token)
      .then(() => {
        queryClient.invalidateQueries('getViolations')
        queryClient.invalidateQueries(['getSite', siteUUID])
        navigate('/enforcement/violations')
      })
      .catch(err => errorPopup(err))
  }, [enabled, token, queryClient, siteUUID])
}