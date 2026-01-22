import { calendarLegendStyles } from "./utils"
import { useHandleCalendarNoteVisibility } from "./hooks"

type CalendarTypeBtnProps = { onClick: React.MouseEventHandler<HTMLButtonElement>, children: React.ReactNode }

export const CalendarTypeBtn = (props: CalendarTypeBtnProps) => {

  return (
    <button
      type="button"
      onClick={props.onClick}
      className="text-neutral-content font-[play] uppercase p-2 py-1 bg-transparent hover:bg-neutral hover:cursor-pointer">
        {props.children}
    </button>
  )
}

export const ActivityCalendarLegend = () => {

  return (
    <div className="flex gap-6 font-[play] text-neutral text-sm font-bold uppercase p-6 bg-neutral flex-wrap justify-center m-auto w-fit">
      <ActivityCalendarLegendItem style={calendarLegendStyles.inspection}>Inspection</ActivityCalendarLegendItem>
      <ActivityCalendarLegendItem style={calendarLegendStyles.violation}>Violation</ActivityCalendarLegendItem>
      <ActivityCalendarLegendItem style={calendarLegendStyles.complaint}>Complaint</ActivityCalendarLegendItem>
      <ActivityCalendarLegendItem style={calendarLegendStyles.illicit}>Illicit Discharge</ActivityCalendarLegendItem>
      <ActivityCalendarLegendItem style={calendarLegendStyles.followUp}>Follow Up</ActivityCalendarLegendItem>
      <ActivityCalendarLegendItem style={calendarLegendStyles.penalty}>Penalty</ActivityCalendarLegendItem>
      <ActivityCalendarLegendItem style={calendarLegendStyles.swo}>SWO</ActivityCalendarLegendItem>
    </div>
  )
}

export const CalendarNote = () => {
  const visible = useHandleCalendarNoteVisibility()

  if(!visible) return null

  return (
    <span className="italic">Double click date to create new entry..</span>
  )
}

type ActivityCalendarLegendItemProps = { style: React.CSSProperties, children: React.ReactNode }

const ActivityCalendarLegendItem = (props: ActivityCalendarLegendItemProps) => {

  return (
    <div style={props.style} className="p-2 py-[2px] text-center w-[120px] rounded whitespace-nowrap min-w-fit">{props.children}</div>
  )
}