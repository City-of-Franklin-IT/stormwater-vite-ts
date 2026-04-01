import { useContext } from "react"
import { useParams, useNavigate, useLocation } from "react-router"
import { useQueryClient } from "@tanstack/react-query"
import { useForm, useFormContext } from "react-hook-form"
import EnforcementCtx from "@/components/enforcement/context"
import SiteCtx from "@/components/site/context"
import { useEnableQuery } from "@/helpers/hooks"
import { formatDate } from "@/helpers/utils"
import { errorPopup, savedPopup } from "@/utils/Toast/Toast"
import { handleCreateViolation } from "./utils"

// Types
import * as AppTypes from "@/context/App/types"

/**
* Returns create violation form methods, form submit function, and cancel button onClick handler
**/
export const useHandleCreateViolationForm = (site: AppTypes.SiteInterface | undefined) => {
  const methods = useCreateViolationForm(site)
  const handleFormSubmit = useHandleFormSubmit()
  const onCancelBtnClick = useOnCancelBtnClick()

  return { methods, handleFormSubmit, onCancelBtnClick }
}

/**
* Returns create violation form context
**/
export const useCreateViolationFormContext = () => {
  const methods = useFormContext<AppTypes.ConstructionViolationCreateInterface>()

  return methods
}

/**
* Returns cancel button onClick handler
**/
export const useOnCancelBtnClick = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { dispatch: enforcementDispatch } = useContext(EnforcementCtx)
  const { dispatch: siteDispatch } = useContext(SiteCtx)

  return () => {
    enforcementDispatch({ type: "RESET_CTX" })
    siteDispatch({ type: "RESET_CTX" })
    navigate(pathname.replace("/create", ""))
  }
}

/**
* Returns create violation form methods
**/
const useCreateViolationForm = (site: AppTypes.SiteInterface | undefined) => {
  const { formDate } = useContext(EnforcementCtx)

  return useForm<AppTypes.ConstructionViolationCreateInterface>({
    mode: "onBlur",
    defaultValues: {
      siteId: site?.siteId,
      date: formatDate(formDate),
      details: "",
      enforcementAction: null,
      penaltyDate: null,
      penaltyAmount: null,
      penaltyDueDate: null,
      paymentReceived: null,
      swoDate: null,
      swoLiftedDate: null,
      compliance: null,
      closed: null,
      FollowUpDates: []
    }
  })
}

/**
* Returns create violation form submit handler that posts data and invalidates queries
**/
const useHandleFormSubmit = () => {
  const { enabled, token } = useEnableQuery()

  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { uuid: siteUUID } = useParams<{ uuid: string }>()

  return async (formData: AppTypes.ConstructionViolationCreateInterface) => {
    if(!enabled || !token) return

    const result = await handleCreateViolation(formData, token).catch(err => console.log(err))

    if(!result?.success) {
      return errorPopup(result?.msg || "Error Creating Violation")
    }

    savedPopup(result.msg)
    queryClient.invalidateQueries({ queryKey: ["getViolations"] })
    queryClient.invalidateQueries({ queryKey: ["getSite", siteUUID] })
    queryClient.invalidateQueries({ queryKey: ["getSites"] })
    queryClient.invalidateQueries({ queryKey: ["getInspector"] })
    navigate("/enforcement/violations")
  }
}