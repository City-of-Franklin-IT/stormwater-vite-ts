import * as AppActions from "@/context/App/AppActions"
import { authHeaders } from "@/helpers/utils"

// Types
import * as AppTypes from "@/context/App/types"

export const handleCreateSiteLog = async (formData: AppTypes.SiteLogCreateInterface, token: string) => { // Handle form submit
  const result = await AppActions.createSiteLog(formData, authHeaders(token))

  return result
}