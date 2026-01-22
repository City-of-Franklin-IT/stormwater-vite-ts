import * as AppActions from '@/context/App/AppActions'
import { authHeaders } from '@/helpers/utils'

// Types
import * as AppTypes from '@/context/App/types'

export const handleUpdateContact = async (formData: AppTypes.ContactCreateInterface, token: string) => {
  const result = await AppActions.updateContact(formData, authHeaders(token))

  return result
}