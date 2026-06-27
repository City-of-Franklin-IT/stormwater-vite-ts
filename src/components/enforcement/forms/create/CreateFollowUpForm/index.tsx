import { useFormContext } from "react-hook-form"

// Types
import type * as AppTypes from "@/context/App/types"

// Components
import FormLabel from "@/components/form-elements/FormLabel"

function CreateFollowUpForm({ index }: { index: number }) {
  const { register } = useFormContext<AppTypes.ConstructionViolationCreateInterface|AppTypes.IllicitDischargeCreateInterface|AppTypes.ComplaintCreateInterface>()

  return (
    <div className="w-full">
      <div className="flex-1 flex flex-col gap-1 mx-auto max-w-1/2">
        <FormLabel name={`FollowUpDates.${ index }.followUpDate`}>
          Follow Up Date:
        </FormLabel>
        <input 
          type="date"
          className="input w-full"
          { ...register(`FollowUpDates.${ index }.followUpDate`) } />
      </div>
    </div>
  )
}

export default CreateFollowUpForm