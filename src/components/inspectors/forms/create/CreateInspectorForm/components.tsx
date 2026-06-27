import { useCreateInspectorFormContext } from "./hooks"

// Components
import FormLabel from "@/components/form-elements/FormLabel"

export const NameInput = () => { // Inspector name input
  const { register, formState: { errors } } = useCreateInspectorFormContext()

  const error = errors.name?.message

  return (
    <div className="flex-1 flex flex-col gap-1">
      <FormLabel
        name={"name"}
        required={true}
        error={error}>
          Name:
      </FormLabel>
      <input
        type="text"
        className="input w-full"
        { ...register("name", {
          required: "Inspector name is required",
          maxLength: {
            value: 50,
            message: "Site name must be 50 characters or less"
          }
        }) } />
    </div>
  )
}

export const EmailInput = () => { // Inspector email input
  const { register, formState: { errors } } = useCreateInspectorFormContext()

  const error = errors.email?.message

  return (
    <div className="flex-1 flex flex-col gap-1">
      <FormLabel
        name={"email"}
        required={true}
        error={error}>
          Email:
      </FormLabel>
      <input
        type="email"
        className="input w-full"
        { ...register("email", {
          required: "Inspector email is required",
          maxLength: {
            value: 50,
            message: "Inspector email must be 50 characters or less"
          }
        }) } />
    </div>
  )
}