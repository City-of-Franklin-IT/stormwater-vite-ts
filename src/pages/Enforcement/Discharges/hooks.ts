import { useQuery } from "@tanstack/react-query"
import { useEnableQuery } from "@/helpers/hooks"
import { authHeaders } from "@/helpers/utils"
import * as AppActions from "@/context/App/AppActions"

/**
* Returns illicit discharges from server
**/
export const useGetDischarges = () => {
  const { enabled, token } = useEnableQuery()

  return useQuery({
    queryKey: ["getIllicitDischarges"],
    queryFn: () => AppActions.getIllicitDischarges(authHeaders(token)),
    enabled,
    staleTime: Infinity
  })
}