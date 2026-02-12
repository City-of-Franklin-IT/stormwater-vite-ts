import { FormProvider } from "react-hook-form"
import { useHandleUpdateViolationForm } from "./hooks"
import styles from "@/components/form-elements/Forms.module.css"

// Types
import * as AppTypes from "@/context/App/types"

// Components
import FormBtns from "@/components/form-elements/buttons/FormBtns"
import * as CreateViolationForm from "@/components/enforcement/forms/create/CreateViolationForm/components"
import * as Components from "./components"

function UpdateViolationForm({ violation }: { violation: AppTypes.ConstructionViolationInterface }) {
  const { methods, handleFormSubmit, onCancelBtnClick } = useHandleUpdateViolationForm(violation)

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Update Construction Violation</h2>
      
      <FormProvider { ...methods }>
        <form onSubmit={methods.handleSubmit(handleFormSubmit)} className={styles.body}>

          <CreateViolationForm.DateInput />
          <CreateViolationForm.DetailsInput />
          <CreateViolationForm.EnforcementInputs />
          <CreateViolationForm.PenaltyInputs />
          <CreateViolationForm.FollowUpInputs />
          <Components.CheckboxInputs />

          <FormBtns onCancelBtnClick={onCancelBtnClick} />

        </form>
      </FormProvider>
    </div>
  )
}

export default UpdateViolationForm