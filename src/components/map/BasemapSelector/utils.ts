// Types
import { BasemapType } from "@/components/sites/context"

const basemapSelectMap = new Map<BasemapType, string>([
  ["dark-gray-vector", "Dark Gray"],
  ["streets-vector", "Streets Vector"],
  ["streets-night-vector", "Streets Night"],
  ["satellite", "Satellite"]
])

export const basemapSelectOptions = Array.from(basemapSelectMap, ([value, text]) => ({ value, text }))

export type BasemapSelectProps = { onChange: React.ChangeEventHandler<HTMLSelectElement>, basemap: BasemapType }