import { FormProvider } from "react-hook-form"
import { useHandleCreateIllicitDischargeForm } from "./hooks"
import styles from "@/components/form-elements/Forms.module.css"

// Types
import * as AppTypes from "@/context/App/types"

// Components
import FormBtns from "@/components/form-elements/buttons/FormBtns"
import * as CreateViolationForm from "../CreateViolationForm/components"
import * as Components from "./components"

function CreateIllicitDischargeForm({ site }: { site: AppTypes.SiteInterface | undefined }) {
  const { methods, handleFormSubmit, onCancelBtnClick } = useHandleCreateIllicitDischargeForm(site)

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Create Illicit Discharge</h2>
      
      <FormProvider { ...methods }>
        <form onSubmit={methods.handleSubmit(handleFormSubmit)} className={styles.body}>

          <Components.Map visible={!site} />
          <Components.DateAndInspectorInputs siteId={site?.siteId} />
          <Components.LocationAndResponsiblePartyInputs />
          <Components.DetailsInput />
          <Components.StreamWatershedSelect />
          <Components.EnforcementInputs />
          <Components.PenaltyInputs />

          <CreateViolationForm.FollowUpInputs />

          <FormBtns onCancelBtnClick={onCancelBtnClick} />

        </form>
      </FormProvider>
    </div>
  )
}

export default CreateIllicitDischargeForm