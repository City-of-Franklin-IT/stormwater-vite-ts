import { useFieldArray, useFormContext } from "react-hook-form"
import { useCreateViolationFormContext } from "./hooks"
import styles from "@/components/form-elements/Forms.module.css"

// Types
import type * as AppTypes from "@/context/App/types"

// Components
import FormLabel from "@/components/form-elements/FormLabel"
import CreateFollowUpForm from "../CreateFollowUpForm"

export const DateInput = () => { // Violation date input
  const { register, formState: { errors } } = useCreateViolationFormContext()

  const error = errors.date?.message

  return (
    <div className="flex flex-col gap-1 mx-auto w-1/2">
      <FormLabel
        name={"date"}
        required={true}
        error={error}>
          Violation Date:
      </FormLabel>
      <input
        type="date"
        className="input w-full"
        { ...register("date", {
          required: "Violation date is required",
        }) } />
    </div>
  )
}

export const DetailsInput = () => { // Details input
  const { register, formState: { errors } } = useCreateViolationFormContext()

  const error = errors.details?.message

  return (
    <div className="flex flex-col gap-1">
      <FormLabel
        name={"details"}
        required={true}
        error={error}>
          Details:
      </FormLabel>
      <textarea
        className="textarea w-full"
        rows={4}
        { ...register("details", {
          required: "Violation details is required",
          maxLength: {
            value: 2000,
            message: "Violation details must be 2000 characters or less"
          },
        }) } />
    </div>
  )
}

export const EnforcementInputs = () => (
  <div className="flex flex-col gap-3 py-10 w-full">
    <h3 className={styles.subtitle}>Enforcement</h3>

    <EnforcementActionInput />
    <SWOInputs />
  </div>
)

export const PenaltyInputs = () => (
  <div className="flex flex-col gap-3 w-full">
    <h3 className={styles.subtitle}>Penalty</h3>

    <div className="flex gap-3 w-full">
      <PenaltyDateInput />
      <PenaltyAmountInput />
      <PenaltyDueDate />
    </div>
    
    
    <PaymentReceivedDateInput />
  </div>
)

export const FollowUpInputs = () => (
  <div className="flex flex-col gap-3 py-10 w-full">
    <h3 className={styles.subtitle}>Follow Up</h3>

    <FollowUps />
    <AddFollowUpBtn />
  </div>
)

const EnforcementActionInput = () => { // Enforcement action input
  const { register, formState: { errors } } = useCreateViolationFormContext()

  const error = errors.enforcementAction?.message

  return (
    <div className="flex flex-col gap-1">
      <FormLabel
        name={"enforcementAction"}
        error={error}>
          Action:
      </FormLabel>
      <textarea
        className="textarea w-full"
        rows={4}
        { ...register("enforcementAction", {
          maxLength: {
            value: 2000,
            message: "Enforcement action must be 2000 characters or less"
          }
        }) } />
    </div>
  )
}

const SWOInputs = () => (
  <div className="flex gap-3 w-full">
    <SWODateInput />
    <SWOLiftedDate />
  </div>
)

const SWODateInput = () => { // SWO date
  const { register } = useCreateViolationFormContext()

  return (
    <div className="flex flex-col gap-1 mx-auto w-1/2">
      <FormLabel name={"swoDate"}>
        SWO Date:
      </FormLabel>
      <input
        type="date"
        className="input w-full"
        { ...register("swoDate") } />
    </div>
  )
}

const SWOLiftedDate = () => { // SWO lifted date
  const { register, watch } = useCreateViolationFormContext()

  const visible = !!watch("swoDate")

  if(!visible) return null

  return (
    <div className="flex flex-col gap-1 mx-auto w-1/2">
      <FormLabel name={"swoLiftedDate"}>
        SWO Lifted Date:
      </FormLabel>
      <input
        type="date"
        className="input w-full"
        { ...register("swoLiftedDate") } />
    </div>
  )
}

const PenaltyDateInput = () => { // Penalty date input
  const { register } = useCreateViolationFormContext()

  return (
    <div className="flex-1 flex flex-col gap-1 mx-auto max-w-1/2">
      <FormLabel name={"penaltyDate"}>
        Penalty Date:
      </FormLabel>
      <input
        type="date"
        className="input w-full"
        { ...register("penaltyDate") } />
    </div>
  )
}

const PenaltyAmountInput = () => { // Penalty amount input
  const { watch, register, formState: { errors } } = useCreateViolationFormContext()

  const visible = !!watch("penaltyDate")
  const error = errors.penaltyAmount?.message

  if(!visible) return null

  return (
    <div className="flex-1 flex flex-col gap-1">
      <FormLabel
        name={"penaltyAmount"}
        required={true}
        error={error}>
          Amount:
      </FormLabel>
      <input
        type="number"
        className="input w-full"
        { ...register("penaltyAmount", {
          required: "Penalty amount is required",
        }) } />
    </div>
  )
}

const PenaltyDueDate = () => { // Penalty due date input
  const { watch, register, formState: { errors } } = useCreateViolationFormContext()

  const visible = !!watch("penaltyDate")
  const error = errors.penaltyDueDate?.message

  if(!visible) return null

  return (
    <div className="flex-1 flex flex-col gap-1">
      <FormLabel
        name={"penaltyDueDate"}
        required={true}
        error={error}>
          Due Date:
      </FormLabel>
      <input
        type="date"
        className="input w-full"
        { ...register("penaltyDueDate", {
          required: "Penalty due date is required",
        }) } />
    </div>
  )
}

const PaymentReceivedDateInput = () => { // Payment received date input
  const { watch, register } = useCreateViolationFormContext()

  const visible = !!watch("penaltyDate")

  if(!visible) return null

  return (
    <div className="w-full">
      <div className="flex flex-col gap-1 mx-auto max-w-1/2">
        <FormLabel name={"paymentReceived"}>
          Received Date:
        </FormLabel>
        <input
          type="date"
          className="input w-full"
          { ...register("paymentReceived") } />
      </div>
    </div>
  )
}

const FollowUps = () => {
  const { watch } = useFormContext<AppTypes.ConstructionViolationCreateInterface|AppTypes.IllicitDischargeCreateInterface|AppTypes.ComplaintCreateInterface>()

  const followups = watch("FollowUpDates")

  return (
    <>
      {followups.map((_, index) => <CreateFollowUpForm index={index} />)}
    </>
  )
}

const AddFollowUpBtn = () => {
  const { control } = useFormContext<AppTypes.ConstructionViolationCreateInterface|AppTypes.IllicitDischargeCreateInterface|AppTypes.ComplaintCreateInterface>()

  const { append } = useFieldArray({
    control,
    name: "FollowUpDates"
  })

  const addFollowUp = () => {
    append({
      followUpDate: "",
      violationId: ""
    })
  }

  return (
    <button 
      type="button"
      onClick={addFollowUp}
      className="btn btn-primary w-full uppercase">
        Add Follow Up
    </button>
  )
}