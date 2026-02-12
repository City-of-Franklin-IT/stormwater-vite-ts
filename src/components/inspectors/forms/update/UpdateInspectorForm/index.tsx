import { FormProvider } from "react-hook-form"
import { useHandleUpdateInspectorForm } from "./hooks"
import styles from "@/components/form-elements/Forms.module.css"

// Types
import * as AppTypes from "@/context/App/types"

// Components
import FormBtns from "@/components/form-elements/buttons/FormBtns"
import { NameInput, EmailInput } from "../../create/CreateInspectorForm/components"

function UpdateInspectorForm({ inspector }: { inspector: AppTypes.InspectorInterface }) {
  const { methods, onCancelBtnClick, handleFormSubmit } = useHandleUpdateInspectorForm(inspector)

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Update Inspector</h2>

      <FormProvider { ...methods }>
        <form onSubmit={methods.handleSubmit(handleFormSubmit)} className={styles.body}>

          <NameInput />
          <EmailInput />
          
          <FormBtns onCancelBtnClick={onCancelBtnClick} />

        </form>
      </FormProvider>

    </div>
  )
}

export default UpdateInspectorForm