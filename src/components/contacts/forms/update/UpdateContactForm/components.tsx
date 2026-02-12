import { useCreateContactFormContext } from "../../create/CreateContactForm/hooks"
import styles from "@/components/form-elements/Forms.module.css"

export const InactiveCheckbox = () => { // Inactive site checkbox
  const { register, watch } = useCreateContactFormContext()

  const checked = !!watch("inactive")

  return (
    <div className="flex items-center gap-2 mx-auto my-10 w-fit">
      <label htmlFor="inactiveSite" className={styles.checkboxLabel}>Inactive Contact</label>
      <input 
        type="checkbox"
        className="checkbox checkbox-secondary"
        checked={checked}
        { ...register("inactive") } />
    </div>
  )
}