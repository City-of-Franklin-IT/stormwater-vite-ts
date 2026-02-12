import { authHeaders } from "@/helpers/utils"
import * as AppActions from "@/context/App/AppActions"

// Types
import * as AppTypes from "@/context/App/types"

export const handleCreateViolation = async (formData: AppTypes.ConstructionViolationCreateInterface, token: string) => {
  const result = await AppActions.createViolation(formData, authHeaders(token))

  if(result.success) {
    if(formData.FollowUpDates?.length) {
      await Promise.all(
        formData.FollowUpDates.map(date => {
          if(date.followUpDate) {
            AppActions.createFollowUp({ ...date, violationId: result.data.violationId }, authHeaders(token))
          }
        })
      )
    }
  }

  return result
}