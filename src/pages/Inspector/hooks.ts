import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router"
import * as AppActions from "@/context/App/AppActions"
import { useEnableQuery } from "../../helpers/hooks"
import { authHeaders } from "@/helpers/utils"

/**
* Returns inspector data from server
**/
export const useGetInspector = () => {
  const { enabled, token } = useEnableQuery()

  const { slug } = useParams<{ slug: string }>()

  return useQuery({
    queryKey: ["getInspector", slug],
    queryFn: () => AppActions.getInspector(slug as string, authHeaders(token)),
    enabled: enabled && !!slug,
    staleTime: Infinity
  })
}