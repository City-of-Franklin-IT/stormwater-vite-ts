import * as AppActions from '@/context/App/AppActions'
import { authHeaders } from '@/helpers/utils'

// Types
import * as AppTypes from '@/context/App/types'

export const handleUpdateComplaint = async (formData: AppTypes.ComplaintCreateInterface, token: string) => {
  const result = await AppActions.updateComplaint(formData, authHeaders(token))
  
  if(result.success) {
    if(formData.FollowUpDates.length) {
      await Promise.all(
        formData.FollowUpDates.map(followup => { // Follow up dates
          if(followup.followUpDate) {
            if(!followup.uuid) { // New follow up
              AppActions.createFollowUp({ ...followup, complaintId: formData.complaintId }, authHeaders(token))
            } else AppActions.updateFollowUp(followup, authHeaders(token)) // Update existing
          } else if(followup.uuid) { // Delete existing
            AppActions.deleteFollowUp(followup.uuid, authHeaders(token))
          }
        })
      )
    }
  }

  return result
}