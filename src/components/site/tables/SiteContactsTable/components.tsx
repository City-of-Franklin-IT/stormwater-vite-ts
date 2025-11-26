import { formatPhone } from "@/helpers/utils"
import { setSiteContactsTableData, setAllSiteContacts } from "./utils"

// Types
import * as AppTypes from '@/context/App/types'

type SiteContactRoleType = 
  | "Primary"
  | "Contractor"
  | "Inspector"
  | "Other"

export type SiteContactType = { name: string, company: string | null, role: SiteContactRoleType | undefined, phone: string | null, email: string | null, order: number }

export const Table = ({ siteContacts }: { siteContacts: AppTypes.SiteContactInterface[] }) => {
  const tableData = setSiteContactsTableData(siteContacts)

  return (
    <table className="table table-sm font-[play] text-neutral-content mr-auto">
      <TableHeaders />
      <TableBody tableData={tableData} />
    </table>
  )
}

export const EmailContacts = ({ siteContacts }: { siteContacts: AppTypes.SiteContactInterface[] }) => {
  const href = setAllSiteContacts(siteContacts)

  return (
    <a href={href} className="text-neutral-content font-[play] uppercase hover:text-warning">Email All Site Contacts</a>
  )
}

const TableHeaders = () => {

  return (
    <thead>
      <tr className="text-warning uppercase border-b-2 border-warning">
        <th>Contact</th>
        <th>Role</th>
      </tr>
    </thead>
  )
}

const TableBody = ({ tableData }: { tableData: SiteContactType[] }) => { // Site contacts table body

  return (
    <tbody>
      {tableData.map(siteContact=> {
        return (
          <TableRow 
            key={`site-contact-${ siteContact.name }`}
            siteContact={siteContact} />
        )
      })}
    </tbody>
  )
}

const TableRow = ({ siteContact }: { siteContact: SiteContactType }) => {
  
  return (
    <tr className="border-b-1 border-neutral-content/50">
      <ContactTableData siteContact={siteContact} />
      <td>{siteContact.role}</td>
    </tr>
  )
}

const ContactTableData = ({ siteContact }: { siteContact: SiteContactType }) => { // Contact table data

  return (
    <td className="flex flex-col whitespace-nowrap">
      <div className="font-extrabold whitespace-nowrap">{siteContact.name}</div>
      <div>{siteContact.company}</div>
      <Phone phone={siteContact.phone} />
      <Email email={siteContact.email} />
    </td>
  )
}

const Phone = ({ phone }: { phone: string | null }) => {
  if(!phone) return null

  const formatted = formatPhone(phone)

  return (
    <a href={`tel:${ formatted }`} className="hover:text-warning">tel: {formatted}</a>
  )
}

const Email = ({ email }: { email: string | null }) => {
  if(!email) return null

  return (
    <a href={`mail:${ email }`} className="hover:text-warning">email: {email}</a>
  )
}