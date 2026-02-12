// Types
import { CalendarColors } from "./hooks"

type CalendarItemType =
  | "log"
  | "violation"
  | "follow-up"
  | "penalty"
  | "complaint"
  | "illicit"
  | "swo"

export const calendarColorMap = new Map<CalendarItemType, CalendarColors>([
  ["log", "#157EE8"],
  ["violation", "#F55D34"],
  ["follow-up", "#FFFF00"],
  ["penalty", "#DB4EFC"],
  ["complaint", "#ED5197"],
  ["illicit", "#C4EB3B"],
  ["swo", "#FFFFFF"]
])

export const calendarLegendStyles = {
  inspection: { backgroundColor: calendarColorMap.get("log")!, color: "#fff" },
  violation: { backgroundColor: calendarColorMap.get("violation")! },
  complaint: { backgroundColor: calendarColorMap.get("complaint")! },
  illicit: { backgroundColor: calendarColorMap.get("illicit")! },
  followUp: { backgroundColor: calendarColorMap.get("follow-up")! },
  penalty: { backgroundColor: calendarColorMap.get("penalty")! },
  swo: { backgroundColor: calendarColorMap.get("swo")! }
}