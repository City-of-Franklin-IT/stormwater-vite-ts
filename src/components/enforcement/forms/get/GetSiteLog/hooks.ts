import { useState, useContext, useCallback } from "react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useParams } from "react-router"
import EnforcementCtx from "@/components/enforcement/context"
import * as AppActions from "@/context/App/AppActions"
import { useEnableQuery, withTokenRefresh } from "@/helpers/hooks"
import { savedPopup, errorPopup } from "@/utils/Toast/Toast"

// Types
import { authHeaders } from "@/helpers/utils"

/**
* Returns site log query by formUUID from EnforcementCtx
**/
export const useGetSiteLog = () => {
  const { formUUID } = useContext(EnforcementCtx)

  const { enabled, token, refreshToken } = useEnableQuery()

  return useQuery({
    queryKey: ["getSiteLog", formUUID],
    queryFn: () => withTokenRefresh(
      () => AppActions.getSiteLog(formUUID as string, authHeaders(token)),
      refreshToken
    ),
    enabled: enabled && !!formUUID
  })
}

/**
* Returns two-step delete button onClick handler and active state for site log deletion
**/
export const useOnDeleteBtnClick = (uuid: string) => {
  const { dispatch } = useContext(EnforcementCtx)

  const [state, setState] = useState<{ active: boolean }>({ active: false })

  const { enabled, token, refreshToken } = useEnableQuery()

  const queryClient = useQueryClient()

  const { uuid: siteUUID } = useParams<{ uuid: string }>()

  const onClick = useCallback(async () => {
    if(!state.active) {
      setState({ active: true })
      return
    }

    if(enabled) {
      const result = await withTokenRefresh(
        () => AppActions.deleteSiteLog(uuid, authHeaders(token)),
        refreshToken
      ).catch(() => { errorPopup('An error occurred. Please try again.'); return null })

      if(result?.success) {
        savedPopup(result.msg)
        queryClient.invalidateQueries({ queryKey: ["getSite", siteUUID] })
        queryClient.invalidateQueries({ queryKey: ["getSites"] })
        queryClient.invalidateQueries({ queryKey: ["getInspector"] })
        dispatch({ type: "RESET_CTX" })
      } else if(result) errorPopup(result.msg)
    }
  }, [state.active, enabled, token, refreshToken, siteUUID, queryClient, uuid, dispatch])

  return { onClick, active: state.active }
}