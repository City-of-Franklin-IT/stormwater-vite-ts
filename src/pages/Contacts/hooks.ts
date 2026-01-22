import { useQuery } from "@tanstack/react-query"
import { authHeaders } from "@/helpers/utils"
import { useEnableQuery } from "@/helpers/hooks"
import * as AppActions from '@/context/App/AppActions'

/**
* Returns contacts from server
**/
export const useGetContacts = () => {
  const { enabled, token } = useEnableQuery()

  return useQuery({
    queryKey: ['getContacts'],
    queryFn: () => AppActions.getContacts(authHeaders(token)),
    enabled,
    staleTime: Infinity
  })
}