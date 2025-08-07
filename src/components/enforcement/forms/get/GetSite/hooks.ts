import { useContext, useEffect, useState } from "react"
import { useLocation } from "react-router"
import { useQuery } from "react-query"
import EnforcementCtx from "@/components/enforcement/context"
import * as AppActions from '@/context/App/AppActions'
import { authHeaders } from "@/helpers/utils"
import { useEnableQuery } from "@/helpers/hooks"
import { createFormMap } from './utils'

// Types
import { CreateFormType } from "./utils"

export const useGetActiveSiteNames = () => { // Get active site names
  const { enabled, token } = useEnableQuery()

  return useQuery('getActiveSiteName', () => AppActions.getActiveSiteNames(authHeaders(token)), { enabled })
}

export const useGetSelectedSite = () => {
  const { selectedSite } = useContext(EnforcementCtx)

  const { enabled, token } = useEnableQuery()

  return useQuery(['getSite', selectedSite], () => AppActions.getSite(selectedSite, authHeaders(token)), { enabled: enabled && !!selectedSite && selectedSite !== 'No Site' })
}

export const useHandleSiteSelection = () => {
  const { dispatch } = useContext(EnforcementCtx)

  const [state, setState] = useState<{ selectionMade: boolean }>({ selectionMade: false })

  const onSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setState({ selectionMade: true })
    dispatch({ type: 'SET_SELECTED_SITE', payload: e.currentTarget.value })
  }

  const onNoSiteSelect = () => {
    setState({ selectionMade: true })
    dispatch({ type: 'SET_SELECTED_SITE', payload: 'No Site' })
  }

  return { selectionMade: state.selectionMade, onSelect, onNoSiteSelect }
}

export const useNoSiteBtnVisibility = () => {
  const location = useLocation().pathname.split('/')[3]

  const visible = location !== 'violation'

  return visible
}

export const useSetFormType = () => {
  const location = useLocation().pathname.split('/')[3]

  const Component = createFormMap.get(location as CreateFormType)

  return Component
}

export const useResetCtx = () => {
  const { dispatch } = useContext(EnforcementCtx)

  useEffect(() => {
    return () => dispatch({ type: 'RESET_CTX' })
  }, [dispatch])
}