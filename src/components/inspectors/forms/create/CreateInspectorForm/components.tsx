import { useCreateInspectorFormContext } from "./hooks"
import styles from "@/components/form-elements/Forms.module.css"

// Components
import FormLabel from "@/components/form-elements/FormLabel"
import FormError from "@/components/form-elements/FormError"

export const NameInput = () => { // Inspector name input
  const { register, formState: { errors } } = useCreateInspectorFormContext()

  return (
    <div className={styles.inputSection}>
      <div className="flex">
        <FormLabel
          name={"name"}
          required={true}>
            Name:
        </FormLabel>
        <input 
          type="text"
          className={styles.input}
          { ...register("name", {
            required: "Inspector name is required",
            maxLength: {
              value: 50,
              message: "Site name must be 50 characters or less"
            }
          }) } />
      </div>
      <FormError error={errors.name?.message} />
    </div>
  )
}

export const EmailInput = () => { // Inspector email input
  const { register, formState: { errors } } = useCreateInspectorFormContext()

  return (
    <div className={styles.inputSection}>
      <div className="flex">
        <FormLabel
          name={"email"}
          required={true}>
            Email:
        </FormLabel>
        <input 
          type="email"
          className={styles.input}
          { ...register("email", {
            required: "Inspector email is required",
            maxLength: {
              value: 50,
              message: "Inspector email must be 50 characters or less"
            }
          }) } />
      </div>
      <FormError error={errors.email?.message} />
    </div>
  )
}