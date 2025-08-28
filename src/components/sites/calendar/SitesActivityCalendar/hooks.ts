import { useMemo } from "react"
import { useState, useCallback, useContext } from 'react'
import { useLocation, useNavigate } from 'react-router'
import EnforcementCtx from '@/components/enforcement/context'
import { useReturnUserRoles } from '@/helpers/hooks'

// Types
import { MbscEventcalendarOptions, MbscCalendarEvent, MbscEventClickEvent } from "@mobiscroll/react"
import * as AppTypes from '@/context/App/types'
import { CalendarDatesInterface, CalendarDataInterface } from "./types"

export const useFormatCalendarData = (sites: AppTypes.SiteInterface[]) => {
  const calendarData = useMemo(() => {
    const dates: CalendarDatesInterface = {
      logsArray: [],
      violationsArray: [],
      complaintsArray: [],
      followUpsArray: [],
      penaltyArray: [],
      illicitArray: [],
      swoArray: []
    }

    const addCalendarObj = (calendarEvent: CalendarDataInterface, typeArray: CalendarDataInterface[]) => { // Add calendar event to dates obj
      typeArray.push(calendarEvent)
    }

    sites.map(site => {
      site.Logs?.forEach(log => { // Site logs
        addCalendarObj({ start: new Date(log.inspectionDate), end: new Date(log.inspectionDate), allDay: true, title: `Inspection - ${ site.name }`, color: '#157EE8', uuid: site.uuid, formUUID: log.uuid, form: 'updateSiteLog' }, dates.logsArray)
      })
  
      site.ConstructionViolations?.forEach(violation => { // Construction violations
        addCalendarObj({ start: new Date(violation.date), end: new Date(violation.date), allDay: true, title: `Construction Violation - ${ site.name }`, color: '#F55D34', uuid: site.uuid, formUUID: violation.uuid, form: 'updateViolation' }, dates.violationsArray)
  
        violation.FollowUpDates?.forEach(followUp => { // Construction violation follow ups
          addCalendarObj({ start: new Date(followUp.followUpDate), end: new Date(followUp.followUpDate), allDay: true, title: `Follow Up - ${ site.name }`, color: '#FFFF00', uuid: site.uuid, formUUID: violation.uuid, form: "updateViolation" }, dates.followUpsArray)
        })
  
        if(violation.penaltyDate) { // Construction violation penalties
          addCalendarObj({ start: new Date(violation.penaltyDate), end: new Date(violation.penaltyDate), allDay: true, title: `Penalty - ${ site.name }`, color: '#DB4EFC', uuid: site.uuid, formUUID: violation.uuid, form: "updateViolation" }, dates.penaltyArray)
  
          if(violation.penaltyDueDate) { // Construction violation penalty due dates
            addCalendarObj({ start: new Date(violation.penaltyDueDate), end: new Date(violation.penaltyDueDate), allDay: true, title: `Penalty Due - ${ site.name }`, color: '#DB4EFC', uuid: site.uuid, formUUID: violation.uuid, form: "updateViolation" }, dates.penaltyArray)
          }
  
          if(violation.paymentReceived) { // Construction violation penalty received dates
            addCalendarObj({ start: new Date(violation.paymentReceived), end: new Date(violation.paymentReceived),allDay: true, title: `Penalty Payment Received - ${ site.name }`, color: '#DB4EFC', uuid: site.uuid, formUUID: violation.uuid, form: "updateViolation" }, dates.penaltyArray)
          }
        }

        if(violation.swoDate) { // SWO
          addCalendarObj({ start: new Date(violation.swoDate), end: new Date(violation.swoDate), allDay: true, title: `SWO Issued - ${ site.name }`, color: '#FFFFFF', uuid: site.uuid, formUUID: violation.uuid, form: 'updateViolation' }, dates.swoArray)

          if(violation.swoLiftedDate) {
            addCalendarObj({ start: new Date(violation.swoLiftedDate), end: new Date(violation.swoLiftedDate), allDay: true, title: `SWO Lifted - ${ site.name }`, color: '#FFFFFF', uuid: site.uuid, formUUID: violation.uuid, form: 'updateViolation' }, dates.swoArray)
          }
        }
      })

      site.Complaints?.forEach(complaint => { // Complaints
        addCalendarObj({ start: new Date(complaint.date), end: new Date(complaint.date), allDay: true, title: `Complaint - ${ site.name }`, color: '#ED5197', uuid: site.uuid, formUUID: complaint.uuid, form: "updateComplaint" }, dates.complaintsArray)
  
        complaint.FollowUpDates?.forEach(followUp => { // Complaint follow ups
          addCalendarObj({ start: new Date(followUp.followUpDate), end: new Date(followUp.followUpDate), allDay: true, title: `Follow Up - ${ site.name }`, color: '#FFFF00', uuid: site.uuid, formUUID: complaint.uuid, form: "updateComplaint" }, dates.followUpsArray)
        })
      })

      site.IllicitDischarges?.forEach(illicit => { // Illicit discharges
        addCalendarObj({ start: new Date(illicit.date), end: new Date(illicit.date), allDay: true, title: `Illicit Discharge - ${ site.name }`, color: '#C4EB3B', uuid: site.uuid, formUUID: illicit.uuid, form: 'updateIllicitDischarge'}, dates.illicitArray)

        illicit.FollowUpDates?.forEach(followUp => { // Complaint follow ups
          addCalendarObj({ start: new Date(followUp.followUpDate), end: new Date(followUp.followUpDate), allDay: true, title: `Follow Up - ${ site.name }`, color: '#FFFF00', uuid: site.uuid, formUUID: illicit.uuid, form: "updateIllicitDischarge" }, dates.followUpsArray)
        })
      })
    })

    return dates
  }, [sites])

  return [ 
    ...calendarData.logsArray, 
    ...calendarData.violationsArray, 
    ...calendarData.followUpsArray, 
    ...calendarData.penaltyArray, 
    ...calendarData.complaintsArray, 
    ...calendarData.illicitArray,
    ...calendarData.swoArray
  ]
}

