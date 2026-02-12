import { authHeaders } from "@/helpers/utils"
import * as AppActions from "@/context/App/AppActions"

// Types
import * as AppTypes from "@/context/App/types"

export const handleCreateComplaint = async (formData: AppTypes.ComplaintCreateInterface, token: string) => {
  const result = await AppActions.createComplaint(formData, authHeaders(token))

  if(result.success) {
    if(formData.FollowUpDates.length) {
      await Promise.all(
        formData.FollowUpDates.map(date => {
          if(date.followUpDate) {
            AppActions.createFollowUp({ ...date, complaintId: result.data.complaintId }, authHeaders(token))
          }
        })
      )
    }

    return result
  }
}