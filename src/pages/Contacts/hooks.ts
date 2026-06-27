import { useQuery } from "@tanstack/react-query"
import { authHeaders } from "@/helpers/utils"
import { useEnableQuery, withTokenRefresh } from "@/helpers/hooks"
import * as AppActions from "@/context/App/AppActions"

/**
* Returns contacts from server
**/
export const useGetContacts = () => {
  const { enabled, token, refreshToken } = useEnableQuery()

  return useQuery({
    queryKey: ["getContacts"],
    queryFn: () => withTokenRefresh(
      () => AppActions.getContacts(authHeaders(token)),
      refreshToken
    ),
    enabled,
    staleTime: Infinity
  })
}