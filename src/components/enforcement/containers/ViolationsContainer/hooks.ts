import React, { useContext, useCallback, useMemo, useEffect, useState } from "react"
import { useQueryClient } from "@tanstack/react-query"
import EnforcementCtx from "../../context"
import * as AppActions from "@/context/App/AppActions"
import { useEnableQuery } from "@/helpers/hooks"
import { authHeaders } from "@/helpers/utils"
import { savedPopup, errorPopup } from "@/utils/Toast/Toast"

// Types
import * as AppTypes from "@/context/App/types"
import { ViolationTableDataType } from "./components"
import { useParams } from "react-router"

export const useHandleNavBtns = () => {
  const { currentPage, totalPages, dispatch } = useContext(EnforcementCtx)

  const handlePrevBtn = useCallback(() => {
    if(currentPage !== 1) {
      dispatch({ type: "SET_CURRENT_PAGE", payload: currentPage - 1 })
    }
  }, [currentPage, dispatch])

  const handleNextBtn = useCallback(() => {
    if(currentPage !== totalPages) {
      dispatch({ type: "SET_CURRENT_PAGE", payload: currentPage + 1 })
    }
  }, [currentPage, totalPages, dispatch])

  const label = `Page ${ currentPage } / ${ totalPages }`

  return { handlePrevBtn, handleNextBtn, label }
}

export const useHandleTableRowClick = (uuid: string) => {
  const { dispatch } = useContext(EnforcementCtx)

  return () => dispatch({ type:  "SET_FORM_UUID", payload: uuid })
}

export const useHandleTableData = (violations: AppTypes.ConstructionViolationInterface[]) => { // Construction violations table data
  const { currentPage, showClosedSiteIssues, dateRangeFilter } = useContext(EnforcementCtx)

  const tableData = useMemo(() => {
    let allViolations: ViolationTableDataType[] = violations.map(violation => ({
      ...violation,
      siteUUID: violation.Site?.uuid,
      siteName: violation.Site?.name,
      primaryPermittee: violation.Site?.SiteContacts?.find(contact => contact.isPrimary)?.Contact?.company
    }))

    if(!showClosedSiteIssues) {
      allViolations = allViolations.filter(violation => !violation.closed)
    }

    if(dateRangeFilter.start && dateRangeFilter.end) {
      allViolations = allViolations.filter(violation => {
        const violationDate = new Date(violation.date)
        const startDate = new Date(dateRangeFilter.start)
        const endDate = new Date(dateRangeFilter.end)

        if(violationDate > startDate && violationDate < endDate) {
          return violation
        }
      })
    }

    const startIndex = (currentPage - 1) * 20
    const endIndex = currentPage * 20
    
    return { data: allViolations.slice(startIndex, endIndex), count: allViolations.length }
  }, [violations, currentPage, showClosedSiteIssues, dateRangeFilter])

  useSetTotalPages(tableData.count)

  return tableData.data
}

type UseScrollToFormRefProps = { formRef: React.RefObject<HTMLDivElement>, activeForm: boolean }

export const useScrollToFormRef = (props: UseScrollToFormRefProps) => {

  useEffect(() => { // Scroll to form if active
    if(props.activeForm && props.formRef.current) {
      props.formRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
    } else window.scrollTo({ top: 0, behavior: "smooth" })
  }, [props.activeForm, props.formRef])
}

export const useResetCtx = () => { // Reset EnforcementCtx on enforcement page change
  const { dispatch } = useContext(EnforcementCtx)

  useEffect(() => {
    return () => dispatch({ type: "RESET_CTX" })
  }, [dispatch])
}

export const useSetTotalPages = (count: number) => { // Set total pages to ctx
  const { dispatch, showClosedSiteIssues } = useContext(EnforcementCtx)

  useEffect(() => {
    dispatch({ type: "SET_TOTAL_PAGES", payload: Math.ceil(count / 20) })
  }, [showClosedSiteIssues, count, dispatch])
}

export const useHandleDeleteBtn = () => {
  const [state, setState] = useState<{ active: boolean }>({ active: false })
  const { formUUID, dispatch } = useContext(EnforcementCtx)

  const { enabled, token } = useEnableQuery()

  const queryClient = useQueryClient()

  const { uuid: siteUUID } = useParams<{ uuid: string }>()

  const onClick = useCallback(async () => {
    if(!state.active) {
      setState({ active: true })
      return
    } 

    if(enabled) {
      const result = await AppActions.deleteViolation(formUUID, authHeaders(token))

      if(result.success) {
        queryClient.invalidateQueries({ queryKey: ["getViolations"] })
        queryClient.invalidateQueries({ queryKey: ["getSite", siteUUID] })
        dispatch({ type: "RESET_CTX" })
        savedPopup(result.msg)
      } else errorPopup(result.msg)
    }
  }, [state.active, enabled, token, formUUID, queryClient, siteUUID])

  const label = !state.active ? "Delete Violation" : "Confirm Delete"

  return { onClick, label}
}