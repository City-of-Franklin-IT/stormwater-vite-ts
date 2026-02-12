import { useQuery } from "@tanstack/react-query"
import { useLocation } from "react-router"
import { useEnableQuery } from "@/helpers/hooks"
import { authHeaders } from "@/helpers/utils"
import * as AppActions from "@/context/App/AppActions"

export const useGetInspectors = () => {
  const { enabled, token } = useEnableQuery()

  return useQuery({
    queryKey: ["getInspectors"],
    queryFn: () => AppActions.getInspectors(authHeaders(token)),
    enabled,
    staleTime: Infinity
  })
}

export const useIsEnforcmentPageActive = () => {
  const pathname = useLocation().pathname

  return ["/enforcement/violations", "/enforcement/complaints", "/enforcement/discharges"].includes(pathname)
}