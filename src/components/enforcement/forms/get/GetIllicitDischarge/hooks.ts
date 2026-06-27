import { useContext } from "react"
import { useQuery } from "@tanstack/react-query"
import EnforcementCtx from "@/components/enforcement/context"
import { useEnableQuery, withTokenRefresh } from "@/helpers/hooks"
import { authHeaders } from "@/helpers/utils"
import * as AppActions from "@/context/App/AppActions"

/**
* Returns illicit discharge query by formUUID from EnforcementCtx
**/
export const useGetIllicitDischarge = () => {
  const { formUUID } = useContext(EnforcementCtx)

  const { enabled, token, refreshToken } = useEnableQuery()

  return useQuery({
    queryKey: ["getIllicitDischarge", formUUID],
    queryFn: () => withTokenRefresh(
      () => AppActions.getIllicitDischarge(formUUID as string, authHeaders(token)),
      refreshToken
    ),
    enabled: enabled && !!formUUID
  })
}