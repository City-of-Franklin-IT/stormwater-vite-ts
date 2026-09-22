import type * as React from "react"
import type MapView from "@arcgis/core/views/MapView"

type ArcgisWidgetProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>

declare global {
  interface HTMLArcgisMapElement extends HTMLElement {
    view?: MapView
  }

  interface HTMLElementTagNameMap {
    "arcgis-map": HTMLArcgisMapElement
    "arcgis-search": HTMLElement
    "arcgis-home": HTMLElement
    "arcgis-zoom": HTMLElement
    "arcgis-expand": HTMLElement
    "arcgis-basemap-gallery": HTMLElement
  }

  namespace JSX {
    interface IntrinsicElements {
      "arcgis-map": React.DetailedHTMLProps<React.HTMLAttributes<HTMLArcgisMapElement>, HTMLArcgisMapElement> & {
        basemap?: string
        center?: string
        zoom?: number | string
      }
      "arcgis-search": ArcgisWidgetProps
      "arcgis-home": ArcgisWidgetProps
      "arcgis-zoom": ArcgisWidgetProps
      "arcgis-expand": ArcgisWidgetProps & { mode?: "auto" | "drawer" | "floating" }
      "arcgis-basemap-gallery": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
    }
  }
}
