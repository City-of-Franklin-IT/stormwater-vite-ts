import { useMemo, useState, useCallback, useContext } from "react"
import { useLocation, useNavigate } from "react-router"
import EnforcementCtx from "@/components/enforcement/context"
import { useAuth } from "@/context/Auth"
import { calendarColorMap } from "./utils"

// Types
import { MbscEventcalendarOptions, MbscCalendarEvent, MbscEventClickEvent } from "@mobiscroll/react"
import * as AppTypes from "@/context/App/types"
import { FormType } from "@/components/site/context"

export interface CalendarDatesInterface {
  logsArray: CalendarDataInterface[]
  violationsArray: CalendarDataInterface[]
  complaintsArray: CalendarDataInterface[]
  followUpsArray: CalendarDataInterface[]
  penaltyArray: CalendarDataInterface[]
  illicitArray: CalendarDataInterface[]
  swoArray: CalendarDataInterface[]
}

export type CalendarColors =
  | "#157EE8" // logs
  | "#F55D34" // violations
  | "#ED5197" // complaints
  | "#FFFF00" // followUp
  | "#DB4EFC" // penalty
  | "#FFFFFF" // swo
  | "#C4EB3B" // illicit discharge

export interface CalendarDataInterface extends MbscCalendarEvent {
  allDay: true
  color: CalendarColors
  uuid: string
  formUUID: string
  form?: FormType
}

/**
* Returns sites activity data formatted for calendar
**/
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
        const inspectionDate = new Date(log.inspectionDate)

        addCalendarObj({ 
          start: inspectionDate, 
          end: inspectionDate, 
          allDay: true, 
          title: `Inspection - ${ site.name }`, 
          color: calendarColorMap.get("log")!, 
          uuid: site.uuid, 
          formUUID: log.uuid, 
          form: "updateSiteLog" }, 
          dates.logsArray)
      })
  
      site.ConstructionViolations?.forEach(violation => { // Construction violations
        const violationDate = new Date(violation.date)

        addCalendarObj({
          start: violationDate,
          end: violationDate,
          allDay: true,
          title: `Construction Violation - ${ site.name }`,
          color: calendarColorMap.get("violation")!,
          uuid: site.uuid,
          formUUID: violation.uuid,
          form: "updateViolation" },
          dates.violationsArray)

        violation.FollowUpDates?.forEach(followUp => { // Construction violation follow ups
          const followUpDate = new Date(followUp.followUpDate)

          addCalendarObj({
            start: followUpDate,
            end: followUpDate,
            allDay: true,
            title: `Follow Up - ${ site.name }`,
            color: calendarColorMap.get("follow-up")!,
            uuid: site.uuid,
            formUUID: violation.uuid,
            form: "updateViolation" },
            dates.followUpsArray)
        })

        if(violation.penaltyDate) { // Construction violation penalties
          const penaltyDate = new Date(violation.penaltyDate)

          addCalendarObj({
            start: penaltyDate,
            end: penaltyDate,
            allDay: true,
            title: `Penalty - ${ site.name }`,
            color: calendarColorMap.get("penalty")!,
            uuid: site.uuid,
            formUUID: violation.uuid,
            form: "updateViolation" },
            dates.penaltyArray)

          if(violation.penaltyDueDate) { // Construction violation penalty due dates
            const penaltyDueDate = new Date(violation.penaltyDueDate)

            addCalendarObj({
              start: penaltyDueDate,
              end: penaltyDueDate,
              allDay: true,
              title: `Penalty Due - ${ site.name }`,
              color: calendarColorMap.get("penalty")!,
              uuid: site.uuid,
              formUUID: violation.uuid,
              form: "updateViolation" },
              dates.penaltyArray)
          }

          if(violation.paymentReceived) { // Construction violation penalty received dates
            const paymentReceivedDate = new Date(violation.paymentReceived)

            addCalendarObj({
              start: paymentReceivedDate,
              end: paymentReceivedDate,
              allDay: true,
              title: `Penalty Payment Received - ${ site.name }`,
              color: calendarColorMap.get("penalty")!,
              uuid: site.uuid,
              formUUID: violation.uuid,
              form: "updateViolation" },
              dates.penaltyArray)
          }
        }

        if(violation.swoDate) { // SWO
          const swoDate = new Date(violation.swoDate)

          addCalendarObj({
            start: swoDate,
            end: swoDate,
            allDay: true,
            title: `SWO Issued - ${ site.name }`,
            color: calendarColorMap.get("swo")!,
            uuid: site.uuid,
            formUUID: violation.uuid,
            form: "updateViolation" },
            dates.swoArray)

          if(violation.swoLiftedDate) {
            const swoLiftedDate = new Date(violation.swoLiftedDate)

            addCalendarObj({
              start: swoLiftedDate,
              end: swoLiftedDate,
              allDay: true,
              title: `SWO Lifted - ${ site.name }`,
              color: calendarColorMap.get("swo")!,
              uuid: site.uuid,
              formUUID: violation.uuid,
              form: "updateViolation" },
              dates.swoArray)
          }
        }
      })

      site.Complaints?.forEach(complaint => { // Complaints
        const complaintDate = new Date(complaint.date)

        addCalendarObj({
          start: complaintDate,
          end: complaintDate,
          allDay: true,
          title: `Complaint - ${ site.name }`,
          color: calendarColorMap.get("complaint")!,
          uuid: site.uuid,
          formUUID: complaint.uuid,
          form: "updateComplaint" },
          dates.complaintsArray)

        complaint.FollowUpDates?.forEach(followUp => { // Complaint follow ups
          const followUpDate = new Date(followUp.followUpDate)

          addCalendarObj({
            start: followUpDate,
            end: followUpDate,
            allDay: true,
            title: `Follow Up - ${ site.name }`,
            color: calendarColorMap.get("follow-up")!,
            uuid: site.uuid,
            formUUID: complaint.uuid,
            form: "updateComplaint" },
            dates.followUpsArray)
        })
      })

      site.IllicitDischarges?.forEach(illicit => { // Illicit discharges
        const illicitDate = new Date(illicit.date)

        addCalendarObj({
          start: illicitDate,
          end: illicitDate,
          allDay: true,
          title: `Illicit Discharge - ${ site.name }`,
          color: calendarColorMap.get("illicit")!,
          uuid: site.uuid,
          formUUID: illicit.uuid,
          form: "updateIllicitDischarge" },
          dates.illicitArray)

        illicit.FollowUpDates?.forEach(followUp => { // Illicit discharge follow ups
          const followUpDate = new Date(followUp.followUpDate)

          addCalendarObj({
            start: followUpDate,
            end: followUpDate,
            allDay: true,
            title: `Follow Up - ${ site.name }`,
            color: calendarColorMap.get("follow-up")!,
            uuid: site.uuid,
            formUUID: illicit.uuid,
            form: "updateIllicitDischarge" },
            dates.followUpsArray)
        })
      })
    })

    return dates
  }, [sites])

  const allCalendarItems = [ 
    ...calendarData.logsArray, 
    ...calendarData.violationsArray, 
    ...calendarData.followUpsArray, 
    ...calendarData.penaltyArray, 
    ...calendarData.complaintsArray, 
    ...calendarData.illicitArray,
    ...calendarData.swoArray
  ]

  return allCalendarItems
}

