import React, { useContext, useRef } from "react"
import EnforcementCtx from "../../context"
import { Link } from "react-router"
import { useReturnUserRoles } from "@/helpers/hooks"
import { useHandleNavBtns, useHandleTableRowClick, useScrollToFormRef } from './hooks'

// Types
import * as AppTypes from '@/context/App/types'

// Components
import FormContainer from "../../../form-elements/FormContainer"
import CreateLink from "../../../layout/nav/buttons/CreateLink"
import PrevPageBtn from "@/components/layout/nav/buttons/PrevPageBtn"
import NextPageBtn from "@/components/layout/nav/buttons/NextPageBtn"

export type FormProps = { children: React.ReactElement }

export const UpdateForm = (props: FormProps) => { // Update form
  const { formUUID } = useContext(EnforcementCtx)

  const formRef = useRef<HTMLDivElement>(null)

  useScrollToFormRef({ formRef, activeForm: !!formUUID })
  
  if(!formUUID) return null

  return (
    <div ref={formRef}>
      <FormContainer>
        {props.children}
      </FormContainer>
    </div>
  )
}

type CreateBtnProps = { href: string, children: React.ReactNode }

export const CreateBtn = (props: CreateBtnProps) => {
  const roles = useReturnUserRoles()

  if(!roles.includes('task.write')) return null // Viewers

  return (
    <div className="absolute top-8 left-1/2 -translate-x-1/2">
      <CreateLink href={props.href}>{props.children}</CreateLink>
    </div>
  )
}

export type ViolationTableDataType = AppTypes.ConstructionViolationInterface & { siteUUID: string | undefined, siteName: string | undefined , primaryPermittee: string | undefined | null }

export const EnforcementTableHeaders = ({ children }: { children: React.ReactNode }) => {

  return (
    <thead>
      <tr className="text-warning uppercase border-b-2 border-warning">
        {children}
      </tr>
    </thead>
  )
}

export const EnforcementTable = ({ children }: { children: React.ReactNode }) => {

  return (
    <div className="flex flex-col font-[play] gap-6 items-center">
      <div className="flex justify-between items-end mb-4 w-full">
        <ShowClosedCheckbox />
        <div className="translate-y-7">
          <PageNavBtns />
        </div>
      </div>
      <div className="w-full overflow-x-auto">
        <table className="table w-full text-neutral-content">
          {children}
        </table>
      </div>
    </div>
  )
}

export const ViolationsTable = ({ tableData }: { tableData: ViolationTableDataType[] }) => {

  return (
    <EnforcementTable>
      <EnforcementTableHeaders>
        <ViolationsTableHeaders />
      </EnforcementTableHeaders>
      <ViolationsTableBody tableData={tableData} />
    </EnforcementTable>
  )
}

export const ShowClosedCheckbox = () => { // Show closed site issues checkbox
  const { showClosedSiteIssues, dispatch } = useContext(EnforcementCtx)

  return (
    <div className="flex gap-2 text-neutral-content w-fit">
      <label className="uppercase">Show Closed:</label>
      <input 
        type="checkbox"
        className="checkbox checkbox-secondary"
        checked={showClosedSiteIssues}
        onChange={() => dispatch({ type: 'TOGGLE_SHOW_CLOSED_SITE_ISSUES' })} />
    </div>
  )
}

export const PageNavBtns = () => { // Page nav buttons
  const { currentPage, totalPages } = useContext(EnforcementCtx)
  
  const { handlePrevBtn, handleNextBtn, label } = useHandleNavBtns()

  return (
    <div className="flex flex-col gap-1 items-center">
      <div className="flex gap-4 ml-auto">
        <PrevPageBtn 
          onClick={handlePrevBtn}
          disabled={currentPage === 1} />
        <NextPageBtn 
          onClick={handleNextBtn}
          disabled={!totalPages || currentPage === totalPages} />
      </div>
      <small className="text-neutral-content font-[play] uppercase">{label}</small>
    </div>
  )
}

export const CivilPenalty = ({ civilPenalty }: { civilPenalty: { date: string | null, paymentReceived: string | null } }) => {
  if(!civilPenalty.date) {
    return <td className="text-neutral-content text-center">-</td> // No penalty
  } 

  if(civilPenalty.paymentReceived) { // Paid
    return <td className="text-success font-bold uppercase text-center">Paid</td>
  }

  return ( // Issued
    <td className="text-error font-bold uppercase text-center">Issued</td>
  )
}

export const SWO = ({ swo }: { swo: { date: string | null, lifted: string | null } }) => {
  if(!swo.date) {
    return <td className="text-neutral-content text-center">-</td> // No SWO date
  }

  if(swo.lifted) {
    return <td className="text-success font-bold uppercase text-center">Lifted</td>
  } // Lifted
  

  return ( // Issued
    <td className="text-error font-bold uppercase text-center">Issued</td>
  )
}

export const Status = ({ closed }: { closed: boolean | null }) => { // Site issue status
  if(closed) { // Closed issue
    return <td className="text-success font-bold uppercase text-center">Closed</td>
  }

  return <td className="text-error font-bold uppercase text-center">Open</td>
}

const ViolationsTableBody = ({ tableData }: { tableData: ViolationTableDataType[] }) => (
  <tbody>
    {tableData.map(violation => {
      if(violation) return (
        <ViolationsTableRow key={`violation-${ violation.uuid }`} violation={violation} />
      )
    })}
  </tbody>
)

const ViolationsTableHeaders = () => {

  return (
    <>
      <th>Date</th>
      <th>Site</th>
      <th>Primary Permitee</th>
      <th className="text-center">Civil Penalty</th>
      <th className="text-center">SWO</th>
      <th className="text-center">Status</th>
      <th>Inspector</th>
    </>
  )
}

const ViolationsTableRow = ({ violation }: { violation: ViolationTableDataType }) => {
  const handleTableRowClick = useHandleTableRowClick(violation.uuid)
  
  return (
    <tr
      title={violation.details} 
      onClick={handleTableRowClick}
      className="border-b-1 border-neutral-content/50">
        <td className="whitespace-nowrap">{violation.date}</td>
        <td className="whitespace-nowrap hover:text-warning">
          <Link to={`/site/${ violation.siteUUID }`}>{violation.siteName}</Link>
        </td>
        <td>{violation.primaryPermittee}</td>
        <CivilPenalty civilPenalty={{ date: violation.penaltyDate, paymentReceived: violation.paymentReceived }} />
        <SWO swo={{ date: violation.swoDate, lifted: violation.swoLiftedDate }} />
        <Status closed={violation.closed} />
        <td>{violation.Site?.Inspector?.name}</td>
    </tr>
  )
}