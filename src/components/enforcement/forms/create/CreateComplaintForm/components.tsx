import { useRef } from "react"
import { useSetInspectorOptions } from "../CreateIllicitDischargeForm/hooks"
import { useCreateComplaintFormContext, useSetComplaintsMapView } from "./hooks"
import styles from "@/components/form-elements/Forms.module.css"

// Types
import { ConcernEnum } from "./hooks"

// Components
import FormLabel from "@/components/form-elements/FormLabel"

export const Map = ({ visible }: { visible: boolean }) => {
  const mapRef = useRef<HTMLDivElement>(null)
  useSetComplaintsMapView(mapRef)

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

export const ConcernInputs = () => (
  <div className="flex gap-3 w-full">
    <ConcernSelect />
    <OtherConcernInput />
  </div>
)

export const DetailsInput = () => { // Complaint details input
  const { register, formState: { errors } } = useCreateComplaintFormContext()

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
        rows={3} 
        className="textarea w-full"
        { ...register("details", {
          required: "Complaint details is required",
          maxLength: {
            value: 2000,
            message: "Complaint details must be 2000 characters or less"
          },
        }) } />
    </div>
  )
}

export const CommentsInput = () => { // Comments input
  const { register, formState: { errors } } = useCreateComplaintFormContext()

  const error = errors.comments?.message

  return (
    <div className="flex flex-col gap-1">
      <FormLabel
        name={"comments"}
        error={error}>
          Comments:
      </FormLabel>
      <textarea
        rows={3}
        className="textarea w-full"
        { ...register("comments", {
          maxLength: {
            value: 2000,
            message: "Comments must be 2000 characters or less"
          }
        }) } />
    </div>
  )
}

export const ComplaintantInputs = () => (
  <div className="flex flex-col gap-3 py-10 w-full">
    <h3 className={styles.subtitle}>Complaintant</h3>
    
    <div className="flex gap-3 w-full flex-wrap">
      <ComplaintantNameInput />
      <ComplaintantAddressInput />
      <ComplaintantPhoneInput />
      <ComplaintantEmailInput />
    </div>
  </div>
)

const DateInput = () => { // Complaint date
  const { register, formState: { errors } } = useCreateComplaintFormContext()

  const error = errors.date?.message

  return (
    <div className="flex-1 flex flex-col gap-1">
      <FormLabel
        name={"date"}
        required={true}
        error={error}>
          Complaint Date:
      </FormLabel>
      <input
        type="date"
        className="input w-full"
        { ...register("date", {
          required: "Complaint date is required",
        }) } />
    </div>
  )
}

const InspectorSelect = ({ visible }: { visible: boolean }) => { // Inspector select
  const methods = useCreateComplaintFormContext()
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

const LocationDescriptionInput = () => { // Location description input
  const { register, formState: { errors } } = useCreateComplaintFormContext()

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
  const { register, formState: { errors } } = useCreateComplaintFormContext()

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

const ConcernSelect = () => { // Concern type select
  const { register, formState: { errors } } = useCreateComplaintFormContext()

  const error = errors.concern?.message

  return (
    <div className="flex-1 flex flex-col gap-1">
      <FormLabel
        name={"concern"}
        required={true}
        error={error}>
          Concern:
      </FormLabel>
      <select
        className="select w-full"
        { ...register("concern", {
          required: "Concern is required",
        }) }>
          <option value={""}></option>
          {Object.values(ConcernEnum).map((concern) => (
            <option key={concern} value={concern}>{concern}</option>
          ))}
      </select>
    </div>
  )
}

const OtherConcernInput = () => { // Other concern type input
  const { register, watch, formState: { errors } } = useCreateComplaintFormContext()

  const visible = watch("concern") === "Other"
  const error = errors.otherConcern?.message

  if(!visible) return null

  return (
    <div className="flex-1 flex flex-col gap-1">
      <FormLabel
        name={"otherConcern"}
        required={true}
        error={error}>
          Other Concern:
      </FormLabel>
      <input
        type="text"
        className="input w-full"
        { ...register("otherConcern", {
          required: "Other concern is required",
          maxLength: {
            value: 50,
            message: "Other concern must be 50 characters or less"
          },
        }) } />
    </div>
  )
}

const ComplaintantNameInput = () => { // Complaintant name input
  const { register, formState: { errors } } = useCreateComplaintFormContext()

  const error = errors.name?.message

  return (
    <div className="flex flex-col gap-1 w-full">
      <FormLabel
        name={"name"}
        error={error}>
          Full Name:
      </FormLabel>
      <input
        type="text"
        className="input w-full"
        { ...register("name", {
          maxLength: {
            value: 50,
            message: "Name must be 50 characters or less"
          }
        }) } />
    </div>
  )
}

const ComplaintantAddressInput = () => { // Complaintant address input
  const { register, formState: { errors } } = useCreateComplaintFormContext()

  const error = errors.address?.message

  return (
    <div className="flex-1 flex flex-col gap-1">
      <FormLabel
        name={"address"}
        error={error}>
          Address:
      </FormLabel>
      <input
        type="text"
        className="input w-full"
        { ...register("address", {
          maxLength: {
            value: 100,
            message: "Address must be 100 characters or less"
          }
        }) } />
    </div>
  )
}

const ComplaintantPhoneInput = () => { // Complaintant phone input
  const { register, formState: { errors } } = useCreateComplaintFormContext()

  const error = errors.phone?.message

  return (
    <div className="flex-1 flex flex-col gap-1">
      <FormLabel
        name={"phone"}
        error={error}>
          Phone:
      </FormLabel>
      <input
        type="text"
        className="input w-full"
        { ...register("phone", {
          pattern: {
            value: /^[0-9]*$/,
            message: "Phone must contain only numbers"
          },
          minLength: {
            value: 10,
            message: "Phone must be 10 characters"
          },
          maxLength: {
            value: 10,
            message: "Phone must be 10 characters"
          },
        }) } />
    </div>
  )
}

const ComplaintantEmailInput = () => { // Complaintant email input
  const { register, formState: { errors } } = useCreateComplaintFormContext()

  const error = errors.email?.message

  return (
    <div className="flex-1 flex flex-col gap-1">
      <FormLabel
        name={"email"}
        error={error}>
          Email:
      </FormLabel>
      <input
        type="text"
        className="input w-full"
        { ...register("email", {
          maxLength: {
            value: 50,
            message: "Email must be 50 characters or less"
          }
        }) } />
    </div>
  )
}