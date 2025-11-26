import { useHandleStats } from './hooks'

// Types
import { SiteIssuesType } from './hooks'

export const Stats = ({ issues }: { issues: SiteIssuesType[] }) => {
  const tickets = useHandleStats(issues)

  return (
    <div className="absolute flex flex-col font-[play] gap-2 w-fit right-0 translate-x-2/3 translate-y-2 whitespace-nowrap">
      <Stat className="badge badge-error text-error-content w-full shadow-xl">{tickets.total} Total</Stat>
      <Stat className="badge badge-warning w-full shadow-xl">{tickets.open} Open</Stat>
      <Stat className="badge badge-success w-full shadow-xl">{tickets.closed} Closed</Stat>
    </div>
  )
}

export type StatProps = { className: string, children: React.ReactNode }

export const Stat = (props: StatProps) => {

  return (
    <span className={props.className}>{props.children}</span>
  )
}