import { FormProvider } from "react-hook-form"
import { useHandleUpdateIllicitDischargeForm } from "./hooks"
import styles from "@/components/form-elements/Forms.module.css"

// Types
import type * as AppTypes from "@/context/App/types"

// Components
import FormBtns from "@/components/form-elements/buttons/FormBtns"
import * as CreateIllicitDischargeForm from "../../create/CreateIllicitDischargeForm/components"
import * as CreateViolationForm from "../../create/CreateViolationForm/components"
import * as UpdateViolationForm from "../UpdateViolationForm/components"

function UpdateIllicitDischargeForm({ illicitDischarge }: { illicitDischarge: AppTypes.IllicitDischargeInterface }) {
  const { methods, handleFormSubmit, onCancelBtnClick } = useHandleUpdateIllicitDischargeForm(illicitDischarge)

  return (
    <div data-testid="update-site-illicit-discharge-form" className={styles.container}>
      <h2 className={styles.title}>Update Illicit Discharge</h2>

      <FormProvider { ...methods }>
        <form onSubmit={methods.handleSubmit(handleFormSubmit)} className={styles.body}>
          <CreateIllicitDischargeForm.Map visible={!illicitDischarge.siteId} />
          <CreateIllicitDischargeForm.DateAndInspectorInputs siteId={illicitDischarge.siteId} />
          <CreateIllicitDischargeForm.LocationAndResponsiblePartyInputs />
          <CreateIllicitDischargeForm.DetailsInput />
          <CreateIllicitDischargeForm.StreamWatershedSelect />
          <CreateIllicitDischargeForm.EnforcementInputs />
          <CreateIllicitDischargeForm.PenaltyInputs />
          <CreateViolationForm.FollowUpInputs />
          <UpdateViolationForm.CheckboxInputs />
          <FormBtns onCancelBtnClick={onCancelBtnClick} />
        </form>
      </FormProvider>
    </div>
  )
}

export default UpdateIllicitDischargeForm