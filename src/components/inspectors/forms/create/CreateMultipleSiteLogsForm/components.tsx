import { useCreateMultipleSiteLogsFormContext } from "./hooks"
import styles from '@/components/form-elements/Forms.module.css'

// Components
import FormLabel from "@/components/form-elements/FormLabel"
import FormError from "@/components/form-elements/FormError"

export const DateInput = () => { // Inspection date input
  const { register, formState: { errors } } = useCreateMultipleSiteLogsFormContext()

  return (
    <div className={styles.inputSection}>
      <div className="flex">
        <FormLabel
          name={'inspectionDate'}
          required={true}>
            Inspection Date:
        </FormLabel>
        <input 
          type="date"
          className={styles.input}
          { ...register('inspectionDate', {
            required: 'Inspection date is required'
          }) } />
      </div>
      <FormError error={errors.inspectionDate?.message} />
    </div>
  )
}