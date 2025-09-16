import { useRef } from 'react'
import { useUpdateSiteFormContext } from './hooks'
import styles from '@/components/form-elements/Forms.module.css'
import { useSetCreateSiteMapView } from './hooks'

export const Map = () => { // Map input
  const mapRef = useRef<HTMLDivElement>(null)
  
  useSetCreateSiteMapView(mapRef)

  return (
    <div className="w-full h-[50vh] overflow-hidden shadow-xl rounded-xl touch-none">
      <div ref={mapRef} className="w-full h-full"></div>
    </div>
  )
}

export const InactiveCheckbox = () => { // Inactive site checkbox
  const { getValues, setValue, watch } = useUpdateSiteFormContext()

  const siteId = getValues('siteId')

  const checked = !!watch('InactiveSite.siteId')

  return (
    <div className="flex items-center gap-2 mx-auto my-10 w-fit">
      <label className={styles.checkboxLabel}>Inactive Site</label>
      <input 
        type="checkbox"
        className="checkbox checkbox-secondary"
        checked={checked}
        onChange={(e) => {
          const value = e.currentTarget.checked ? String(siteId) : ''

          setValue('InactiveSite.siteId', value)
        }}/>
    </div>
  )
}