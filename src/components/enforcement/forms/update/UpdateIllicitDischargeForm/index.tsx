import { FormProvider } from "react-hook-form"
import { useHandleUpdateIllicitDischargeForm } from './hooks'
import styles from '@/components/form-elements/Forms.module.css'

// Types
import * as AppTypes from '@/context/App/types'

// Components
import FormBtns from "@/components/form-elements/buttons/FormBtns"
import { Map, DateAndInspectorInputs, LocationAndResponsiblePartyInputs, DetailsInput, StreamWatershedSelect, EnforcementInputs, PenaltyInputs } from '../../create/CreateIllicitDischargeForm/components'
import { FollowUpInputs } from "../../create/CreateViolationForm/components"
import { CheckboxInputs } from "../UpdateViolationForm/components"

function UpdateIllicitDischargeForm({ illicitDischarge }: { illicitDischarge: AppTypes.IllicitDischargeInterface }) {
  const { methods, handleFormSubmit, onCancelBtnClick } = useHandleUpdateIllicitDischargeForm(illicitDischarge)

  return (
    <div data-testid="update-site-illicit-discharge-form" className={styles.container}>
      <h2 className={styles.title}>Update Illicit Discharge</h2>

      <FormProvider { ...methods }>
        <form onSubmit={methods.handleSubmit(handleFormSubmit)} className={styles.body}>

          <Map visible={!illicitDischarge.siteId} />
          <DateAndInspectorInputs siteId={illicitDischarge.siteId} />
          <LocationAndResponsiblePartyInputs />
          <DetailsInput />
          <StreamWatershedSelect />
          <EnforcementInputs />
          <PenaltyInputs />
          <FollowUpInputs />
          <CheckboxInputs />

          <FormBtns onCancelBtnClick={onCancelBtnClick} />

        </form>
      </FormProvider>
    </div>
  )
}

export default UpdateIllicitDischargeForm