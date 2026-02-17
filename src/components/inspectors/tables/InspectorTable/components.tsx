import { Link } from "react-router"
import { useHandleInspectorSiteSelection, useHandleCreateLogBtn, useHandleCreateSiteLogColumn, useHandleForm, useHandleInspectionDatesColumn } from "./hooks"
import { setSiteNameLabel } from "./utils"

// Types
import { InspectorTableData } from "./hooks"

// Components
import FormContainer from "../../../form-elements/FormContainer"
import CreateMultipleSiteLogsForm from "../../forms/create/CreateMultipleSiteLogsForm"

export const Table = ({ tableData }: { tableData: InspectorTableData[] }) => {

  return (
    <table className="table  text-neutral-content font-[play]">
      <TableHeaders />
      <TableBody tableData={tableData} />
    </table>
  )
}

export const CreateLogBtn = () => {
  const { btnProps, visible } = useHandleCreateLogBtn()

  if(!visible) return null

  return (
    <div className="mx-auto mt-2">
      <button
        type="button"
        className="btn btn-primary uppercase"
        onClick={btnProps.onClick}>
          {btnProps.label}
      </button>
    </div>
  )
}

export const Form = ({ formRef }: { formRef: React.RefObject<HTMLDivElement> }) => {
  const visible = useHandleForm()

  if(!visible) return null

  return (
    <div ref={formRef} className="w-full">
      <FormContainer>
        <CreateMultipleSiteLogsForm  />
      </FormContainer>
    </div>
  )
}

const TableHeaders = () => {
  const className = useHandleCreateSiteLogColumn()

  return (
    <thead>
      <tr className="text-warning uppercase border-b-2 border-warning">
        <th className={className}>Create Site Log</th>
        <th>Site</th>
        <th>Jan</th>
        <th>Feb</th>
        <th>Mar</th>
        <th>Apr</th>
        <th>May</th>
        <th>Jun</th>
        <th>Jul</th>
        <th>Aug</th>
        <th>Sep</th>
        <th>Oct</th>
        <th>Nov</th>
        <th>Dec</th>
      </tr>
    </thead>
  )
}

const TableBody = ({ tableData }: { tableData: InspectorTableData[] }) => {

  return (
    <>
      {tableData.map(row => {
        return (
          <TableRow
            key={`inspector-table-row-${ row.siteId }`}
            row={row} />
        )
      })}
    </>
  )
}

const TableRow = ({ row }: { row: InspectorTableData }) => {

  return (
    <tr className="border-b-1 border-neutral-content/50">
      <CreateSiteLogColumn siteId={row.siteId} />
      <SiteNameColumn row={row} />
      <InspectionDatesColumn row={row} />
    </tr>
  )
}

const SiteNameColumn = ({ row }: { row: InspectorTableData }) => {
  
  return (
    <td className="w-fit hover:text-warning">
      <Link to={`/site/${ row.uuid }`}>
        <SiteNameLabel row={row} />
      </Link>
    </td>
  )
}

const SiteNameLabel = ({ row }: { row: InspectorTableData }) => {
  const { className, label } = setSiteNameLabel(row)

  return (
    <span className={className}>{label}</span>
  )
}

const InspectionDatesColumn = ({ row }: { row: InspectorTableData }) => {
  const { statusDate, year } = useHandleInspectionDatesColumn(row)

  return (
    <>
      {Array.from({ length: 12 }).map((_, index) => {
        const monthDates = row.dates.filter(date => new Date(date).getMonth() === index)

        if(!monthDates.length && statusDate) {
          const statusAt = new Date(statusDate)
          const isOnOrAfterStatus = year > statusAt.getFullYear() || (year === statusAt.getFullYear() && index >= statusAt.getMonth())

          if(isOnOrAfterStatus) {
            const label = row.inactiveAt ? 
              "Inactive" : 
              "Incomplete"
              
            const className = row.inactiveAt ? 
              "text-neutral-content/50" : 
              "text-info/50"

            return (
              <td key={`inspection-date-col-${ row.site }-${ index }`}>
                <small className={`${ className } italic`}>{label}</small>
              </td>
            )
          }
        }

        return (
          <td key={`inspection-date-col-${ row.site }-${ index }`}>
            <div className="flex flex-col">
              {monthDates.sort((a, b) => {
                const dateA = new Date(a).getTime()
                const dateB = new Date(b).getTime()

                if(dateA > dateB) {
                  return -1
                }

                if(dateA < dateB) {
                  return 1
                }

                return 0
              }).map(x => <small key={`inspection-date-${ row.site }-${ x }`}>{x}</small>)
              }
            </div>
          </td>
        )
      })}
    </>
  )
}

const CreateSiteLogColumn = ({ siteId }: { siteId: string }) => {
  const { visible, ...inputProps } = useHandleInspectorSiteSelection(siteId)

  if(!visible) return null

  return (
    <td className="flex flex-col items-center">
      <input 
        type="checkbox" 
        className="checkbox checkbox-secondary"
        { ...inputProps } />
    </td>
  )
}