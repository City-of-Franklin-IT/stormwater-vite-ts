import { Link } from "react-router"
import { useHandleTableRowClick } from "../ViolationsContainer/hooks"
import { useHandleReportParams } from './hooks'

// Icons
import reportIcon from '@/assets/icons/report/report.svg'
import xlsxIcon from '@/assets/icons/xlsx/xlsx.svg'

// Types
import * as AppTypes from '@/context/App/types'

// Components
import { ShowClosedCheckbox, PageNavBtns, Status } from "../ViolationsContainer/components"

export type ComplaintsTableDataType = AppTypes.ComplaintInterface & { siteUUID?: string, siteName?: string, primaryPermitee?: string }

export const ComplaintsTable = ({ tableData }: { tableData: ComplaintsTableDataType[] }) => {

  return (
      <div className="flex flex-col font-[play] gap-6 items-center">
  
        <div className="flex justify-between items-end mb-4 w-full">
          <ShowClosedCheckbox />
          <div className="translate-y-7">
            <PageNavBtns />
          </div>
        </div>    
  
        <table className="table table-sm text-neutral-content">
          <TableHeaders />
          <TableBody tableData={tableData} />
        </table>
        
      </div>
    )
}

export const ReportBtn = () => {
  const href = useHandleReportParams()

  return (
    <a href={href} target={'_blank'} className="flex flex-col items-center gap-1">
      <img src={reportIcon} className="w-10" />
      <small className="font-[play] text-neutral-content uppercase">View Report</small>
    </a>
  )
}

export const ExportBtn = () => {
  const href = useHandleReportParams()

  return (
    <a href={`${ href }&rs:Command=Download&rs:Format=Excel`} target={'_self'} className="flex flex-col items-center gap-1">
      <img src={xlsxIcon} className="w-10" />
      <small className="font-[play] text-neutral-content uppercase">Export Data</small>
    </a>
  )
}

const TableHeaders = () => {

  return (
    <thead>
      <tr className="text-warning uppercase border-b-2 border-warning">
        <th>Date</th>
        <th>Site / Location</th>
        <th>Responsible Party / Primary Permitee</th>
        <th className="text-center">Concern</th>
        <th className="text-center">Status</th>
        <th>Inspector</th>
      </tr>
    </thead>
  )
}

const TableBody = ({ tableData }: { tableData: ComplaintsTableDataType[] }) => { // Complaints table body
  
  return (
    <>
      {tableData.map(complaint => {
        if(complaint) return (
          <TableRow
            key={`complaints-table-row-${ complaint.uuid }`}
            complaint={complaint} />
        )
      })}
    </>
  )
}

const TableRow = ({ complaint }: { complaint: ComplaintsTableDataType }) => {
  const handleTableRowClick = useHandleTableRowClick(complaint.uuid)
  
  return (
    <tr 
      title={complaint.details} 
      onClick={handleTableRowClick}
      className="border-b-1 border-neutral-content/50">
        <td className="whitespace-nowrap">{complaint.date}</td>
        <td className="whitespace-nowrap">
          <LocationTableData complaint={complaint} />
        </td>
        <td>{complaint?.primaryPermitee}</td>
        <td>{complaint.concern}</td>
        <Status closed={complaint.closed} />
        <th>{complaint.Inspector?.name}</th>
    </tr>
  )
}

const LocationTableData = ({ complaint }: { complaint: ComplaintsTableDataType }) => {
  if(complaint.siteId) {
    return <Link to={`/site/${ complaint?.siteUUID }`} className="hover:text-warning">{complaint?.siteName}</Link>
  }

  return (
    <span>{complaint.locationDescription}</span>
  )
}