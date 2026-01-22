// Types
import * as AppTypes from '@/context/App/types'
import { SiteContactType } from './components'

export const setSiteContactsTableData = (siteContacts: AppTypes.SiteContactInterface[]) => {
  const siteContactsArray: SiteContactType[] = []

  siteContacts.forEach(contact => {
    if(contact.Contact) {
      const obj: SiteContactType = {
        name: contact.Contact.name,
        company: contact.Contact.company,
        role: undefined,
        phone: contact.Contact.phone,
        email: contact.Contact.email,
        order: 0
      }

      setRole(contact, obj)
      siteContactsArray.push(obj)
    }
  })

  return siteContactsArray.sort((a, b) => a.order - b.order)
}

export const setAllSiteContacts = (siteContacts: AppTypes.SiteContactInterface[]) => { // Return array with all site contact emails
  const emailArray: string[] = siteContacts.map(contact => {
    return contact.Contact?.email as string
  })

  const href = `mailto:${ emailArray.join(';') }`

  return href
}

const setRole = (siteContact: AppTypes.SiteContactInterface, obj: SiteContactType) => {
  if(siteContact.isPrimary) { // Primary
    obj.role = 'Primary'
    obj.order = 0

    return obj
  }

  if(siteContact.isContractor) { // Contactor
    obj.role = 'Contractor'
    obj.order = 1

    return obj
  }

  if(siteContact.isInspector) { // Inspector
    obj.role = 'Inspector'
    obj.order = 2

    return obj
  }

  obj.role = 'Other' // Other
  obj.order = 3

  return obj
}