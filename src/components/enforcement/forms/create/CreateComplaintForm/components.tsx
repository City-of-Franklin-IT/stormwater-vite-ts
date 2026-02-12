import { useRef } from "react"
import { useSetInspectorOptions } from "../CreateIllicitDischargeForm/hooks"
import { useCreateComplaintFormContext, useSetComplaintsMapView } from "./hooks"
import styles from "@/components/form-elements/Forms.module.css"

// Types
import { ConcernEnum } from "./hooks"

// Components
import FormLabel from "@/components/form-elements/FormLabel"
import FormError from "@/components/form-elements/FormError"

export const Map = ({ visible }: { visible: boolean }) => {
  const mapRef = useRef<HTMLDivElement>(null)

  useSetComplaintsMapView(mapRef)

  if(!visible) return

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

export const ConcernInputs = () => {

  return (
    <div className="flex gap-3 w-full">
      <ConcernSelect />
      <OtherConcernInput />
    </div>
  )
}

export const DetailsInput = () => { // Complaint details input
  const { register, formState: { errors } } = useCreateComplaintFormContext()

  return (
    <div className={styles.inputSection}>
      <div className="flex">
        <FormLabel
          name={"details"}
          required={true}>
            Details:
        </FormLabel>
        <textarea 
          rows={3} 
          className={styles.input}
          { ...register("details", {
            required: "Complaint details is required",
            maxLength: {
              value: 2000,
              message: "Complaint details must be 2000 characters or less"
            },
          }) } />
      </div>
      <FormError error={errors.details?.message} />
    </div>
  )
}

export const CommentsInput = () => { // Comments input
  const { register, formState: { errors } } = useCreateComplaintFormContext()

  return (
    <div className={styles.inputSection}>
      <div className="flex">
        <FormLabel name={"comments"}>
          Comments:
        </FormLabel>
        <textarea 
          rows={3} 
          className={styles.input}
          { ...register("comments", {
            maxLength: {
              value: 2000,
              message: "Comments must be 2000 characters or less"
            }
          }) } />
      </div>
      <FormError error={errors.comments?.message} />
    </div>
  )
}

export const ComplaintantInputs = () => { // Complaintant information inputs
  
  return (
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
}

const DateInput = () => { // Illicit discharge date
  const { register, formState: { errors } } = useCreateComplaintFormContext()

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex">
        <FormLabel
          name={"date"}
          required={true}>
            Complaint Date:
        </FormLabel>
        <input 
          type="date"
          className={styles.input}
          { ...register("date", {
            required: "Complaint date is required",
          }) } />
      </div>
      <FormError error={errors.date?.message} />
    </div>
  )
}

const InspectorSelect = ({ visible }: { visible: boolean }) => { // Inspector select
  const methods = useCreateComplaintFormContext()

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

const LocationDescriptionInput = () => { // Location description input
  const { register, formState: { errors } } = useCreateComplaintFormContext()

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
  const { register, formState: { errors } } = useCreateComplaintFormContext()

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

const ConcernSelect = () => { // Concern type select
  const { register, formState: { errors } } = useCreateComplaintFormContext()

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex">
        <FormLabel
          name={"concern"}
          required={true}>
            Concern:
        </FormLabel>
        <select 
          className={styles.input}
          { ...register("concern", {
            required: "Concern is required",
          }) }>
            <option value={""}></option>
            {Object.values(ConcernEnum).map((concern) => (
              <option key={concern} value={concern}>{concern}</option>
            ))}
        </select>
      </div>
      <FormError error={errors.concern?.message} />
    </div>
  )
}

const OtherConcernInput = () => { // Other concern type input
  const { register, watch, formState: { errors } } = useCreateComplaintFormContext()

  const visible = watch("concern") === "Other"

  if(!visible) return null

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex">
        <FormLabel
          name={"otherConcern"}
          required={true}>
            Other Concern:
        </FormLabel>
        <input 
          type="text"
          className={styles.input}
          { ...register("otherConcern", {
            required: "Other concern is required",
            maxLength: {
              value: 50,
              message: "Other concern must be 50 characters or less"
            },
          }) } />
      </div>
      <FormError error={errors.otherConcern?.message} />
    </div>
  )
}

const ComplaintantNameInput = () => { // Complaintant name input
  const { register, formState: { errors } } = useCreateComplaintFormContext()

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex">
        <FormLabel name={"name"}>
          Full Name:
        </FormLabel>
        <input
          type="text"
          className={styles.input}
          { ...register("name", {
            maxLength: {
              value: 50,
              message: "Name must be 50 characters or less"
            }
          }) } />
      </div>
      <FormError error={errors.name?.message} />
    </div>
  )
}

const ComplaintantAddressInput = () => { // Complaintant address input
  const { register, formState: { errors } } = useCreateComplaintFormContext()

  return (
    <div className="flex-1 flex flex-col gap-2">
      <div className="flex">
        <FormLabel name={"address"}>
          Address:
        </FormLabel>
        <input
          type="text"
          className={styles.input}
          { ...register("address", {
            maxLength: {
              value: 100,
              message: "Address must be 100 characters or less"
            }
          }) } />
      </div>
      <FormError error={errors.address?.message} />
    </div>
  )
}

const ComplaintantPhoneInput = () => { // Complaintant phone input
  const { register, formState: { errors } } = useCreateComplaintFormContext()

  return (
    <div className="flex-1 flex flex-col gap-2">
      <div className="flex">
        <FormLabel name={"phone"}>
          Phone:
        </FormLabel>
        <input
          type="text"
          className={styles.input}
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
      <FormError error={errors.phone?.message} />
    </div> 
  )
}

const ComplaintantEmailInput = () => { // Complaintant email input
  const { register, formState: { errors } } = useCreateComplaintFormContext()

  return (
    <div className="flex-1 flex flex-col gap-2">
      <div className="flex">
        <FormLabel name={"email"}>
          Email:
        </FormLabel>
        <input
          type="text"
          className={styles.input}
          { ...register("email", {
            maxLength: {
              value: 50,
              message: "Email must be 50 characters or less"
            }
          }) } />
      </div>
      <FormError error={errors.email?.message} />
    </div>
  )
}