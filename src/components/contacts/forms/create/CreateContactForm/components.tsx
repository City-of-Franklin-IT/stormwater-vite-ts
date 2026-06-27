import { useCreateContactFormContext } from "./hooks"

// Components
import FormLabel from "@/components/form-elements/FormLabel"

export const NameInput = () => { // Contact name input
  const { register, formState: { errors } } = useCreateContactFormContext()

  const error = errors.name?.message

  return (
    <div className="flex flex-col gap-1">
      <FormLabel
        name={"name"}
        required={true}
        error={error}>
          Contact Name:
      </FormLabel>
      <input
        type="text"
        className="input w-full"
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
  )
}

export const CompanyInput = () => { // Company input
  const { register, formState: { errors } } = useCreateContactFormContext()

  const error = errors.company?.message

  return (
    <div className="flex flex-col gap-1">
      <FormLabel
        name={"company"}
        error={error}>
          Company:
      </FormLabel>
      <input
        type="text"
        className="input w-full"
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
  )
}

export const PhoneAndEmailsInputs = () => (
  <div className="flex gap-2 w-full">
    <PhoneInput />
    <EmailInput />
  </div>
)

const PhoneInput = () => { // Phone input
  const { register, formState: { errors } } = useCreateContactFormContext()

  const error = errors.phone?.message

  return (
    <div className="flex-1 flex flex-col gap-1">
      <FormLabel
        name={"phone"}
        error={error}>
          Phone:
      </FormLabel>
      <input
        type="tel"
        className="input w-full"
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
  )
}

const EmailInput = () => { // Email input
  const { register, formState: { errors } } = useCreateContactFormContext()

  const error = errors.email?.message

  return (
    <div className="flex-1 flex flex-col gap-1">
      <FormLabel
        name={"email"}
        error={error}>
          Email:
      </FormLabel>
      <input
        type="email"
        className="input w-full"
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
  )
}