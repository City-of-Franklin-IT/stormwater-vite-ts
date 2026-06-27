import { useQuery } from "@tanstack/react-query"
import { authHeaders } from "@/helpers/utils"
import * as AppActions from "@/context/App/AppActions"
import { useEnableQuery, withTokenRefresh } from "@helpers/hooks"

/**
* Returns sites from server
**/
export const useGetSites = () => {
  const { enabled, token, refreshToken } = useEnableQuery()

  return useQuery({
    queryKey: ["getSites"],
    queryFn: () => withTokenRefresh(
      () => AppActions.getSites(authHeaders(token)),
      refreshToken
    ),
    enabled,
    staleTime: Infinity
  })
}