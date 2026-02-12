import { authHeaders } from "@/helpers/utils"
import * as AppActions from "@/context/App/AppActions"

// Types
import * as AppTypes from "@/context/App/types"

export const handleCreateInspectorFormSubmit = async (formData: AppTypes.InspectorCreateInterface, token: string) => { // Handle form submit
  const result = await AppActions.createInspector(formData, authHeaders(token))

  return result
}