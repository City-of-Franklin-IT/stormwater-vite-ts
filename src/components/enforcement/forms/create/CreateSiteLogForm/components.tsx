import { useFormContext } from "react-hook-form"

// Types
import type * as AppTypes from "@/context/App/types"

// Components
import FormLabel from "@/components/form-elements/FormLabel"

export const DateInput = () => { // Inspection date input
  const { register, formState: { errors } } = useFormContext<AppTypes.SiteLogCreateInterface>()

  const error = errors.inspectionDate?.message

  return (
    <div className="flex flex-col gap-1">
      <FormLabel
        name={"inspectionDate"}
        required={true}
        error={error}>
          Inspection Date:
      </FormLabel>
      <input
        type="date"
        className="input w-full"
        { ...register("inspectionDate", {
          required: "Inspection date is required"
        }) } />
    </div>
  )
}