import { Link } from "react-router"
import { useReturnUserRoles } from "@/helpers/hooks"
import { useHandleInspectorSiteSelection, useHandleCreateLogBtn } from './hooks'

// Types
import { InspectorTableData } from "./hooks"

// Components
import FormContainer from "../../../form-elements/FormContainer"
import CreateMultipleSiteLogsForm from "../../forms/create/CreateMultipleSiteLogsForm"
import { useContext } from "react"
import InspectorTableCtx from "./context"

export const Table = ({ tableData }: { tableData: InspectorTableData[] }) => {

  return (
    <table className="table table-sm text-neutral-content font-[play]">
      <TableHeaders />
      <TableBody tableData={tableData} />
    </table>
  )
}

export const CreateLogBtn = () => { // Create site log button
  const { label, onClick } = useHandleCreateLogBtn()

  if(!label) return null

  return (
    <div className="mx-auto mt-2">
      <button 
        type="button"
        className="btn btn-primary uppercase"
        onClick={onClick}>
          {label}
    </button>
  )
    </div>
  )
}

export const Form = ({ formRef }: { formRef: React.RefObject<HTMLDivElement> }) => { // Site log form
  const { formOpen } = useContext(InspectorTableCtx)

  if(!formOpen) return null

  return (
    <div ref={formRef} className="w-full">
      <FormContainer>
        <CreateMultipleSiteLogsForm  />
      </FormContainer>
    </div>
  )
}

const TableHeaders = () => {
  const roles = useReturnUserRoles()

  const showBtn = roles.includes('task.write')

  return (
    <thead>
      <tr className="text-warning uppercase border-b-2 border-warning">
        <th className={`${ !showBtn ? 'hidden' : undefined }`}>Create Site Log</th>
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

const TableBody = ({ tableData }: { tableData: InspectorTableData[] }) => { // Inspector table body

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
      <Link to={`/site/${ row.uuid }`}>{row.site}</Link>
    </td>
  )
}

const InspectionDatesColumn = ({ row }: { row: InspectorTableData }) => {

  return (
    <>
      {Array.from({ length: 12 }).map((_, index) => {
        return (
          <td>
            <div className="flex flex-col">
              {row.dates.filter(date => new Date(date).getMonth() === index).sort((a, b) => {
                const dateA = new Date(a).getTime()
                const dateB = new Date(b).getTime()

                if(dateA > dateB) {
                  return -1
                }

                if(dateB < dateA) {
                  return 1
                }

                return 0
              }).map(x => <small>{x}</small>)
              }
            </div>
          </td>
        )
      })}
    </>
  )
}

const CreateSiteLogColumn = ({ siteId }: { siteId: string }) => {
  const { handleOnChange, selected } = useHandleInspectorSiteSelection(siteId)

  const roles = useReturnUserRoles()

  if(!roles.includes('task.write')) return null

  return (
    <td className="flex flex-col items-center">
      <input 
        type="checkbox" 
        className="checkbox checkbox-secondary"
        checked={selected}
        onChange={handleOnChange} />
    </td>
  )
}