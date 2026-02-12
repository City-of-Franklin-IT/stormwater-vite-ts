import { FormProvider } from "react-hook-form"
import { useHandleUpdateSiteForm } from "./hooks"
import styles from "@/components/form-elements/Forms.module.css"

// Types
import * as AppTypes from "@/context/App/types"

// Components
import FormBtns from "@/components/form-elements/buttons/FormBtns"
import UpdateSiteContactsForm from "../UpdateSiteContactsForm"
import * as CreateSiteForm from "../../create/CreateSiteForm/components"
import * as Components from "./components"

function UpdateSiteForm({ site }: { site: AppTypes.SiteInterface }) {
  const { methods, onCancelBtnClick, handleFormSubmit } = useHandleUpdateSiteForm(site)

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Update Site</h2>

      <FormProvider { ...methods }>
        <form onSubmit={methods.handleSubmit(handleFormSubmit)} className={styles.body}>

          <Components.Map />

          <Components.InactiveCheckbox />
          <CreateSiteForm.NameInput />
          <CreateSiteForm.LocationInput />

          <div className="flex gap-2 w-full">
            <CreateSiteForm.PreconDateInput />
            <CreateSiteForm.GreenInfrastructureSelect />
          </div>

          <div className="flex gap-2 w-full">
            <CreateSiteForm.PermitInput />
            <CreateSiteForm.COFInput />
            <CreateSiteForm.TNQInput />
          </div>

          <CreateSiteForm.InspectorSelect />

          <div className="py-10">
            <UpdateSiteContactsForm />
          </div>

          <FormBtns onCancelBtnClick={onCancelBtnClick} />
        </form>
      </FormProvider>
    </div>
  )
}

export default UpdateSiteForm