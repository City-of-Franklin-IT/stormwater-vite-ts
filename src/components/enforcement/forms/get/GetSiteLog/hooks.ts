import { useState, useContext, useCallback } from "react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useParams } from "react-router"
import EnforcementCtx from "@/components/enforcement/context"
import * as AppActions from "@/context/App/AppActions"
import { useEnableQuery } from "@/helpers/hooks"
import { savedPopup, errorPopup } from "@/utils/Toast/Toast"

// Types
import { authHeaders } from "@/helpers/utils"

export const useGetSiteLog = () => { // Get site log
  const { formUUID } = useContext(EnforcementCtx)

  const { enabled, token } = useEnableQuery()

  return useQuery({
    queryKey: ["getSiteLog", formUUID],
    queryFn: () => AppActions.getSiteLog(formUUID as string, authHeaders(token)),
    enabled: enabled && !!formUUID
  })
}

export const useOnDeleteBtnClick = (uuid: string) => {
  const { dispatch } = useContext(EnforcementCtx)

  const [state, setState] = useState<{ active: boolean }>({ active: false })

  const { enabled, token } = useEnableQuery()

  const queryClient = useQueryClient()

  const { uuid: siteUUID } = useParams<{ uuid: string }>()

  const onClick = useCallback(async () => {
    if(!state.active) {
      setState({ active: true })
      return
    } 

    if(enabled) {
      const result = await AppActions.deleteSiteLog(uuid, authHeaders(token))

      if(result.success) {
        savedPopup(result.msg)
        queryClient.invalidateQueries({ queryKey: ["getSite", siteUUID] })
        dispatch({ type: "RESET_CTX" })
      } else errorPopup(result.msg)
    }
  }, [state.active, enabled, token, siteUUID, queryClient, uuid, dispatch])

  return { onClick, active: state.active }
}