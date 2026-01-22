import { authHeaders } from '@/helpers/utils'
import * as AppActions from '@/context/App/AppActions'

// Types
import * as AppTypes from '@/context/App/types'

export const handleUpdateIllicitDischarge = async (formData: AppTypes.IllicitDischargeCreateInterface, token: string) => {
  const result = await AppActions.updateIllicitDischarge(formData, authHeaders(token))

  if(result.success) {
    await Promise.all([
      ...formData.FollowUpDates.map(followup => { // Follow up dates
        if(followup.followUpDate) {
          if(!followup.uuid) { // New follow up
            AppActions.createFollowUp({ ...followup, illicitId: formData.illicitId }, authHeaders(token))
          } else AppActions.updateFollowUp(followup, authHeaders(token)) // Update existing
        } else if(followup.uuid) { // Delete existing
          AppActions.deleteFollowUp(followup.uuid, authHeaders(token))
        }
      })
    ])
  }

  return result
}