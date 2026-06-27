import { useCreateComplaintFormContext } from "../../create/CreateComplaintForm/hooks"

// Components
import FormLabel from "@/components/form-elements/FormLabel"

export const CheckboxInputs = () => (
  <div className="flex justify-between gap-20 pb-10 m-auto w-fit">
    <ComplianceCheckbox />
    <ClosedCheckbox />
  </div>
)

const ComplianceCheckbox = () => { // Compliance checkbox
  const methods = useCreateComplaintFormContext()

  return (
    <div className="flex flex-col gap-1 items-center">
      <FormLabel name="compliance">Compliance:</FormLabel>
      <input
        type="checkbox"
        className="checkbox checkbox-warning"
        { ...methods.register("compliance") } />
    </div>
  )
}

const ClosedCheckbox = () => { // Closed checkbox
  const methods = useCreateComplaintFormContext()

  return (
    <div className="flex flex-col gap-1 items-center">
      <FormLabel name="closed">Closed:</FormLabel>
      <input
        type="checkbox"
        className="checkbox checkbox-warning"
        { ...methods.register("closed") } />
    </div>
  )
}