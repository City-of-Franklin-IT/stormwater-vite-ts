import { useRef } from "react"
import { useSetInspectorOptions } from "@/components/enforcement/forms/create/CreateIllicitDischargeForm/hooks"
import styles from "@/components/form-elements/Forms.module.css"
import { useCreateSiteFormContext, useSetCreateSiteMapView } from "./hooks"

// Components
import FormLabel from "@/components/form-elements/FormLabel"
import FormError from "@/components/form-elements/FormError"

export const Map = () => { // Map input
  const mapRef = useRef<HTMLDivElement>(null)

  useSetCreateSiteMapView(mapRef)

  return (
    <div ref={mapRef} className="relative w-full h-full"></div>
  )
}

export const NameInput = () => { // Site name input
  const { register, formState: { errors } } = useCreateSiteFormContext()

  return (
    <div className={styles.inputSection}>
      <div className="flex">
        <FormLabel
          name={"name"}
          required={true}>
            Site Name:
        </FormLabel>
        <input 
          type="text"
          className={styles.input}
          { ...register("name", {
            required: "Site name is required",
            maxLength: {
              value: 100,
              message: "Site name must be 100 characters or less"
            },
          }) } />
      </div>
      <FormError error={errors.name?.message} />
    </div>
  )
}

export const LocationInput = () => { // Site location description
  const { register, formState: { errors } } = useCreateSiteFormContext()

  return (
    <div className={styles.inputSection}>
      <div className="flex">
        <FormLabel
          name={"location"}
          required={true}>
            Location:
        </FormLabel>
        <input 
          type="text"
          className={styles.input}
          { ...register("location", {
            required: "Site location is required",
            maxLength: {
              value: 100,
              message: "Site location must be 100 characters or less"
            },
          }) } />
      </div>
      <FormError error={errors.location?.message} />
    </div>
  )
}

export const PreconDateInput = () => { // Site precon date input
  const { register, formState: { errors } } = useCreateSiteFormContext()
  
  return (
    <div className={styles.inputSection}>
      <div className="flex">
        <FormLabel
          name={"preconDate"}
          required={true}>
            Precon Date:
        </FormLabel>
        <input 
          type="date"
          className={styles.input}
          { ...register("preconDate", {
            required: "Precon date is required",
          }) } />
      </div>
      <FormError error={errors.preconDate?.message} />
    </div>
  )
}

export const GreenInfrastructureSelect = () => { // Green infrastructure select
  const methods = useCreateSiteFormContext()

  return (
    <div className={styles.inputSection}>
      <div className="flex">
        <FormLabel name={"greenInfrastructure"}>
          Green Infrastructure:
        </FormLabel>
        <select 
          className={styles.input}
          { ...methods.register("greenInfrastructure") }>
            <option value=""></option>
            <option value={"false"}>No</option>
            <option value={"true"}>Yes</option>
          </select>
      </div>
    </div>
  )
}

export const PermitInput = () => { // Permit input
  const { register, formState: { errors } } = useCreateSiteFormContext()

  return (
    <div className={styles.inputSection}>
      <div className="flex">
        <FormLabel name={"permit"}>
          Permit #:
        </FormLabel>
        <input 
          type="text"
          className={styles.input}
          { ...register("permit", {
            maxLength: {
              value: 20,
              message: "Permit must be 20 characters or less"
            }
          }) } />
      </div>
      <FormError error={errors.permit?.message} />
    </div>
  )
}

export const COFInput = () => { // COF number input
  const { register, formState: { errors } } = useCreateSiteFormContext()

  return (
    <div className={styles.inputSection}>
      <div className="flex">
        <FormLabel name={"cof"}>
          COF #:
        </FormLabel>
        <input 
          type="text"
          className={styles.input}
          { ...register("cof", {
            maxLength: {
              value: 10,
              message: "COF # must be 10 characters or less"
            }
          }) } />
      </div>
      <FormError error={errors.cof?.message} />
    </div>
  )
}

export const TNQInput = () => { // TNQ input
  const { register, formState: { errors } } = useCreateSiteFormContext()

  return (
    <div className={styles.inputSection}>
      <div className="flex">
        <FormLabel name={"tnq"}>
          TNQ #:
        </FormLabel>
        <input 
          type="text"
          className={styles.input}
          { ...register("tnq", {
            maxLength: {
              value: 20,
              message: "TNQ # must be 20 characters or less"
            },
          }) } />
      </div>
      <FormError error={errors.tnq?.message} />
    </div>
  )
}

export const InspectorSelect = () => { // Inspector select
  const methods = useCreateSiteFormContext()

  const inspectors = useSetInspectorOptions()

  return (
    <div className={styles.inputSection}>
      <div className="flex">
        <FormLabel name={"inspectorId"}>
          Inspector:
        </FormLabel>
        <select 
          className={styles.input}
          { ...methods.register("inspectorId") }>
          <option value=""></option>
          {inspectors.map(inspector => {
            return (
              <option key={`inspector-option-${ inspector.value }`} value={inspector.value}>{inspector.text}</option>
            )
          })}
        </select>
      </div>
    </div>
  )
}