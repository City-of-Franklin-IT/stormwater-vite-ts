import { useOnRowClick } from './hooks'
import { typeIconMap } from './utils'

// Types
import { FormType } from '../../context'
import { IssueTableDataType } from './types'

export const Table = ({ tableData }: { tableData: IssueTableDataType[] }) => {

  return (
    <table className="table table-xs text-neutral-content p-10 w-full">
      <TableHeaders />
      <TableBody tableData={tableData} />
    </table>
  )
}

const TableHeaders = () => {

  return (
    <thead>
      <tr className="text-warning uppercase border-b-2 border-warning">
        <th>Date</th>
        <th>Type</th>
        <th className="text-center">Civil Penalty</th>
        <th className="text-center">SWO</th>
        <th className="text-center">Status</th>
      </tr>
    </thead>
  )
}

const TableBody = ({ tableData }: { tableData: IssueTableDataType[] }) => { // Site issues table body

  return (
    <tbody>
      {tableData.map(issue => {
        return (
          <TableRow
            key={`site-issue-table-row-${ issue.uuid }`} 
            issue={issue} />
        ) 
      })}
    </tbody>
  )
}


const TableRow = ({ issue }: { issue: IssueTableDataType }) => {
  const onRowClick = useOnRowClick()

  return (
    <tr 
      data-form={issue.form} 
      data-uuid={issue.uuid} 
      title={issue.details} 
      onClick={(e) => onRowClick(e)}
      className="border-b-1 border-neutral-content/50 hover:bg-neutral hover:cursor-pointer">
        <td>{issue.date}</td>
        <TypeIcon type={issue.form} />
        <CivilPenalty civilPenalty={issue.civilPenalty} />
        <SWO swo={issue.swo} />
        <Status closed={issue.closed} />
    </tr>
  )
}

const TypeIcon = ({ type }: { type: FormType }) => { // Type icon
  const icon = typeIconMap.get(type)!

  return (
    <td title={icon.title}><img src={icon.src} className="p-1 w-8"></img></td>
  )
}

const CivilPenalty = ({ civilPenalty }: { civilPenalty: { issued: boolean | null, received: boolean | null } | undefined }) => { // Civil penalty td
  if(!civilPenalty?.issued) return <td></td>

  if(civilPenalty.received) return (
    <td className="text-success font-bold uppercase text-center">Paid</td>
  )

  return (
    <td className="text-error font-bold uppercase text-center">Issued</td>
  )
}

const SWO = ({ swo }: { swo: { issued: boolean | null, lifted: boolean | null } }) => { // SWO 
  if(!swo.issued) return <td></td>

  if(swo.lifted) return (
    <td className="text-success font-bold uppercase text-center">Lifted</td>
  )

  return (
    <td className="text-error font-bold uppercase text-center">Issued</td>
  )
}

const Status = ({ closed }: { closed: boolean | null }) => { // Issue status
  if(closed) return (
    <td className="text-success font-bold uppercase text-center">Closed</td>
  )

  return (
    <td className="text-error font-bold uppercase text-center">Open</td>
  )
}