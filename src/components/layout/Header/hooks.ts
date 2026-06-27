import { useQuery } from "@tanstack/react-query"
import { useLocation } from "react-router"
import { useEnableQuery, withTokenRefresh } from "@/helpers/hooks"
import { authHeaders } from "@/helpers/utils"
import * as AppActions from "@/context/App/AppActions"

/**
* Returns inspectors query with infinite stale time
**/
export const useGetInspectors = () => {
  const { enabled, token, refreshToken } = useEnableQuery()

  return useQuery({
    queryKey: ["getInspectors"],
    queryFn: () => withTokenRefresh(
      () => AppActions.getInspectors(authHeaders(token)),
      refreshToken
    ),
    enabled,
    staleTime: Infinity
  })
}

/**
* Returns whether the current route is an enforcement page
**/
export const useIsEnforcmentPageActive = () => {
  const pathname = useLocation().pathname

  return ["/enforcement/violations", "/enforcement/complaints", "/enforcement/discharges"].includes(pathname)
}