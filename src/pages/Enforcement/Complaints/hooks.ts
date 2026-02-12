import { useQuery } from "@tanstack/react-query"
import * as AppActions from "@/context/App/AppActions"
import { authHeaders } from "@/helpers/utils"
import { useEnableQuery } from "../../../helpers/hooks"

/**
* Returns complaints from server
**/
export const useGetComplaints = () => {
  const { enabled, token } = useEnableQuery()

  return useQuery({
    queryKey: ["getComplaints"],
    queryFn: () => AppActions.getComplaints(authHeaders(token)),
    enabled,
    staleTime: Infinity
  })
}