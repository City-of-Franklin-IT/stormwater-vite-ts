import { useCreateContactFormContext } from "./hooks"
import styles from "@/components/form-elements/Forms.module.css"

// Components
import FormLabel from "@/components/form-elements/FormLabel"
import FormError from "@/components/form-elements/FormError"

export const NameInput = () => { // Contact name input
  const { register, formState: { errors } } = useCreateContactFormContext()

  return (
    <div className={styles.inputSection}>
      <div className="flex">
        <FormLabel
          name={"name"}
          required={true}>
            Contact Name:
        </FormLabel>
        <input 
          type="text"
          className={styles.input}
          { ...register("name", {
            required: "Contact name is required",
            maxLength: {
              value: 50,
              message: "Contact name must be 50 characters or less"
            },
            pattern: {
              value: /^[A-Za-z\s]+$/,
              message: "No special characters or numbers"
            },
          }) } />
      </div>
      <FormError error={errors.name?.message} />
    </div>
  )
}

export const CompanyInput = () => { // Company input
  const { register, formState: { errors } } = useCreateContactFormContext()

  return (
    <div className={styles.inputSection}>
      <div className="flex">
        <FormLabel name={"company"}>
          Company:
        </FormLabel>
        <input 
          type="text"
          className={styles.input}
          { ...register("company", {
            maxLength: {
              value: 50,
              message: "Company must be 50 characters or less"
            },
            pattern: {
              value: /^[A-Za-z\s]+$/,
              message: "No special characters or numbers"
            },
          }) } />
      </div>
      <FormError error={errors.company?.message} />
    </div>
  )
}

export const PhoneAndEmailsInputs = () => {

  return (
    <div className="flex gap-2 w-full">
      <PhoneInput />
      <EmailInput />
    </div>
  )
}

const PhoneInput = () => { // Phone input
  const { register, formState: { errors } } = useCreateContactFormContext()

  return (
    <div className={styles.inputSection}>
      <div className="flex">
        <FormLabel name={"phone"}>
          Phone:
        </FormLabel>
        <input 
          type="tel"
          className={styles.input}
          { ...register("phone", {
            minLength: {
              value: 10,
              message: "Required format ex: 6155506691"
            },
            maxLength: {
              value: 10,
              message: "Required format ex: 6155506691"
            },
            pattern: {
              value: /^[0-9]{10}$/,
              message: "Required format ex: 6155506691"
            },
          }) } />
      </div>
      <FormError error={errors.phone?.message} />
    </div>
  )
}

const EmailInput = () => { // Email input
  const { register, formState: { errors } } = useCreateContactFormContext()

  return (
    <div className={styles.inputSection}>
      <div className="flex">
        <FormLabel name={"email"}>
          Email:
        </FormLabel>
        <input 
          type="email"
          className={styles.input}
          { ...register("email", {
            maxLength: {
              value: 50,
              message: "Email must be 50 characters or less"
            },
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Required format ex: bin.franklin@franklintn.gov"
            },
          }) } />
      </div>
      <FormError error={errors.email?.message} />
    </div>
  )
}