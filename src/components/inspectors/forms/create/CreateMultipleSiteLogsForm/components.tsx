import { useCreateMultipleSiteLogsFormContext } from "./hooks"

// Components
import FormLabel from "@/components/form-elements/FormLabel"

export const DateInput = () => { // Inspection date input
  const { register, formState: { errors } } = useCreateMultipleSiteLogsFormContext()

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