import { Select } from "@mobiscroll/react"
import { useSetSiteContactOptions, useHandlePrimaryContactSelect, useHandleContractorSelect, useHandleInspectorSelect, useHandleOtherContactSelect } from "./hooks"

// Types
import type { ContactOptionsType } from "./hooks"

// Components
import FormLabel from "@/components/form-elements/FormLabel"

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
      <div className="translate-y-2">
        <FormLabel name="siteId">
          Primary Contact:
        </FormLabel>
      </div>
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
      <div className="translate-y-2">
        <FormLabel name="siteId">
          Contractors:
        </FormLabel>
      </div>
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
      <div className="translate-y-2">
        <FormLabel name="siteId">
          Inspectors:
        </FormLabel>
      </div>
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
      <div className="translate-y-2">
        <FormLabel name="siteId">
          Other:
        </FormLabel>
      </div>
      <Select
        data={contactOptions}
        selectMultiple={true}
        filter={true}
        { ...selectProps } />
    </div>
  )
}