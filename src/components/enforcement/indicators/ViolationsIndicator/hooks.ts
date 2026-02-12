import { useContext } from "react"
import EnforcementCtx from "../../context"

// Types
import * as AppTypes from "@/context/App/types"

export type SiteIssuesType = AppTypes.ConstructionViolationInterface | AppTypes.IllicitDischargeInterface | AppTypes.ComplaintInterface | undefined

export const useHandleStats = (issues: SiteIssuesType[]) => {
  const { dateRangeFilter } = useContext(EnforcementCtx)

  const tickets = {
    total: issues.length,
    open: issues.filter(violation => !violation?.closed).length,
    closed: issues.filter(violation => violation?.closed).length
  }

  if(dateRangeFilter.start && dateRangeFilter.end) { // Date filter applied
    const start = new Date(dateRangeFilter.start)
    const end = new Date(dateRangeFilter.end)

    const filtered = issues?.filter(issue => new Date(issue?.date as string) >= start && new Date(issue?.date as string) <= end)

    tickets.total = filtered.length
    tickets.open = issues.filter(violation => !violation?.closed).length,
    tickets.closed = issues.filter(violation => violation?.closed).length
  }

  return tickets
}