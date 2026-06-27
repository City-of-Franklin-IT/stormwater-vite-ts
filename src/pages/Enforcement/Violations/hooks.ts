import { useQuery } from "@tanstack/react-query"
import { useEnableQuery, withTokenRefresh } from "@/helpers/hooks"
import { authHeaders } from "@/helpers/utils"
import * as AppActions from "@/context/App/AppActions"

/**
* Returns construction violations from server
**/
export const useGetViolations = () => {
  const { enabled, token, refreshToken } = useEnableQuery()

  return useQuery({
    queryKey: ["getViolations"],
    queryFn: () => withTokenRefresh(
      () => AppActions.getViolations(authHeaders(token)),
      refreshToken
    ),
    enabled,
    staleTime: Infinity
  })
}