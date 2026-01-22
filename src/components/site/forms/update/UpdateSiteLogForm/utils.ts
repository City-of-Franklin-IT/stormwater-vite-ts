import { authHeaders } from '@/helpers/utils'
import * as AppActions from '@/context/App/AppActions'

// Types
import * as AppTypes from '@/context/App/types'

export const handleUpdateSiteLog = async (formData: AppTypes.SiteLogCreateInterface, token: string) => {
  const result = await AppActions.updateSiteLog(formData, authHeaders(token))

  return result
}