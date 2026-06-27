import { formatPhone } from "@/helpers/utils"
import starIcon from "@/assets/icons/star/star.svg"
import { setSiteContactsTableData, setAllSiteContacts } from "./utils"

// Types
import type * as AppTypes from "@/context/App/types"

type SiteContactRoleType = 
  | "Primary"
  | "Contractor"
  | "Inspector"
  | "Other"

export type SiteContactType = { 
  name: string
  company: string | null
  role: SiteContactRoleType | undefined
  phone: string | null
  email: string | null
  order: number 
}

export const Table = ({ siteContacts }: { siteContacts: AppTypes.SiteContactInterface[] }) => {
  const tableData = setSiteContactsTableData(siteContacts)

  return (
    <table className="table  font-[play] text-neutral-content mr-auto">
      <TableHeaders />
      <TableBody tableData={tableData} />
    </table>
  )
}

export const EmailContacts = ({ siteContacts }: { siteContacts: AppTypes.SiteContactInterface[] }) => {
  const href = setAllSiteContacts(siteContacts)

  return (
    <a 
      href={href} 
      className="text-neutral-content font-[play] uppercase hover:text-warning">
        Email All Site Contacts
    </a>
  )
}

const TableHeaders = () => (
  <thead>
    <tr className="text-warning uppercase border-b-2 border-warning">
      <th>Contact</th>
      <th>Role</th>
    </tr>
  </thead>
)

const TableBody = ({ tableData }: { tableData: SiteContactType[] }) => (
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

const TableRow = ({ siteContact }: { siteContact: SiteContactType }) => (
  <tr className="border-b-1 border-neutral-content/50">
    <ContactTableData siteContact={siteContact} />
    <td>
      <div className="flex gap-2">
        <span>{siteContact.role}</span>
        <PrimaryIcon visible={siteContact.role === "Primary"} />
      </div>
    </td>
  </tr>
)

const ContactTableData = ({ siteContact }: { siteContact: SiteContactType }) => (
  <td className="flex flex-col whitespace-nowrap">
    <div className="flex gap-2">
      <span className="font-extrabold whitespace-nowrap">{siteContact.name}</span>
      <PrimaryIcon visible={siteContact.role === "Primary"} />
    </div>
    <span>{siteContact.company}</span>
    <Phone phone={siteContact.phone} />
    <Email email={siteContact.email} />
  </td>
)

const PrimaryIcon = ({ visible }: { visible: boolean }) => {
  if(!visible) return null

  return (
    <img src={starIcon} className="w-4" />
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