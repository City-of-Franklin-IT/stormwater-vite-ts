import { useCreateContactFormContext } from "../../create/CreateContactForm/hooks"

// Components
import FormLabel from "@/components/form-elements/FormLabel"

export const InactiveCheckbox = () => { // Inactive site checkbox
  const { register, watch } = useCreateContactFormContext()

  const checked = !!watch("inactive")

  return (
    <div className="flex flex-col items-center gap-2 mx-auto my-10 w-fit">
      <FormLabel name="inactive">Inactive Contact:</FormLabel>
      <input
        type="checkbox"
        className="checkbox checkbox-secondary"
        checked={checked}
        { ...register("inactive") } />
    </div>
  )
}