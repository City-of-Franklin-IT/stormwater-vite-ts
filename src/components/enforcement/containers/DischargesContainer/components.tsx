import { Link } from "react-router" 
import { useHandleTableRowClick } from "../ViolationsContainer/hooks"

// Types
import * as AppTypes from '@/context/App/types'

// Components
import { ShowClosedCheckbox, PageNavBtns, CivilPenalty, Status } from "../ViolationsContainer/components"

export type IllicitDischargesTableDataType = AppTypes.IllicitDischargeInterface & { siteUUID?: string, siteName?: string, primaryPermitee?: string }

export const IllicitDischargesTable = ({ tableData }: { tableData: IllicitDischargesTableDataType[] }) => {

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

const TableHeaders = () => {

  return (
    <thead>
      <tr className="text-warning uppercase border-b-2 border-warning">
        <th>Date</th>
        <th>Site / Location</th>
        <th>Responsible Party / Primary Permitee</th>
        <th className="text-center">Civil Penalty</th>
        <th className="text-center">Status</th>
        <th>Inspector</th>
      </tr>
    </thead>
  )
}

const TableBody = ({ tableData }: { tableData: IllicitDischargesTableDataType[] }) => { // Illicit discharges table body
  
  return (
    <>
      {tableData.map(illicit => {
        if(illicit) return (
          <TableRow
            key={`illcit-discharges-table-row-${ illicit.uuid }`}
            illicit={illicit} />
        )
      })}
    </>
  )
}

const TableRow = ({ illicit }: { illicit: IllicitDischargesTableDataType }) => {
  const handleTableRowClick = useHandleTableRowClick(illicit.uuid)

  return (
    <tr 
      title={illicit.details} 
      onClick={handleTableRowClick}
      className="border-b-1 border-neutral-content/50">
        <td className="whitespace-nowrap">{illicit.date}</td>
        <td className="whitespace-nowrap">
          <LocationTableData illicit={illicit} />
        </td>
        <td>{illicit.primaryPermitee}</td>
        <CivilPenalty 
          civilPenalty={{ date: illicit.penaltyDate, paymentReceived: illicit.paymentReceived }} />
        <Status closed={illicit.closed} />
        <td>{illicit.Inspector?.name}</td>
    </tr>
  )
}

const LocationTableData = ({ illicit }: { illicit: IllicitDischargesTableDataType }) => {
  if(illicit.siteId) {
    return <Link to={`/site/${ illicit?.siteUUID }`} className="hover:text-warning">{illicit?.siteName}</Link>
  }

  return (
    <span>{illicit.locationDescription}</span>
  )
}