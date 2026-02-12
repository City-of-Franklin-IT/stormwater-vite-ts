import { authHeaders } from "@/helpers/utils"
import * as AppActions from "@/context/App/AppActions"

export const handleCreateMultipleSiteLogs = async (formData: { siteIds: string[], inspectionDate: string }, token: string) => { // Handle form submit
  const { siteIds, inspectionDate } = formData

  await Promise.all(
    siteIds.map(async siteId => await AppActions.createSiteLog({ siteId, inspectionDate }, authHeaders(token)))
  )

  const savedMsg = siteIds.length === 1 ? 
    "Site Log Created" : 
    "Site Logs Created"

  return savedMsg
}