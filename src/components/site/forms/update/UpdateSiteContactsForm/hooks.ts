import { useCreateSiteFormContext } from "../../create/CreateSiteForm/hooks"
import { useGetContacts } from "@/pages/Contacts/hooks"

// Types
import { MbscSelectChangeEvent } from "@mobiscroll/react"
import * as AppTypes from "@/context/App/types"

export type ContactOptionsType = { value: string, text: string }

/**
* Returns site contact options for site contact select inputs
**/
export const useSetSiteContactOptions = () => {
  const result = useGetContacts()

  if(!result.isSuccess) return []

  const contacts = result.data.data.filter(contact => !contact.inactive)

  const options: ContactOptionsType[] = contacts.map(contact => ({ value: contact.contactId, text: contact.name }))

  return [ { value: "", text: "" }, ...options ]
}

/**
* Returns primary contact select props
**/
export const useHandlePrimaryContactSelect = () => {
  const { getValues, setValue, watch } = useCreateSiteFormContext()

  const onChange = (e: MbscSelectChangeEvent) => {
    const value = e.value
    const siteId = getValues("siteId")
    const contacts = getValues("SiteContacts") || []
    const nonPrimaryContacts = contacts.filter(contact => !contact.isPrimary)

    const primaryContact: AppTypes.SiteContactCreateInterface = { 
      isPrimary: true, 
      isContractor: false, 
      isInspector: false, 
      siteId: siteId || "", 
      contactId: value
    }

    const allContacts = [ ...nonPrimaryContacts, primaryContact ]

    setValue("SiteContacts", allContacts, { shouldDirty: true, shouldValidate: true })
  }

  const contacts = watch("SiteContacts") || []
  const primaryContact = contacts.find(contact => contact.isPrimary)

  const selectProps = {
    value: primaryContact?.contactId,
    onChange
  }

  return selectProps
}

/**
* Returns contract select props
**/
export const useHandleContractorSelect = () => {
  const { getValues, setValue, watch } = useCreateSiteFormContext()

  const onChange = (e: MbscSelectChangeEvent) => {
    const values = e.value as string[]
    const contacts = getValues("SiteContacts") || []
    const siteId = getValues("siteId")
    const nonContractors = contacts?.filter(contact => !contact.isContractor) || []

    const newContractors: AppTypes.SiteContactCreateInterface[] = values.map(value => ({
      isPrimary: false,
      isContractor: true,
      isInspector: false,
      contactId: value,
      siteId: siteId || ""
    }))

    const allContacts = [ ...nonContractors, ...newContractors ]

    setValue("SiteContacts", allContacts, { shouldDirty: true, shouldValidate: true })
  }

  const contacts = watch("SiteContacts") || []
  const contractors = contacts.filter(contact => contact.isContractor).map(contact => contact.contactId)

  const selectProps = {
    value: contractors,
    onChange
  }

  return selectProps
}

/**
* Returns inspector select props
**/
export const useHandleInspectorSelect = () => {
  const { getValues, setValue, watch } = useCreateSiteFormContext()

  const onChange = (e: MbscSelectChangeEvent) => {
    const values = e.value as string[]
    const siteId = getValues("siteId")
    const contacts = getValues("SiteContacts") || []
    const nonInspectors = contacts.filter(contact => !contact.isInspector)

    const inspectors: AppTypes.SiteContactCreateInterface[] = values.map(value => ({  
      isPrimary: false, 
      isContractor: false, 
      isInspector: true, 
      siteId: siteId || "", 
      contactId: value 
    }))

    const allContacts = [ ...nonInspectors, ...inspectors ]

    setValue("SiteContacts", allContacts, { shouldDirty: true, shouldValidate: true })
  }

  const contacts = watch("SiteContacts") || []
  const inspectors = contacts.filter(contact => contact.isInspector).map(contact => contact.contactId)

  const selectProps = {
    value: inspectors,
    onChange
  }

  return selectProps
}

/**
* Returns other contact select props
**/
export const useHandleOtherContactSelect = () => {
  const { getValues, setValue, watch } = useCreateSiteFormContext()

  const onChange = (e: MbscSelectChangeEvent) => {
    const values = e.value as string[]
    const siteId = getValues("siteId")
    const contacts = getValues("SiteContacts") || []
    const nonOtherContacts = contacts.filter(contact => contact.isPrimary || contact.isContractor || contact.isInspector )

    const otherContacts: AppTypes.SiteContactCreateInterface[] = values.map(value => ({ 
      isPrimary: false, 
      isContractor: false, 
      isInspector: false, 
      siteId: siteId || "", 
      contactId: value 
    }))

    const allContacts = [ ...nonOtherContacts, ...otherContacts ]

    setValue("SiteContacts", allContacts, { shouldDirty: true, shouldValidate: true })
  }

  const contacts = watch("SiteContacts") || []
  const otherContacts = contacts.filter(contact => !contact.isPrimary && !contact.isContractor && !contact.isInspector).map(contact => contact.contactId)

  const selectProps = {
    value: otherContacts,
    onChange
  }

  return selectProps
}