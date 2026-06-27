import { useQuery } from "@tanstack/react-query"
import * as AppActions from "@/context/App/AppActions"
import { authHeaders } from "@/helpers/utils"
import { useEnableQuery, withTokenRefresh } from "../../../helpers/hooks"

/**
* Returns complaints from server
**/
export const useGetComplaints = () => {
  const { enabled, token, refreshToken } = useEnableQuery()

  return useQuery({
    queryKey: ["getComplaints"],
    queryFn: () => withTokenRefresh(
      () => AppActions.getComplaints(authHeaders(token)),
      refreshToken
    ),
    enabled,
    staleTime: Infinity
  })
}