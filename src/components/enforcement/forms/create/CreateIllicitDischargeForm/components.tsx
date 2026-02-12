import { useRef } from "react"
import { useCreateIllicitDischargeFormContext, useSetInspectorOptions, useSetIllicitDischargeMapView } from "./hooks"
import styles from "@/components/form-elements/Forms.module.css"

// Types
import { StreamWatershedEnum } from "./hooks"

// Components
import FormLabel from "@/components/form-elements/FormLabel"
import FormError from "@/components/form-elements/FormError"

export const Map = ({ visible }: { visible: boolean }) => {
  const mapRef = useRef<HTMLDivElement>(null)

  useSetIllicitDischargeMapView(mapRef)

  if(!visible) return null

  return (
    <div className="w-full h-[50vh] overflow-hidden bg-transparent shadow-xl rounded-xl touch-none">
      <div ref={mapRef} className="relative w-full h-full"></div>
    </div>
  )
}

export const DateAndInspectorInputs = ({ siteId }: { siteId: string | null | undefined }) => {

  return (
    <div className="flex gap-3 w-full">
      <DateInput />
      <InspectorSelect visible={!siteId} />
    </div>
  )
}

export const LocationAndResponsiblePartyInputs = () => {

  return (
    <div className="flex gap-3 w-full">
      <LocationDescriptionInput />
      <ResponsiblePartyInput />
    </div>
  )
}

export const DetailsInput = () => { // Details input
  const { register, formState: { errors } } = useCreateIllicitDischargeFormContext()

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
          }
        }) } />
      </div>
      <FormError error={errors.details?.message} />
    </div>
  )
}

export const StreamWatershedSelect = () => { // Stream / watershed select
  const { register, formState: { errors } } = useCreateIllicitDischargeFormContext()

  return (
    <div className="flex gap-3 w-full">
      <div className={styles.inputSection}>
        <div className="flex w-full">
          <FormLabel
            name={"streamWatershed"}
            required={true}>
              Stream / Watershed:
          </FormLabel>
          <select 
            className={styles.input}
            { ...register("streamWatershed", {
              required: "Stream / watershed is required",
            }) }>
            <option value={""}></option>
            {Object.values(StreamWatershedEnum).map(streamWatershed => (
              <option key={streamWatershed} value={streamWatershed}>{streamWatershed}</option>
            ))}
          </select>
          <FormError error={errors.streamWatershed?.message} />
        </div>
      </div>
      <OtherStreamWatershedInput />
    </div>
  )
}

export const EnforcementInputs = () => {

  return (
    <div className="flex flex-col gap-3 py-10 w-full">
      <h3 className={styles.subtitle}>Enforcement</h3>

      <EnforcementActionInput />
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

const DateInput = () => { // Illicit discharge date
  const { register, formState: { errors } } = useCreateIllicitDischargeFormContext()

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex">
        <FormLabel
          name={"date"}
          required={true}>
            Illicit Discharge Date:
        </FormLabel>
        <input 
          type="date"
          className={styles.input}
          { ...register("date", {
            required: "Violation date is required",
          }) } />
      </div>
      <FormError error={errors.date?.message} />
    </div>
  )
}

const InspectorSelect = ({ visible }: { visible: boolean }) => { // Inspector select
  const methods = useCreateIllicitDischargeFormContext()

  const inspectorOptions = useSetInspectorOptions()

  if(!visible) return null

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex">
        <FormLabel name={"inspectorId"}>
          Inspector:
        </FormLabel>
        <select 
          className={styles.input}
          { ...methods.register("inspectorId") }>
            <option value={""}></option>
            {inspectorOptions.map((inspector) => (
              <option key={inspector.value} value={inspector.value}>{inspector.text}</option>
            ))}
        </select>
      </div>
    </div>
  )
}

const OtherStreamWatershedInput = () => { // Other stream / watershed input
  const { register, watch, formState: { errors } } = useCreateIllicitDischargeFormContext()

  const visible = watch("streamWatershed") === StreamWatershedEnum.Other

  if(!visible) return null

  return (
    <div className={styles.inputSection}>
      <div className="flex">
        <FormLabel 
          name={"otherStreamWatershed"}
          required={true}>
            Other Steam / Watershed:
        </FormLabel>
        <input 
          type="text" 
          className={styles.input}
          { ...register("otherStreamWatershed", {
            required: "Stream / Watershed is required",
            maxLength: {
              value: 50,
              message: "Stream / Watershed must be 50 characters or less"
            }
          }) } />
      </div>
      <FormError error={errors.otherStreamWatershed?.message} />
    </div>
  )
}

const PenaltyDateInput = () => { // Penalty date input
  const methods = useCreateIllicitDischargeFormContext()

  return (
    <div className="flex-2 flex w-full">
      <FormLabel name={"penaltyDate"}>
        Date
      </FormLabel>
      <input
        type="date"
        className={styles.input}
        { ...methods.register("penaltyDate") } />
    </div>
  )
}

const PenaltyAmountInput = () => { // Penalty amount input
  const { watch, register, formState: { errors } } = useCreateIllicitDischargeFormContext()

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
            required: "Penalty amount is required"
          }) } />
      </div>
      <FormError error={errors.penaltyAmount?.message} />
    </div>
  )
}

const PenaltyDueDate = () => { // Penalty due date input
  const { watch, register, formState: { errors } } = useCreateIllicitDischargeFormContext()

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
            required: "Penalty due date is required"
          }) } />
      </div>
      <FormError error={errors.penaltyDueDate?.message} />
    </div>
  )
}

const PaymentReceivedDateInput = () => { // Payment received date input
  const methods = useCreateIllicitDischargeFormContext()

  const visible = !!methods.watch("penaltyDate")

  if(!visible) return null

  return (
    <div className="flex-1 flex w-full">
      <FormLabel name={"paymentReceived"}>
        Received Date:
      </FormLabel>
      <input
        type="date"
        className={styles.input}
        { ...methods.register("paymentReceived") } />
    </div>
  )
}

const LocationDescriptionInput = () => { // Location description input
  const { register, formState: { errors } } = useCreateIllicitDischargeFormContext()

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex">
        <FormLabel name={"locationDescription"}>
          Location Description:
        </FormLabel>
        <input 
          type="text"
          className={styles.input}
          { ...register("locationDescription", {
            maxLength: {
              value: 50,
              message: "Location description must be 50 characters or less"
            }
          }) } />
      </div>
      <FormError error={errors.locationDescription?.message} />
    </div>
  )
}

const ResponsiblePartyInput = () => { // Responsible party input
  const { register, formState: { errors } } = useCreateIllicitDischargeFormContext()

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex">
        <FormLabel name={"responsibleParty"}>
          Responsible Party:
        </FormLabel>
        <input 
          type="text"
          className={styles.input}
          { ...register("responsibleParty", {
            maxLength: {
              value: 50,
              message: "Responsible party must be 50 characters or less"
            },
          }) } />
      </div>
      <FormError error={errors.responsibleParty?.message} />
    </div>
  )
}

const EnforcementActionInput = () => { // Enforcement action input
  const { register, formState: { errors } } = useCreateIllicitDischargeFormContext()

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
      <FormError error={errors.enforcementAction?.message} />
    </div>
  )
}