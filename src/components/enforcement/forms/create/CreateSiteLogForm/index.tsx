import { FormProvider } from "react-hook-form"
import { useHandleCreateSiteLogForm } from "./hooks"
import styles from "@/components/form-elements/Forms.module.css"

// Types
import * as AppTypes from "@/context/App/types"

// Components
import FormBtns from "@/components/form-elements/buttons/FormBtns"
import * as Components from "./components"

function CreateSiteLogForm({ site }: { site: AppTypes.SiteInterface }) {
  const { methods, handleFormSubmit, onCancelBtnClick } = useHandleCreateSiteLogForm(site)

  return (
    <div className="flex flex-col items-center w-full">
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

export default CreateSiteLogForm