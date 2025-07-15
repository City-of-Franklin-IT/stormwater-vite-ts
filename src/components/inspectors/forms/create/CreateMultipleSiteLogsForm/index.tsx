import { FormProvider } from "react-hook-form"
import styles from '@/components/form-elements/Forms.module.css'
import { useCreateMultipleSiteLogsForm, useHandleFormSubmit, useOnCancelBtnClick } from "./hooks"

// Components
import FormBtns from "@/components/form-elements/buttons/FormBtns"
import * as Components from './components'

function CreateMultipleSiteLogsForm() {
  const methods = useCreateMultipleSiteLogsForm()

  const handleFormSubmit = useHandleFormSubmit()

  const onCancelBtnClick = useOnCancelBtnClick()

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Create Site Log</h2>

        <FormProvider { ...methods }>
          <form onSubmit={methods.handleSubmit(handleFormSubmit)} className={styles.body}>

            <Components.DateInput />
            <FormBtns onCancelBtnClick={onCancelBtnClick} />

          </form>
        </FormProvider>

    </div>
  )
}

export default CreateMultipleSiteLogsForm