import styles from "@/components/form-elements/Forms.module.css"
import { useSetCreateSiteMapView, useHandleInactiveCheckbox, useHandleIncompleteCheckbox } from "./hooks"

export const Map = () => { // Map input
  const mapRef = useSetCreateSiteMapView()

  return (
    <div className="w-full h-[50vh] overflow-hidden shadow-xl rounded-xl touch-none">
      <div ref={mapRef} className="w-full h-full"></div>
    </div>
  )
}

export const InactiveCheckbox = () => { // Inactive site checkbox
  const inputProps = useHandleInactiveCheckbox()

  return (
    <div className="flex items-center gap-2 mx-auto my-10 w-fit">
      <label className={styles.checkboxLabel}>Inactive Site</label>
      <input 
        type="checkbox"
        className="checkbox checkbox-secondary"
        { ...inputProps } />
    </div>
  )
}

export const IncompleteCheckbox = () => { // Incomplete site checkbox
  const inputProps = useHandleIncompleteCheckbox()

  return (
    <div className="flex items-center gap-2 mx-auto my-10 w-fit">
      <label className={styles.checkboxLabel}>Incomplete Site</label>
      <input 
        type="checkbox"
        className="checkbox checkbox-secondary"
        { ...inputProps } />
    </div>
  )
}