import styles from "@/components/form-elements/Forms.module.css"

// Components
import * as Components from "./components"

function UpdateSiteContactsForm() {

  return (
    <div className={styles.body}>
      <h2 className={styles.subtitle}>Site Contacts</h2>

      <Components.SiteContactsInputs />
    </div>
  )
}

export default UpdateSiteContactsForm