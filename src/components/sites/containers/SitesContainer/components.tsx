import { useContext, useRef } from "react"
import SitesCtx from "../../context"
import { useDebounce } from "@/helpers/hooks"
import { useSetSitesMapView } from "./hooks"

// Icons
import warningPinIcon from "@/assets/icons/pin/warning-pin.png"
import errorPinIcon from "@/assets/icons/pin/error-pin.png"

// Types
import * as AppTypes from "@/context/App/types"

// Components
import MapLegend from "@/components/map/MapLegend/index.tsx"
import Loading from "@/components/layout/loading/Loading/index.tsx"

export const Map = ({ sites }: { sites: AppTypes.SiteInterface[] }) => {
  const mapRef = useRef<HTMLDivElement>(null)

  const debounced = useDebounce(sites, 500)

  useSetSitesMapView(mapRef, debounced)

  return (
    <div className="flex-1 bg-neutral h-full">
      <div ref={mapRef} className="relative w-full h-full">
        <div className="absolute bottom-4 left-4 z-10">
          <MapLegend sites={debounced} />
        </div>
      </div>
    </div>
  )
}

type ActiveSitesBtnProps = { showActiveSitesOnly: boolean, onClick: React.MouseEventHandler<HTMLButtonElement> }

export const ActiveSitesBtn = (props: ActiveSitesBtnProps) => {
  const label = props.showActiveSitesOnly ? "Show Inactive Sites" : "Hide Inactive Sites"

  return (
    <button 
      type="button"
      className="text-neutral-content font-[play] font-bold uppercase p-3 py-2 w-fit border border-neutral-content rounded shadow-xl hover:bg-neutral hover:border-neutral hover:cursor-pointer"
      onClick={props.onClick}>
        {label}
    </button>
  )
}

type OpenIssuesBtnProps = { onClick: React.MouseEventHandler<HTMLButtonElement> }

export const OpenIssuesBtn = (props: OpenIssuesBtnProps) => {

  return (
    <button 
      type="button"
      className="text-error font-[play] font-bold uppercase p-3 py-2 w-fit border border-error bg-error/20 rounded shadow-xl hover:bg-neutral hover:border-neutral hover:cursor-pointer"
      onClick={props.onClick}>
        <OpenIssuesBtnLabel />
    </button>
  )
}

export const MapLoading = ({ isLoaded }: { isLoaded: boolean }) => {
  if(isLoaded) return null

  return (
    <div className="absolute inset-0 flex items-center justify-center z-20">
      <Loading />
    </div>
  )
}

const OpenIssuesBtnLabel = () => {
  const { showOpenIssuesOnly } = useContext(SitesCtx)

  if(showOpenIssuesOnly) return (
    <div className="flex gap-4 items-center">
      Show All Sites
      <div className="flex">
        <img src={warningPinIcon} alt="warning pin icon" className="w-5" />
        <img src={errorPinIcon} alt="error pin icon" className="w-5" />
      </div>
    </div>
  )

  return (
    <div className="flex gap-1 items-center">
      Open Issues Only
      <img src={errorPinIcon} alt="error pin icon" className="w-5" />
    </div>
  )
}