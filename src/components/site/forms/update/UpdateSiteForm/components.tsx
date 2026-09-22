import { useSetCreateSiteMapView, useHandleInactiveCheckbox, useHandleIncompleteCheckbox, useUpdateSiteFormContext } from "./hooks"

// Components
import FormLabel from "@/components/form-elements/FormLabel"

// ArcGIS map web components
import "@arcgis/map-components/components/arcgis-map"

export const Map = () => { // Map input
  const mapRef = useSetCreateSiteMapView()

  const { getValues } = useUpdateSiteFormContext()
  const xCoordinate = getValues("xCoordinate")
  const yCoordinate = getValues("yCoordinate")

  return (
    <div className="w-full h-[50vh] overflow-hidden shadow-xl rounded-xl touch-none">
      <arcgis-map
        ref={mapRef}
        basemap="dark-gray-vector"
        center={`${ xCoordinate }, ${ yCoordinate }`}
        zoom="16"
        className="block w-full h-full">
      </arcgis-map>
    </div>
  )
}

export const InactiveCheckbox = () => { // Inactive site checkbox
  const inputProps = useHandleInactiveCheckbox()

  return (
    <div className="flex items-center gap-2 mx-auto my-10 w-fit">
      <FormLabel name="inactive">
        Inactive Site:
      </FormLabel>
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
      <FormLabel name="siteId">
        Incomplete Site:
      </FormLabel>
      <input
        type="checkbox"
        className="checkbox checkbox-secondary"
        { ...inputProps } />
    </div>
  )
}