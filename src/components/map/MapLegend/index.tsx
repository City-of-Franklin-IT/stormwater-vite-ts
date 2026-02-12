// Types
import * as AppTypes from "@/context/App/types"

// Components
import * as Components from "./components"

function MapLegend({ sites }: { sites: AppTypes.SiteInterface[] }) {
  
  return (
    <Components.LegendItems sites={sites} />
  )
}

export default MapLegend