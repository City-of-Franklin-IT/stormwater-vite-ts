import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router"
import * as AppActions from "@/context/App/AppActions"
import { useEnableQuery, withTokenRefresh } from "../../helpers/hooks"
import { authHeaders } from "@/helpers/utils"

/**
* Returns inspector data from server
**/
export const useGetInspector = () => {
  const { enabled, token, refreshToken } = useEnableQuery()

  const { slug } = useParams<{ slug: string }>()

  return useQuery({
    queryKey: ["getInspector", slug],
    queryFn: () => withTokenRefresh(
      () => AppActions.getInspector(slug as string, authHeaders(token)),
      refreshToken
    ),
    enabled: enabled && !!slug,
    staleTime: Infinity
  })
}