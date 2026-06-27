import { useParams } from "react-router"
import { useQuery } from "@tanstack/react-query"
import { useEnableQuery, withTokenRefresh } from "@/helpers/hooks"
import { authHeaders } from "@/helpers/utils"
import * as AppActions from "@/context/App/AppActions"

/**
* Returns site data from server
**/
export const useGetSite = () => {
  const { uuid } = useParams<{ uuid: string }>()

  const { enabled, token, refreshToken } = useEnableQuery()

  return useQuery({
    queryKey: ["getSite", uuid],
    queryFn: () => withTokenRefresh(
      () => AppActions.getSite(uuid as string, authHeaders(token)),
      refreshToken
    ),
    enabled: enabled && !!uuid,
    staleTime: Infinity
  })
}