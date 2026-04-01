import * as AppActions from "@/context/App/AppActions"
import { authHeaders } from "@/helpers/utils"

// Types
import * as AppTypes from "@/context/App/types"

export const handleUpdateSite = async (formData: AppTypes.SiteCreateInterface, token: string) => { // Handle form submit
  const result = await AppActions.updateSite(formData, authHeaders(token))

  if(result.success) {
    const inactiveSite = formData.InactiveSite

    if(inactiveSite) {
      if(inactiveSite.siteId && !inactiveSite.uuid) { // Create
        await AppActions.createInactiveSite(inactiveSite, authHeaders(token))
      }

      if(!inactiveSite.siteId && inactiveSite.uuid) { // Delete
        await AppActions.deleteInactiveSite(inactiveSite.uuid, authHeaders(token))
      }
    }

    const incompleteSite = formData.IncompleteSite

    if(incompleteSite) {
      if(incompleteSite.siteId && !incompleteSite.uuid) { // Create
        await AppActions.createIncompleteSite(incompleteSite, authHeaders(token))
      }

      if(!incompleteSite.siteId && incompleteSite.uuid) { // Delete
        await AppActions.deleteIncompleteSite(incompleteSite.uuid, authHeaders(token))
      }
    }

    await AppActions.deleteSiteContacts(result.data.siteId, authHeaders(token))

    const contacts = formData.SiteContacts || []

    await Promise.all(contacts.map(contact => AppActions.createSiteContact({ ...contact, siteId: result.data.siteId }, authHeaders(token))))
  }

  return result
}