export const useCalendarProps = (type: 'week' | 'month', calendarData: CalendarDataInterface[]) => { // Set calendar props
  const { dispatch } = useContext(EnforcementCtx)

  const onEventClick = useHandleEventClick()

  const calendarProps = useMemo(() => {
    const props: MbscEventcalendarOptions = {
      theme: 'material',
      themeVariant: "dark",
      clickToCreate: false,
      dragToCreate: false,
      dragToMove: false,
      dragToResize: false,
      eventDelete: false,
      view: {
        calendar: { type }
      },
      data: calendarData,
    }

    props.onEventClick = (event) => onEventClick(event)
    props.onCellDoubleClick = (event) => {
      dispatch({ type: 'SET_ACTIVE_FORM', payload: 'createSiteLog' })
      dispatch({ type: 'SET_FORM_DATE', payload: event.date.toISOString().split('T')[0] }) 
    }

    return props
  }, [calendarData, type, dispatch, onEventClick])

  return calendarProps
}

export const useHandleCalendarTypeBtnClick = (): { type: 'week' | 'month', onClick: React.MouseEventHandler<HTMLButtonElement>, label: 'Show Month' | 'Show Week' } => {
  const [state, setState] = useState<{ type: 'week' | 'month' }>({ type: 'week' })

  const cb = useCallback(() => {
    const newType = state.type === 'week' ? 'month' : 'week'
    
    setState({ type: newType })
  }, [state.type])

  const label = state.type === 'week' ? 'Show Month' : 'Show Week'

  return { type: state.type, onClick: cb, label }
}

const useHandleEventClick = () => {
  const { dispatch } = useContext(EnforcementCtx)

  const pathname = useLocation().pathname

  const navigate = useNavigate()

  const roles = useReturnUserRoles()

  return useCallback((e: MbscCalendarEvent | MbscEventClickEvent) => {
    if (!roles?.includes('task.write')) {
      return null
    }

    if(pathname === '/sites' || pathname.includes('inspectors')) { // Sites page
      const calendarEvent = e as MbscCalendarEvent
      navigate(`/site/${calendarEvent.event.uuid}`)
    } else { // Site page
      const clickEvent = e as MbscEventClickEvent
      const event = clickEvent.event as CalendarDataInterface

      dispatch({ type: 'SET_FORM_UUID', payload: event.formUUID })
      dispatch({ type: 'SET_ACTIVE_FORM', payload: event.form })
    }
  }, [roles, pathname, navigate, dispatch])
}