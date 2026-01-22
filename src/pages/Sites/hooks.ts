import { useQuery } from "@tanstack/react-query"
import { authHeaders } from "@/helpers/utils"
import * as AppActions from '@/context/App/AppActions'
import { useEnableQuery } from '@helpers/hooks'

/**
* Returns sites from server
**/
export const useGetSites = () => { // Get sites
  const { enabled, token } = useEnableQuery()

  return useQuery({ 
    queryKey: ['getSites'], 
    queryFn: () => AppActions.getSites(authHeaders(token)), 
    enabled, 
    staleTime: Infinity 
  })
}