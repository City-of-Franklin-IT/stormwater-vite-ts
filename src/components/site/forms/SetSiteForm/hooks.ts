import { useState, useContext, useCallback } from "react"
import { useQueryClient } from "react-query"
import { useNavigate } from "react-router"
import EnforcementCtx from "@/components/enforcement/context"
import SiteCtx from "../../context"
import * as AppActions from '@/context/App/AppActions'
import { useEnableQuery } from "@/helpers/hooks"
import { authHeaders } from "@/helpers/utils"
import { savedPopup, errorPopup } from "@/utils/Toast/Toast"

export const useOnDeleteBtnClick = () => {
  const [state, setState] = useState<{ active: boolean }>({ active: false })
  const { siteUUID } = useContext(SiteCtx)

  const { enabled, token } = useEnableQuery()

  const queryClient = useQueryClient()

  const navigate = useNavigate()

  const onClick = useCallback(async () => {
    if(!state.active) {
      setState({ active: true })
      return
    } 

    if(enabled) {
      const result = await AppActions.deleteSite(siteUUID, authHeaders(token))

      if(result.success) {
        savedPopup(result.msg)
      } else errorPopup(result.msg)

      queryClient.invalidateQueries('getSites')
      navigate('/sites')
    }
  }, [state.active, enabled, token, siteUUID, queryClient, navigate])

  return { onClick, active: state.active }
}

export const useHandleForm = () => {
  const { activeForm } = useContext(EnforcementCtx)
  const { siteUUID } = useContext(SiteCtx)

  const visible = activeForm || siteUUID
  const createFormActive = activeForm && !activeForm?.includes('update')

  return { visible, createFormActive }
}