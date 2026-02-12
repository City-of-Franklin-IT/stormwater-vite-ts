import { Link } from "react-router" 
import { useHandleTableRowClick } from "../ViolationsContainer/hooks"

// Types
import * as AppTypes from "@/context/App/types"

// Components
import { EnforcementTableHeaders, EnforcementTable, CivilPenalty, Status } from "../ViolationsContainer/components"

export type IllicitDischargesTableDataType = AppTypes.IllicitDischargeInterface & { siteUUID?: string, siteName?: string, primaryPermitee?: string }

export const IllicitDischargesTable = ({ tableData }: { tableData: IllicitDischargesTableDataType[] }) => {

  return (
    <EnforcementTable>
      <EnforcementTableHeaders>
        <DischargesTableHeaders />
      </EnforcementTableHeaders>
      <DischargesTableBody tableData={tableData} />
    </EnforcementTable>
  )
}

const DischargesTableHeaders = () => {

  return (
    <>
      <th>Date</th>
      <th>Site / Location</th>
      <th>Responsible Party / Primary Permitee</th>
      <th className="text-center">Civil Penalty</th>
      <th className="text-center">Status</th>
      <th>Inspector</th>
    </>
  )
}

const DischargesTableBody = ({ tableData }: { tableData: IllicitDischargesTableDataType[] }) => (
  <tbody>
    {tableData.map(illicit => {
      if(illicit) return (
        <DischargesTableRow key={`discharge-${ illicit.uuid }`} illicit={illicit} />
      )
    })}
  </tbody>
)

const DischargesTableRow = ({ illicit }: { illicit: IllicitDischargesTableDataType }) => {
  const onClick = useHandleTableRowClick(illicit.uuid)

  return (
    <tr 
      title={illicit.details} 
      onClick={onClick}
      className="border-b-1 border-neutral-content/50">
        <td className="whitespace-nowrap">{illicit.date}</td>
        <td className="whitespace-nowrap">
          <LocationTableData illicit={illicit} />
        </td>
        <td>{illicit.primaryPermitee}</td>
        <CivilPenalty civilPenalty={{ date: illicit.penaltyDate, paymentReceived: illicit.paymentReceived }} />
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