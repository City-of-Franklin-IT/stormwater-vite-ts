// Icons
import pinWarningIcon from "@/assets/icons/pin/warning-pin.png"
import pinErrorIcon from "@/assets/icons/pin/error-pin.png"
import pinNeutralContentIcon from "@/assets/icons/pin/neutral-content-pin.png"
import pinInfoIcon from "@/assets/icons/pin/info-pin.png"

// Types
import type * as AppTypes from "@/context/App/types"

export const setSiteMarker = (site: AppTypes.SiteInterface) => {
  if(site.hasOpenComplaint || site.hasOpenIllicitDischarge || site.hasOpenViolation) { // Site has issue
    return sitesContainerIcons["pin-error"]
  }

  if(site.InactiveSite) {
    return sitesContainerIcons["pin-neutral-content"]
  }

  if(site.IncompleteSite) {
    return sitesContainerIcons["pin-info"]
  }

  return sitesContainerIcons["pin-warning"]
}

type SitesContainerIcons = 
  | 'pin-error' 
  | 'pin-neutral-content' 
  | 'pin-info' 
  | 'pin-warning'

export const sitesContainerIcons: Record<SitesContainerIcons, string> = {
  'pin-error': pinErrorIcon,
  'pin-neutral-content': pinNeutralContentIcon,
  'pin-info': pinInfoIcon,
  'pin-warning': pinWarningIcon
}