import * as AppActions from "@/context/App/AppActions"
import { authHeaders } from "@/helpers/utils"

// Types
import * as AppTypes from "@/context/App/types"

export const handleCreateSite = async (formData: AppTypes.SiteCreateInterface, token: string) => {
  const result = await AppActions.createSite(formData, authHeaders(token))

  if(result.success) {
    if(formData.SiteContacts?.length) {
      await Promise.all(
        formData.SiteContacts.map(contact => AppActions.createSiteContact({ ...contact, siteId: result.data.siteId }, authHeaders(token)))
      )
    }

  }

  return result
}