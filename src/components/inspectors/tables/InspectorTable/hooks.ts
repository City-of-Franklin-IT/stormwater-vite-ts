import { useContext, useMemo, useEffect, useRef } from "react"
import { useAuth } from "@/context/Auth"
import InspectorCtx from "../../context"
import InspectorTableCtx from "./context"

// Types
import * as AppTypes from "@/context/App/types"

export interface InspectorTableData {
  site: string
  dates: string[]
  uuid: string
  siteId: string
  inactiveAt: string | null
  incompleteAt: string | null
}

/**
* Handles scroll to ref functionality when formOpen is true; returns refs for table and form
**/
export const useScrollToFormRef = () => {
  const { formOpen } = useContext(InspectorTableCtx)

  const tableRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)

  useEffect(() => { // Scroll to form if active
    if(formOpen && formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
    } else tableRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [formOpen, formRef, tableRef])

  return { tableRef, formRef }
}

/**
* Returns inspector visibility boolean and input props for create site log column
**/
export const useHandleInspectorSiteSelection = (siteId: string) => {
  const { selection, dispatch } = useContext(InspectorTableCtx)

  const { canUpdate } = useAuth()

  const checked = !!selection.find(item => item === siteId)

  const onChange = () => {
    if(!checked) {
      dispatch({ type: "ADD_TO_SELECTION", payload: siteId })
    } else dispatch({ type: "REMOVE_FROM_SELECTION", payload: siteId })
  }

  const visible = canUpdate

  return { checked, onChange, visible }
}

/**
* Returns create log button props and visibility based on site selection state
**/
export const useHandleCreateLogBtn = () => {
  const { selection, dispatch } = useContext(InspectorTableCtx)

  if(!selection.length) return {
    visible: false,
    btnProps: {
      onClick: () => null,
      label: ""
    }
  }

  const label = selection.length === 1 ? 
    "Create Site Log" : 
    "Create Site Logs"

  const onClick = () => {
    dispatch({ type: "TOGGLE_FORM_OPEN" })
  }

  const btnProps = {
    onClick,
    label
  }

  return { btnProps, visible: true }
}

/**
* Returns memoized inspector table data with inspection dates filtered by selected year
**/
export const useSetInspectorTableData = (sites: AppTypes.SiteInterface[]) => {
  const { year } = useContext(InspectorTableCtx)
  
  const data = useMemo(() => {
    const array: InspectorTableData[] = sites.map(site => {
      const inspections = site.Logs?.filter(log => new Date(log.inspectionDate).getFullYear() === year) || [] // Get logs for selected year by site

      return {
        site: site.name,
        dates: inspections.map(inspection => inspection.inspectionDate),
        uuid: site.uuid,
        siteId: site.siteId,
        inactiveAt: site.InactiveSite?.createdAt || null,
        incompleteAt: site.IncompleteSite?.createdAt || null
      }
    })

    return array
  }, [sites, year])

  return data
}

/**
* Returns the status date and selected year for rendering inspection date columns
**/
export const useHandleInspectionDatesColumn = (row: InspectorTableData) => {
  const { year } = useContext(InspectorTableCtx)

  const statusDate = row.inactiveAt || row.incompleteAt

  return { statusDate, year }
}

/**
* Returns className for create site log column; hides column if user does not have write permissions
**/
export const useHandleCreateSiteLogColumn = () => {
  const { canUpdate } = useAuth()
  const showBtn = canUpdate
  const className = !showBtn ?
    "hidden" :
    ""

  return className
}

/**
* Returns whether the create site logs form is open
**/
export const useHandleForm = () => {
  const { formOpen } = useContext(InspectorTableCtx)
  
  const visible = formOpen

  return visible
}

/**
* Returns props for ActiveSitesBtn
**/
export const useHandleActiveSitesBtn = () => {
  const { showActiveSitesOnly, dispatch } = useContext(InspectorCtx)

  const onClick = () => {
    dispatch({ type: 'TOGGLE_SHOW_ACTIVE_SITES_ONLY' })
  }

  return { onClick, showActiveSitesOnly }
}