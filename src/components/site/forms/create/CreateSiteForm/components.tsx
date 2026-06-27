import { useRef } from "react"
import { useSetInspectorOptions } from "@/components/enforcement/forms/create/CreateIllicitDischargeForm/hooks"
import { useCreateSiteFormContext, useSetCreateSiteMapView } from "./hooks"

// Components
import FormLabel from "@/components/form-elements/FormLabel"

export const Map = () => { // Map input
  const mapRef = useRef<HTMLDivElement>(null)
  useSetCreateSiteMapView(mapRef)

  return (
    <div ref={mapRef} className="relative w-full h-full"></div>
  )
}

export const NameInput = () => { // Site name input
  const { register, formState: { errors } } = useCreateSiteFormContext()

  const error = errors.name?.message

  return (
    <div className="flex-1 flex flex-col gap-1">
      <FormLabel
        name={"name"}
        required={true}
        error={error}>
          Site Name:
      </FormLabel>
      <input 
        type="text"
        className="input w-full"
        { ...register("name", {
          required: "Site name is required",
          maxLength: {
            value: 100,
            message: "Site name must be 100 characters or less"
          },
        }) } />
    </div>
  )
}

export const LocationInput = () => { // Site location description
  const { register, formState: { errors } } = useCreateSiteFormContext()

  const error = errors.location?.message

  return (
    <div className="flex-1 flex flex-col gap-1">
      <FormLabel
        name={"location"}
        required={true}
        error={error}>
          Location:
      </FormLabel>
      <input 
        type="text"
        className="input w-full"
        { ...register("location", {
          required: "Site location is required",
          maxLength: {
            value: 100,
            message: "Site location must be 100 characters or less"
          },
        }) } />
    </div>
  )
}

export const PreconDateInput = () => { // Site precon date input
  const { register, formState: { errors } } = useCreateSiteFormContext()

  const error = errors.preconDate?.message
  
  return (
      <div className="flex-1 flex flex-col gap-1">
        <FormLabel
          name={"preconDate"}
          required={true}
          error={error}>
            Precon Date:
        </FormLabel>
        <input 
          type="date"
          className="input w-full"
          { ...register("preconDate", {
            required: "Precon date is required",
          }) } />
      </div>
  )
}

export const GreenInfrastructureSelect = () => { // Green infrastructure select
  const methods = useCreateSiteFormContext()

  return (
    <div className="flex-1 flex flex-col gap-1">
      <FormLabel name={"greenInfrastructure"}>
        Green Infrastructure:
      </FormLabel>
      <select 
        className="select w-full"
        { ...methods.register("greenInfrastructure") }>
          <option value=""></option>
          <option value={"false"}>No</option>
          <option value={"true"}>Yes</option>
        </select>
    </div>
  )
}

export const PermitInput = () => { // Permit input
  const { register, formState: { errors } } = useCreateSiteFormContext()

  const error = errors.permit?.message

  return (
    <div className="flex-1 flex flex-col gap-1">
      <FormLabel 
        name={"permit"}
        error={error}>
          Permit #:
      </FormLabel>
      <input 
        type="text"
        className="input w-full"
        { ...register("permit", {
          maxLength: {
            value: 20,
            message: "Permit must be 20 characters or less"
          }
        }) } />
    </div>
  )
}

export const COFInput = () => { // COF number input
  const { register, formState: { errors } } = useCreateSiteFormContext()

  const error = errors.cof?.message

  return (
    <div className="flex-1 flex flex-col gap-1">
      <FormLabel 
        name={"cof"}
        error={error}>
          COF #:
      </FormLabel>
      <input 
        type="text"
        className="input w-full"
        { ...register("cof", {
          maxLength: {
            value: 10,
            message: "COF # must be 10 characters or less"
          }
        }) } />
    </div>
  )
}

export const TNQInput = () => { // TNQ input
  const { register, formState: { errors } } = useCreateSiteFormContext()

  const error = errors.tnq?.message

  return (
    <div className="flex-1 flex flex-col gap-1">
      <FormLabel 
        name={"tnq"}
        error={error}>
          TNQ #:
      </FormLabel>
      <input 
        type="text"
        className="input w-full"
        { ...register("tnq", {
          maxLength: {
            value: 20,
            message: "TNQ # must be 20 characters or less"
          },
        }) } />
    </div>
  )
}

export const InspectorSelect = () => { // Inspector select
  const methods = useCreateSiteFormContext()
  const inspectors = useSetInspectorOptions()

  return (
    <div className="flex flex-col mx-auto w-1/2">
      <FormLabel name={"inspectorId"}>
        Inspector:
      </FormLabel>
      <select 
        className="select"
        { ...methods.register("inspectorId") }>
        <option value=""></option>
        {inspectors.map(inspector => {
          return (
            <option key={`inspector-option-${ inspector.value }`} value={inspector.value}>{inspector.text}</option>
          )
        })}
      </select>
    </div>
  )
}