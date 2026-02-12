import { FormProvider } from "react-hook-form"
import { useHandleUpdateContactForm } from "./hooks"
import styles from "@/components/form-elements/Forms.module.css"

// Types
import * as AppTypes from "@/context/App/types"

// Components
import FormBtns from "@/components/form-elements/buttons/FormBtns"
import * as CreateContactForm from "../../create/CreateContactForm/components"
import * as Components from "./components"

function UpdateContactForm({ contact }: { contact: AppTypes.ContactInterface }) {
  const { methods, handleFormSubmit, onCancelBtnClick } = useHandleUpdateContactForm(contact)

  return (
    <div data-testid="update-contact-form" className={styles.container}>

      <h2 className={styles.title}>Update Contact</h2>

      <FormProvider { ...methods }>
        <form onSubmit={methods.handleSubmit(handleFormSubmit)} className={styles.body}>

          <Components.InactiveCheckbox />
          <CreateContactForm.NameInput />
          <CreateContactForm.CompanyInput />
          <CreateContactForm.PhoneAndEmailsInputs />

          <FormBtns onCancelBtnClick={onCancelBtnClick} />

          </form>
      </FormProvider>

    </div>
  )
}

export default UpdateContactForm