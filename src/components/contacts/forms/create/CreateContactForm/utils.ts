import { authHeaders } from "@/helpers/utils"
import * as AppActions from '@/context/App/AppActions'

// Types
import * as AppTypes from '@/context/App/types'

export const handleCreateContact = async (formData: AppTypes.ContactCreateInterface, token: string) => {
  const result = await AppActions.createContact(formData, authHeaders(token))

  return result
}