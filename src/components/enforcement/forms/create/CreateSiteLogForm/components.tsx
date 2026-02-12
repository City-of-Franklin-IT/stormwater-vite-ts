import { useFormContext } from "react-hook-form"
import styles from "@/components/form-elements/Forms.module.css"

// Types
import * as AppTypes from "@/context/App/types"

// Components
import FormLabel from "@/components/form-elements/FormLabel"
import FormError from "@/components/form-elements/FormError"

export const DateInput = () => { // Inspection date input
  const { register, formState: { errors } } = useFormContext<AppTypes.SiteLogCreateInterface>()

  return (
    <div className={styles.inputSection}>
      <div className="flex">
        <FormLabel
          name={"inspectionDate"}
          required={true}>
            Inspection Date:
        </FormLabel>
        <input 
          type="date"
          className={styles.input}
          { ...register("inspectionDate", {
            required: "Inspection date is required"
          }) } />
      </div>
      <FormError error={errors.inspectionDate?.message} />
    </div>
  )
}