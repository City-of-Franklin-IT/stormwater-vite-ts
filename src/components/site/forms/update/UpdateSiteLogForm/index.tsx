import { FormProvider } from "react-hook-form"
import styles from '@/components/form-elements/Forms.module.css'
import { useHandleUpdateSiteLogForm } from "./hooks"

// Types
import * as AppTypes from '@/context/App/types'

// Components
import FormBtns from "@/components/form-elements/buttons/FormBtns"
import { DateInput } from '../../../../enforcement/forms/create/CreateSiteLogForm/components'

function UpdateSiteLogForm({ siteLog }: { siteLog: AppTypes.SiteLogInterface }) {
  const { methods, onCancelBtnClick, handleFormSubmit } = useHandleUpdateSiteLogForm(siteLog)

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Update Site Log</h2>

        <FormProvider { ...methods }>
          <form onSubmit={methods.handleSubmit(handleFormSubmit)} className={styles.body}>

            <DateInput />
            <FormBtns onCancelBtnClick={onCancelBtnClick} />

          </form>
        </FormProvider>
        
    </div>
  )
}

export default UpdateSiteLogForm