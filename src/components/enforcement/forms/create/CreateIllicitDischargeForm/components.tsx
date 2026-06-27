import { useRef } from "react"
import { useCreateIllicitDischargeFormContext, useSetInspectorOptions, useSetIllicitDischargeMapView } from "./hooks"
import styles from "@/components/form-elements/Forms.module.css"

// Types
import { StreamWatershedEnum } from "./hooks"

// Components
import FormLabel from "@/components/form-elements/FormLabel"

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

export const DateAndInspectorInputs = ({ siteId }: { siteId: string | null | undefined }) => (
  <div className="flex gap-3 w-full">
    <DateInput />
    <InspectorSelect visible={!siteId} />
  </div>
)

export const LocationAndResponsiblePartyInputs = () => (
  <div className="flex gap-3 w-full">
    <LocationDescriptionInput />
    <ResponsiblePartyInput />
  </div>
)

export const DetailsInput = () => { // Details input
  const { register, formState: { errors } } = useCreateIllicitDischargeFormContext()

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
        rows={4}
        className="textarea w-full"
        { ...register("details", {
          required: "Violation details is required",
          maxLength: {
            value: 2000,
            message: "Violation details must be 2000 characters or less"
          }
        }) } />
    </div>
  )
}

export const StreamWatershedSelect = () => { // Stream / watershed select
  const { register, formState: { errors } } = useCreateIllicitDischargeFormContext()

  const error = errors.streamWatershed?.message

  return (
    <div className="flex gap-3 w-full">
      <div className="flex-1 flex flex-col gap-1">
        <FormLabel
          name={"streamWatershed"}
          required={true}
          error={error}>
            Stream / Watershed:
        </FormLabel>
        <select
          className="select w-full"
          { ...register("streamWatershed", {
            required: "Stream / watershed is required",
          }) }>
          <option value={""}></option>
          {Object.values(StreamWatershedEnum).map(streamWatershed => (
            <option key={streamWatershed} value={streamWatershed}>{streamWatershed}</option>
          ))}
        </select>
      </div>
      <OtherStreamWatershedInput />
    </div>
  )
}

export const EnforcementInputs = () => (
  <div className="flex flex-col gap-3 py-10 w-full">
    <h3 className={styles.subtitle}>Enforcement</h3>

    <EnforcementActionInput />
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

const DateInput = () => { // Illicit discharge date
  const { register, formState: { errors } } = useCreateIllicitDischargeFormContext()

  const error = errors.date?.message

  return (
    <div className="flex-1 flex flex-col gap-1">
      <FormLabel
        name={"date"}
        required={true}
        error={error}>
          Illicit Discharge Date:
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

const InspectorSelect = ({ visible }: { visible: boolean }) => { // Inspector select
  const methods = useCreateIllicitDischargeFormContext()

  const inspectorOptions = useSetInspectorOptions()

  if(!visible) return null

  return (
    <div className="flex-1 flex flex-col gap-1">
      <FormLabel name={"inspectorId"}>
        Inspector:
      </FormLabel>
      <select
        className="select w-full"
        { ...methods.register("inspectorId") }>
          <option value={""}></option>
          {inspectorOptions.map((inspector) => (
            <option key={inspector.value} value={inspector.value}>{inspector.text}</option>
          ))}
      </select>
    </div>
  )
}

const OtherStreamWatershedInput = () => { // Other stream / watershed input
  const { register, watch, formState: { errors } } = useCreateIllicitDischargeFormContext()

  const visible = watch("streamWatershed") === StreamWatershedEnum.Other
  const error = errors.otherStreamWatershed?.message

  if(!visible) return null

  return (
    <div className="flex-1 flex flex-col gap-1">
      <FormLabel
        name={"otherStreamWatershed"}
        required={true}
        error={error}>
          Other Steam / Watershed:
      </FormLabel>
      <input
        type="text"
        className="input w-full"
        { ...register("otherStreamWatershed", {
          required: "Stream / Watershed is required",
          maxLength: {
            value: 50,
            message: "Stream / Watershed must be 50 characters or less"
          }
        }) } />
    </div>
  )
}

const PenaltyDateInput = () => { // Penalty date input
  const methods = useCreateIllicitDischargeFormContext()

  return (
    <div className="flex-1 flex flex-col gap-1 mx-auto max-w-1/2">
      <FormLabel name={"penaltyDate"}>
        Penalty Date:
      </FormLabel>
      <input
        type="date"
        className="input w-full"
        { ...methods.register("penaltyDate") } />
    </div>
  )
}

const PenaltyAmountInput = () => { // Penalty amount input
  const { watch, register, formState: { errors } } = useCreateIllicitDischargeFormContext()

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
          required: "Penalty amount is required"
        }) } />
    </div>
  )
}

const PenaltyDueDate = () => { // Penalty due date input
  const { watch, register, formState: { errors } } = useCreateIllicitDischargeFormContext()

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
          required: "Penalty due date is required"
        }) } />
    </div>
  )
}

const PaymentReceivedDateInput = () => { // Payment received date input
  const methods = useCreateIllicitDischargeFormContext()

  const visible = !!methods.watch("penaltyDate")

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
          { ...methods.register("paymentReceived") } />
      </div>
    </div>
  )
}

const LocationDescriptionInput = () => { // Location description input
  const { register, formState: { errors } } = useCreateIllicitDischargeFormContext()

  const error = errors.locationDescription?.message

  return (
    <div className="flex-1 flex flex-col gap-1">
      <FormLabel
        name={"locationDescription"}
        error={error}>
          Location Description:
      </FormLabel>
      <input
        type="text"
        className="input w-full"
        { ...register("locationDescription", {
          maxLength: {
            value: 50,
            message: "Location description must be 50 characters or less"
          }
        }) } />
    </div>
  )
}

const ResponsiblePartyInput = () => { // Responsible party input
  const { register, formState: { errors } } = useCreateIllicitDischargeFormContext()

  const error = errors.responsibleParty?.message

  return (
    <div className="flex-1 flex flex-col gap-1">
      <FormLabel
        name={"responsibleParty"}
        error={error}>
          Responsible Party:
      </FormLabel>
      <input
        type="text"
        className="input w-full"
        { ...register("responsibleParty", {
          maxLength: {
            value: 50,
            message: "Responsible party must be 50 characters or less"
          },
        }) } />
    </div>
  )
}

const EnforcementActionInput = () => { // Enforcement action input
  const { register, formState: { errors } } = useCreateIllicitDischargeFormContext()

  const error = errors.enforcementAction?.message

  return (
    <div className="flex flex-col gap-1">
      <FormLabel
        name={"enforcementAction"}
        error={error}>
          Action:
      </FormLabel>
      <textarea
        rows={4}
        className="textarea w-full"
        { ...register("enforcementAction", {
          maxLength: {
            value: 2000,
            message: "Enforcement action must be 2000 characters or less"
          }
        }) } />
    </div>
  )
}