/**
* Returns calendar props
**/
export const useCalendarProps = (type: "week" | "month", calendarData: CalendarDataInterface[]) => { // Set calendar props
  const { dispatch } = useContext(EnforcementCtx)

  const onEventClick = useHandleEventClick()

  const calendarProps = useMemo(() => {
    const props: MbscEventcalendarOptions = {
      theme: "material",
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
      dispatch({ type: "SET_ACTIVE_FORM", payload: "createSiteLog" })
      dispatch({ type: "SET_FORM_DATE", payload: event.date.toISOString().split("T")[0] }) 
    }

    return props
  }, [calendarData, type, dispatch, onEventClick])

  return calendarProps
}

/**
* Returns calendar type (week | month) and button onClick handler
**/
export const useHandleCalendarTypeBtnClick = (): { type: "week" | "month", onClick: React.MouseEventHandler<HTMLButtonElement>, label: "Show Month" | "Show Week" } => {
  const [state, setState] = useState<{ type: "week" | "month" }>({ type: "week" })

  const cb = useCallback(() => {
    const newType = state.type === "week" ? "month" : "week"
    
    setState({ type: newType })
  }, [state.type])

  const label = state.type === "week" ? "Show Month" : "Show Week"

  return { type: state.type, onClick: cb, label }
}

/**
* Returns calendar event onClick handler; sets for uuid and activeForm in context
**/
const useHandleEventClick = () => {
  const { dispatch } = useContext(EnforcementCtx)

  const { pathname } = useLocation()
  const navigate = useNavigate()

  const { canUpdate } = useAuth()

  return useCallback((e: MbscCalendarEvent | MbscEventClickEvent) => {
    if (!canUpdate) {
      return null
    }

    if(pathname === "/sites" || pathname.includes("inspectors")) { // Sites page
      const calendarEvent = e as MbscCalendarEvent
      navigate(`/site/${ calendarEvent.event.uuid }`)
    } else { // Site page
      const clickEvent = e as MbscEventClickEvent
      const event = clickEvent.event as CalendarDataInterface

      dispatch({ type: "SET_FORM_UUID", payload: event.formUUID })
      dispatch({ type: "SET_ACTIVE_FORM", payload: event.form })
    }
  }, [canUpdate, pathname, navigate, dispatch])
}

/**
* Returns whether the calendar double-click note should be visible on site pages
**/
export const useHandleCalendarNoteVisibility = () => {
  const { pathname } = useLocation()

  const visible = pathname.includes("/site/")

  return visible
}