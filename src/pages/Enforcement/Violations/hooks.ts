import { useQuery } from "@tanstack/react-query"
import { useEnableQuery } from "@/helpers/hooks"
import { authHeaders } from "@/helpers/utils"
import * as AppActions from '@/context/App/AppActions'

/**
* Returns construction violations from server
**/
export const useGetViolations = () => {
  const { enabled, token } = useEnableQuery()

  return useQuery({
    queryKey: ['getViolations'],
    queryFn: () => AppActions.getViolations(authHeaders(token)),
    enabled,
    staleTime: Infinity
  })
}