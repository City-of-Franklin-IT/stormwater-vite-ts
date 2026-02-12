import { useFieldArray, useFormContext } from "react-hook-form"
import { useCreateViolationFormContext } from "./hooks"
import styles from "@/components/form-elements/Forms.module.css"

// Components
import FormLabel from "@/components/form-elements/FormLabel"
import FormError from "@/components/form-elements/FormError"
import CreateFollowUpForm from "../CreateFollowUpForm"
import * as AppTypes from "@/context/App/types"

export const DateInput = () => { // Violation date input
  const { register, formState: { errors } } = useCreateViolationFormContext()

  return (
    <div className={styles.inputSection}>
      <div className="flex">
        <FormLabel
          name={"date"}
          required={true}>
            Violation Date:
        </FormLabel>
        <input 
          type="date"
          className={styles.input}
          { ...register("date", {
            required: "Violation date is required",
          }) } />
      </div>
      <FormError error={errors?.date?.message} />
    </div>
  )
}

export const DetailsInput = () => { // Details input
  const { register, formState: { errors } } = useCreateViolationFormContext()

  return (
    <div className={styles.inputSection}>
      <div className="flex">
        <FormLabel
          name={"details"}
          required={true}>
            Details:
        </FormLabel>
        <textarea
          className={styles.input}
          rows={4}
          { ...register("details", {
          required: "Violation details is required",
          maxLength: {
            value: 2000,
            message: "Violation details must be 2000 characters or less"
          },
        }) } />
      </div>
      <FormError error={errors?.details?.message} />
    </div>
  )
}

export const EnforcementInputs = () => {

  return (
    <div className="flex flex-col gap-3 py-10 w-full">
      <h3 className={styles.subtitle}>Enforcement</h3>

      <EnforcementActionInput />
      <SWOInputs />
    </div>
  )
}

export const PenaltyInputs = () => { // Penalty inputs

  return (
    <div className="flex flex-col gap-3 w-full">
      <h3 className={styles.subtitle}>Penalty</h3>

      <div className="flex gap-3 w-full flex-wrap">
        <PenaltyDateInput />
        <PenaltyAmountInput />
        <PenaltyDueDate />
        <PaymentReceivedDateInput />
      </div>
    </div>
  )
}

export const FollowUpInputs = () => {

  return (
    <div className="flex flex-col gap-3 py-10 w-full">
      <h3 className={styles.subtitle}>Follow Up</h3>

      <FollowUps />
      <AddFollowUpBtn />
    </div>
  )
}

const EnforcementActionInput = () => { // Enforcement action input
  const { register, formState: { errors } } = useCreateViolationFormContext()

  return (
    <div className={styles.inputSection}>
      <div className="flex">
        <FormLabel name={"enforcementAction"}>
          Action:
        </FormLabel>
        <textarea
          className={styles.input}
          rows={4}
          { ...register("enforcementAction", {
            maxLength: {
              value: 2000,
              message: "Enforcement action must be 2000 characters or less"
            }
          }) } />
      </div>
      <FormError error={errors?.enforcementAction?.message} />
    </div>
  )
}

const SWOInputs = () => { // SWO inputs

  return (
    <div className="flex gap-3 w-full">
      <SWODateInput />
      <SWOLiftedDate />
    </div>
  )
}

const SWODateInput = () => { // SWO date
  const { register } = useCreateViolationFormContext()

  return (
    <div className="flex-1 flex w-full">
      <FormLabel name={"swoDate"}>
        SWO Date:
      </FormLabel>
      <input
        type="date"
        className={styles.input}
        { ...register("swoDate") } />
    </div>
  )
}

const SWOLiftedDate = () => { // SWO lifted date
  const { register, watch } = useCreateViolationFormContext()

  const visible = !!watch("swoDate")

  if(!visible) return null

  return (
    <div className="flex-1 flex w-full">
      <FormLabel name={"swoLiftedDate"}>
        SWO Lifted Date:
      </FormLabel>
      <input
        type="date"
        className={styles.input}
        { ...register("swoLiftedDate") } />
    </div>
  )
}

const PenaltyDateInput = () => { // Penalty date input
  const { register } = useCreateViolationFormContext()

  return (
    <div className="flex-2 flex w-full">
      <FormLabel name={"penaltyDate"}>
        Date:
      </FormLabel>
      <input
        type="date"
        className={styles.input}
        { ...register("penaltyDate") } />
    </div>
  )
}

const PenaltyAmountInput = () => { // Penalty amount input
  const { watch, register, formState: { errors } } = useCreateViolationFormContext()

  const visible = !!watch("penaltyDate")

  if(!visible) return null

  return (
    <div className="flex-1 flex flex-col gap-2">
      <div className="flex">
        <FormLabel 
          name={"penaltyAmount"}
          required={true}>
            Amount:
        </FormLabel>
        <input
          type="number"
          className={styles.input}
          { ...register("penaltyAmount", {
            required: "Penalty amount is required",
          }) } />
      </div>
      <FormError error={errors?.penaltyDate?.message} />
    </div>
  )
}

const PenaltyDueDate = () => { // Penalty due date input
  const { watch, register, formState: { errors } } = useCreateViolationFormContext()

  const visible = !!watch("penaltyDate")

  if(!visible) return null

  return (
    <div className="flex-1 flex flex-col gap-2">
      <div className="flex">
        <FormLabel
          name={"penaltyDueDate"}
          required={true}>
            Due Date:
        </FormLabel>
        <input
          type="date"
          className={styles.input}
          { ...register("penaltyDueDate", {
            required: "Penalty due date is required",
          }) } />
      </div>
      <FormError error={errors.penaltyDate?.message} />
    </div>
  )
}

const PaymentReceivedDateInput = () => { // Payment received date input
  const { watch, register } = useCreateViolationFormContext()

  const visible = !!watch("penaltyDate")

  if(!visible) return null

  return (
    <div className="flex-1 flex w-full">
      <FormLabel name={"paymentReceived"}>
        Received Date:
      </FormLabel>
      <input
        type="date"
        className={styles.input}
        { ...register("paymentReceived") } />
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