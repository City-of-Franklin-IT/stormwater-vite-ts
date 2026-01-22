import { FormProvider } from "react-hook-form"
import { useHandleCreateContactForm } from './hooks'
import styles from '@/components/form-elements/Forms.module.css'

// Components
import FormBtns from "@/components/form-elements/buttons/FormBtns"
import * as Components from './components'

function CreateContactForm() {
  const { methods, handleFormSubmit, onCancelBtnClick } = useHandleCreateContactForm()

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Create Contact</h2>

      <FormProvider { ...methods }>
        <form onSubmit={methods.handleSubmit(handleFormSubmit)} className={styles.body}>

          <Components.NameInput />
          <Components.CompanyInput />
          <Components.PhoneAndEmailsInputs />

          <FormBtns onCancelBtnClick={onCancelBtnClick} />

        </form>
      </FormProvider>

    </div>
  )
}

export default CreateContactForm