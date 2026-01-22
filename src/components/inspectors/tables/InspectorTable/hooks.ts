import { useContext, useMemo, useEffect, useRef } from "react"
import { useReturnUserRoles } from "@/helpers/hooks"
import InspectorTableCtx from "./context"

// Types
import * as AppTypes from '@/context/App/types'

export interface InspectorTableData {
  site: string
  dates: string[]
  uuid: string
  siteId: string
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
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else tableRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [formOpen, formRef, tableRef])

  return { tableRef, formRef }
}

/**
* Returns inspector visibility boolean and input props for create site log column
**/
export const useHandleInspectorSiteSelection = (siteId: string) => {
  const { selection, dispatch } = useContext(InspectorTableCtx)

  const roles = useReturnUserRoles()

  const checked = !!selection.find(item => item === siteId)

  const onChange = () => {
    if(!checked) {
      dispatch({ type: 'ADD_TO_SELECTION', payload: siteId })
    } else dispatch({ type: 'REMOVE_FROM_SELECTION', payload: siteId })
  }

  const visible = roles.includes('task.write')

  return { checked, onChange, visible }
}

export const useHandleCreateLogBtn = () => {
  const { selection, dispatch } = useContext(InspectorTableCtx)

  if(!selection.length) return {}

  const label = selection.length === 1 ? 'Create Site Log' : 'Create Site Logs'

  return { label, onClick: () => dispatch({ type: 'TOGGLE_FORM_OPEN' }) }
}

export const useSetInspectorTableData = (sites: AppTypes.SiteInterface[]) => {
  const { year } = useContext(InspectorTableCtx)
  
  const data = useMemo(() => {
    const array: InspectorTableData[] = sites.map(site => {
      const inspections = site.Logs?.filter(log => new Date(log.inspectionDate).getFullYear() === year) || [] // Get logs for selected year by site

      return {
        site: site.name,
        dates: inspections.map(inspection => inspection.inspectionDate),
        uuid: site.uuid,
        siteId: site.siteId
      }
    })

    return array
  }, [sites, year])

  return data
}

/**
* Returns className for create site log column; hides column if user does not have write permissions
**/
export const useHandleCreateSiteLogColumn = () => {
  const roles = useReturnUserRoles()
  const showBtn = roles.includes('task.write')
  const className = !showBtn ?
    'hidden' :
    ''

  return className
}