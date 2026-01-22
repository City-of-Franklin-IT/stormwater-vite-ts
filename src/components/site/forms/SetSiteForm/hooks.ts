import { useState, useContext, useCallback } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router"
import EnforcementCtx from "@/components/enforcement/context"
import SiteCtx from "../../context"
import * as AppActions from '@/context/App/AppActions'
import { useEnableQuery } from "@/helpers/hooks"
import { authHeaders } from "@/helpers/utils"
import { savedPopup, errorPopup } from "@/utils/Toast/Toast"
import { useHandleDeleteBtn as useHandleDeleteViolationBtn } from "@/components/enforcement/containers/ViolationsContainer/hooks"
import { useHandleDeleteBtn as useHandleDeleteComplaintBtn } from "@/components/enforcement/containers/ComplaintsContainer/hooks"
import { useHandleDeleteBtn as useHandleDeleteIllicitDischargeBtn } from "@/components/enforcement/containers/DischargesContainer/hooks"
import { createFormMap } from "./utils"

/**
* Returns site delete button props
**/
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

      queryClient.invalidateQueries({ queryKey: ['getSites'] })
      navigate('/sites')
    }
  }, [state.active, enabled, token, siteUUID, queryClient, navigate])
  
  const label = !state.active ?
    'Delete Site' : 
    'Confirm Delete Site'

  return { onClick, label }
}

/**
* Returns form visibility and createFormActive booleans
**/
export const useHandleForm = () => {
  const { activeForm } = useContext(EnforcementCtx)
  const { siteUUID } = useContext(SiteCtx)

  const visible = activeForm || siteUUID
  const createFormActive = activeForm && !activeForm?.includes('update')

  return { visible, createFormActive }
}

/**
* Returns create form visibility boolean and create form component
**/
export const useHandleSetCreateForm = () => {
  const { activeForm } = useContext(EnforcementCtx)

  const visible = !!activeForm

  if(!visible) return ({ 
    visible: false, CreateFormComponent: null 
  })

  const CreateFormComponent = createFormMap.get(activeForm)!

  return { visible, CreateFormComponent }
}

/**
* Returns form visibility booleans, delete button props, and activeForm from context
**/
export const useHandleSetUpdateForm = () => {
  const { activeForm } = useContext(EnforcementCtx)
  const { siteUUID } = useContext(SiteCtx)

  const handleDeleteViolationBtn = useHandleDeleteViolationBtn()
  const handleDeleteComplaintBtn = useHandleDeleteComplaintBtn()
  const handleDeleteIllicitDischargeBtn = useHandleDeleteIllicitDischargeBtn()

  const deleteBtnProps = {
    violation: handleDeleteViolationBtn,
    complaint: handleDeleteComplaintBtn,
    illicit: handleDeleteIllicitDischargeBtn
  }

  const visibility = {
    form: !!activeForm,
    updateSite: !!siteUUID
  }

  return { visibility, deleteBtnProps, activeForm }
}