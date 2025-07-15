import React, { useContext, useMemo, useEffect } from "react"
import InspectorTableCtx from "./context"

// Types
import * as AppTypes from '@/context/App/types'

export interface InspectorTableData {
  site: string
  dates: string[]
  uuid: string
  siteId: string
}

export const useScrollToFormRef = (formRef: React.RefObject<HTMLDivElement>, tableRef: React.RefObject<HTMLDivElement>): void => {
  const { formOpen } = useContext(InspectorTableCtx)

  useEffect(() => { // Scroll to form if active
    if(formOpen && formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else tableRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [formOpen, formRef, tableRef])
}

export const useHandleInspectorSiteSelection = (siteId: string) => {
  const { selection, dispatch } = useContext(InspectorTableCtx)

  const selected = !!selection.find(item => item === siteId)

  const handleOnChange = () => {
    if(!selected) {
      dispatch({ type: 'ADD_TO_SELECTION', payload: siteId })
    } else dispatch({ type: 'REMOVE_FROM_SELECTION', payload: siteId })
  }

  return { selected, handleOnChange }
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