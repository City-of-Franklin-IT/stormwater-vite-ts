import { useContext, useEffect, useState } from "react"
import { useLocation } from "react-router"
import { useQuery } from "@tanstack/react-query"
import EnforcementCtx from "@/components/enforcement/context"
import * as AppActions from "@/context/App/AppActions"
import { authHeaders } from "@/helpers/utils"
import { useEnableQuery, withTokenRefresh } from "@/helpers/hooks"
import { createFormMap } from "./utils"

// Types
import { CreateFormType } from "./utils"

/**
* Returns active site names query
**/
export const useGetActiveSiteNames = () => {
  const { enabled, token, refreshToken } = useEnableQuery()

  return useQuery({
    queryKey: ["getActiveSiteName"],
    queryFn: () => withTokenRefresh(
      () => AppActions.getActiveSiteNames(authHeaders(token)),
      refreshToken
    ),
    enabled
  })
}

/**
* Returns site query for the currently selected site in EnforcementCtx
**/
export const useGetSelectedSite = () => {
  const { selectedSite } = useContext(EnforcementCtx)

  const { enabled, token, refreshToken } = useEnableQuery()

  return useQuery({
    queryKey: ["getSite", selectedSite],
    queryFn: () => withTokenRefresh(
      () => AppActions.getSite(selectedSite, authHeaders(token)),
      refreshToken
    ),
    enabled: enabled && !!selectedSite && selectedSite !== "No Site"
  })
}

/**
* Returns site selection handlers and selection state for the enforcement create form
**/
export const useHandleSiteSelection = () => {
  const { dispatch } = useContext(EnforcementCtx)

  const [state, setState] = useState<{ selectionMade: boolean }>({ selectionMade: false })

  const onSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setState({ selectionMade: true })
    dispatch({ type: "SET_SELECTED_SITE", payload: e.currentTarget.value })
  }

  const onNoSiteSelect = () => {
    setState({ selectionMade: true })
    dispatch({ type: "SET_SELECTED_SITE", payload: "No Site" })
  }

  return { selectionMade: state.selectionMade, onSelect, onNoSiteSelect }
}

/**
* Returns whether the "No Site" button should be visible based on the current enforcement route
**/
export const useNoSiteBtnVisibility = () => {
  const location = useLocation().pathname.split("/")[3]

  const visible = location !== "violations"

  return visible
}

/**
* Returns the create form component based on the current enforcement route
**/
export const useSetFormType = () => {
  const location = useLocation().pathname.split("/")[3]

  const Component = createFormMap.get(location as CreateFormType)

  return Component
}

/**
* Resets EnforcementCtx on component unmount
**/
export const useResetCtx = () => {
  const { dispatch } = useContext(EnforcementCtx)

  useEffect(() => {
    return () => dispatch({ type: "RESET_CTX" })
  }, [dispatch])
}