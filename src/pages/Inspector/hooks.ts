import { useQuery } from "react-query"
import { useParams } from "react-router"
import { getInspector } from "../../context/App/AppActions"
import { useEnableQuery } from "../../helpers/hooks"
import { authHeaders } from "@/helpers/utils"

export const useGetInspector = () => { // Get inspector data by slug
  const { enabled, token } = useEnableQuery()

  const { slug } = useParams<{ slug: string }>()

  return useQuery(['getInspector', slug], () => getInspector(slug as string, authHeaders(token)), { enabled: enabled && !!slug, staleTime: 600000 })
}