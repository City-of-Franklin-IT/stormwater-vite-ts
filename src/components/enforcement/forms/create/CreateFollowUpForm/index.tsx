import { useFormContext } from "react-hook-form"
import styles from "@/components/form-elements/Forms.module.css"

// Types
import * as AppTypes from "@/context/App/types"

// Components
import FormLabel from "@/components/form-elements/FormLabel"

function CreateFollowUpForm({ index }: { index: number }) {
  const { register } = useFormContext<AppTypes.ConstructionViolationCreateInterface|AppTypes.IllicitDischargeCreateInterface|AppTypes.ComplaintCreateInterface>()

  return (
    <div className="flex w-full">
      <FormLabel name={`FollowUpDates.${ index }.followUpDate`}>
        Date:
      </FormLabel>
      <input 
        type="date"
        className={styles.input}
        { ...register(`FollowUpDates.${ index }.followUpDate`) } />
    </div>
  )
}

export default CreateFollowUpForm