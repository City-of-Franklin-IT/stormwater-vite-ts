import { authHeaders } from "@/helpers/utils"
import * as AppActions from '@/context/App/AppActions'

// Types
import * as AppTypes from '@/context/App/types'

export const handleUpdateInspector = async (formData: AppTypes.InspectorCreateInterface, token: string) => {
  const result = await AppActions.updateInspector(formData, authHeaders(token))

  return result
}