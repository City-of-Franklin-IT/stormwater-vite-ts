import { Select } from "@mobiscroll/react"
import { useSetSiteContactOptions, useHandlePrimaryContactSelect, useHandleContractorSelect, useHandleInspectorSelect, useHandleOtherContactSelect } from './hooks'
import styles from '@/components/form-elements/Forms.module.css'

// Types
import { ContactOptionsType } from "./hooks"

export const SiteContactsInputs = () => { // Site contacts inputs
  const contactOptions = useSetSiteContactOptions()

  if(!contactOptions.length) return null

  return (
    <div className="flex w-full flex-wrap">
      <PrimaryContactSelect contactOptions={contactOptions} />
      <ContractorsSelect contactOptions={contactOptions} />
      <InspectorsSelect contactOptions={contactOptions} />
      <OtherContactsSelect contactOptions={contactOptions} />
    </div>
  )
}

const PrimaryContactSelect = ({ contactOptions }: { contactOptions: ContactOptionsType[] }) => { // Primary contact select
  const selectProps = useHandlePrimaryContactSelect()

  return (
    <div className="flex-1 flex flex-col text-center">
      <label htmlFor="primaryContact" className={styles.checkboxLabel}>Primary Contact:</label>
      <Select
        data={contactOptions}
        filter={true}
        { ...selectProps } />
    </div>
  )
}

const ContractorsSelect = ({ contactOptions }: { contactOptions: ContactOptionsType[] }) => { // Contractors select
  const selectProps = useHandleContractorSelect()

  return (
    <div className="flex-1 flex flex-col text-center">
      <label htmlFor="contractors" className={styles.checkboxLabel}>Contractors:</label>
      <Select
        data={contactOptions}
        selectMultiple={true}
        filter={true}
        { ...selectProps } />
    </div>
  )
}

const InspectorsSelect = ({ contactOptions }: { contactOptions: ContactOptionsType[] }) => { // Site inspectors select
  const selectProps = useHandleInspectorSelect()

  return (
    <div className="flex-1 flex flex-col text-center">
      <label htmlFor="inspectors" className={styles.checkboxLabel}>Inspectors:</label>
      <Select
        data={contactOptions}
        selectMultiple={true}
        filter={true}
        { ...selectProps } />
    </div>
  )
}

const OtherContactsSelect = ({ contactOptions }: { contactOptions: ContactOptionsType[] }) => { // Other site contacts select
  const selectProps = useHandleOtherContactSelect()

  return (
    <div className="flex-1 flex flex-col text-center">
      <label htmlFor="otherContacts" className={styles.checkboxLabel}>Other:</label>
      <Select
        data={contactOptions}
        selectMultiple={true}
        filter={true}
        { ...selectProps } />
    </div>
  )
}