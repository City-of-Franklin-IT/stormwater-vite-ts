import { FormProvider } from "react-hook-form"
import { useHandleUpdateComplaintForm } from "./hooks"
import styles from '@/components/form-elements/Forms.module.css'

// Types
import * as AppTypes from '@/context/App/types'

// Components
import FormBtns from "@/components/form-elements/buttons/FormBtns"
import { FollowUpInputs } from "../../create/CreateViolationForm/components"
import { Map, DateAndInspectorInputs, LocationAndResponsiblePartyInputs, DetailsInput, ConcernInputs, CommentsInput, ComplaintantInputs } from '../../create/CreateComplaintForm/components'
import { CheckboxInputs } from "../UpdateViolationForm/components"

function UpdateComplaintForm({ complaint }: { complaint: AppTypes.ComplaintInterface }) {
  const { methods, handleFormSubmit, onCancelBtnClick } = useHandleUpdateComplaintForm(complaint)

  return (
    <div data-testid="update-site-complaint-form" className={styles.container}>
      <h2 className={styles.title}>Update Complaint</h2>

        <FormProvider { ...methods }>
          <form onSubmit={methods.handleSubmit(handleFormSubmit)} className={styles.body}>

            <Map visible={!complaint.siteId} />
            <DateAndInspectorInputs siteId={complaint.siteId} />
            <LocationAndResponsiblePartyInputs />
            <DetailsInput />
            <ConcernInputs />
            <CommentsInput />
            <ComplaintantInputs />
            <FollowUpInputs />
            <CheckboxInputs />

            <FormBtns onCancelBtnClick={onCancelBtnClick} />

          </form>
        </FormProvider>

    </div>
  )
}

export default UpdateComplaintForm