import { useFormContext } from "react-hook-form"
import styles from "@/components/form-elements/Forms.module.css"

// Types
import * as AppTypes from "@/context/App/types"

export const CheckboxInputs = () => {

  return (
    <div className="flex justify-between gap-20 pb-10 m-auto w-fit">
      <ComplianceCheckbox />
      <ClosedCheckbox />
    </div>
  )
}

const ComplianceCheckbox = () => { // Compliance checkbox
  const methods = useFormContext<AppTypes.ConstructionViolationCreateInterface|AppTypes.IllicitDischargeCreateInterface|AppTypes.ComplaintCreateInterface>()

  return (
    <div className="flex flex-col gap-1 items-center">
      <label htmlFor="compliance" className={styles.checkboxLabel}>Compliance:</label>
      <input
        type="checkbox"
        className="checkbox checkbox-warning"
        { ...methods.register("compliance") } />
    </div>
  )
}

const ClosedCheckbox = () => { // Closed checkbox
  const methods = useFormContext<AppTypes.ConstructionViolationCreateInterface|AppTypes.IllicitDischargeCreateInterface|AppTypes.ComplaintCreateInterface>()

  return (
    <div className="flex flex-col gap-1 items-center">
      <label htmlFor="closed" className={styles.checkboxLabel}>Closed:</label>
      <input
        type="checkbox"
        className="checkbox checkbox-warning"
        { ...methods.register("closed") } />
    </div>
  )
}