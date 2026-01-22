import { authHeaders } from "@/helpers/utils"
import * as AppActions from '@/context/App/AppActions'

// Types
import * as AppTypes from '@/context/App/types'

export const handleUpdateViolation = async (formData: AppTypes.ConstructionViolationCreateInterface, token: string) => { 
  const result = await AppActions.updateViolation(formData, authHeaders(token))

  if(result.success) {
    if(formData.FollowUpDates.length) {
      await Promise.all(
        formData.FollowUpDates.map(followup => { // Follow up dates
          if(followup.followUpDate) {
            if(!followup.uuid) { // New follow up
              AppActions.createFollowUp({ ...followup, violationId: formData.violationId }, authHeaders(token))
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