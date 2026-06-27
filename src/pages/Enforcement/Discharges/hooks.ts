import { useQuery } from "@tanstack/react-query"
import { useEnableQuery, withTokenRefresh } from "@/helpers/hooks"
import { authHeaders } from "@/helpers/utils"
import * as AppActions from "@/context/App/AppActions"

/**
* Returns illicit discharges from server
**/
export const useGetDischarges = () => {
  const { enabled, token, refreshToken } = useEnableQuery()

  return useQuery({
    queryKey: ["getIllicitDischarges"],
    queryFn: () => withTokenRefresh(
      () => AppActions.getIllicitDischarges(authHeaders(token)),
      refreshToken
    ),
    enabled,
    staleTime: Infinity
  })
}