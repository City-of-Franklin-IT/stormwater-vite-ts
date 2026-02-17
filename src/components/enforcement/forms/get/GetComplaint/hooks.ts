import { useContext } from "react"
import { useQuery } from "@tanstack/react-query"
import EnforcementCtx from "@/components/enforcement/context"
import * as AppActions from "@/context/App/AppActions"
import { useEnableQuery } from "@/helpers/hooks"
import { authHeaders } from "@/helpers/utils"

/**
* Returns complaint query by formUUID from EnforcementCtx
**/
export const useGetComplaint = () => {
  const { formUUID } = useContext(EnforcementCtx)

  const { enabled, token } = useEnableQuery()

  return useQuery({
    queryKey: ["getComplaint", formUUID],
    queryFn: () => AppActions.getComplaint(formUUID as string, authHeaders(token)),
    enabled: enabled && !!formUUID
  })
}