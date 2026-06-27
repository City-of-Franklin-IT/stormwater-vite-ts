import { FormProvider } from "react-hook-form"
import { useHandleUpdateComplaintForm } from "./hooks"
import styles from "@/components/form-elements/Forms.module.css"

// Types
import type * as AppTypes from "@/context/App/types"

// Components
import FormBtns from "@/components/form-elements/buttons/FormBtns"
import * as CreateViolationForm from "../../create/CreateViolationForm/components"
import * as CreateComplaintForm from "../../create/CreateComplaintForm/components"
import * as UpdateViolationForm from "../UpdateViolationForm/components"

function UpdateComplaintForm({ complaint }: { complaint: AppTypes.ComplaintInterface }) {
  const { methods, handleFormSubmit, onCancelBtnClick } = useHandleUpdateComplaintForm(complaint)

  return (
    <div data-testid="update-site-complaint-form" className={styles.container}>
      <h2 className={styles.title}>Update Complaint</h2>

        <FormProvider { ...methods }>
          <form onSubmit={methods.handleSubmit(handleFormSubmit)} className={styles.body}>
            <CreateComplaintForm.Map visible={!complaint.siteId} />
            <CreateComplaintForm.DateAndInspectorInputs siteId={complaint.siteId} />
            <CreateComplaintForm.LocationAndResponsiblePartyInputs />
            <CreateComplaintForm.DetailsInput />
            <CreateComplaintForm.ConcernInputs />
            <CreateComplaintForm.CommentsInput />
            <CreateComplaintForm.ComplaintantInputs />
            <CreateViolationForm.FollowUpInputs />
            <UpdateViolationForm.CheckboxInputs />
            <FormBtns onCancelBtnClick={onCancelBtnClick} />
          </form>
        </FormProvider>
    </div>
  )
}

export default UpdateComplaintForm