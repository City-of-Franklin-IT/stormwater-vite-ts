import type * as React from "react"

type ArcgisWidgetProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "manual"
}

declare global {
  interface HTMLArcgisMapElement extends HTMLElement {
    view?: __esri.MapView
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
      "arcgis-expand": ArcgisWidgetProps
      "arcgis-basemap-gallery": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
    }
  }
}
