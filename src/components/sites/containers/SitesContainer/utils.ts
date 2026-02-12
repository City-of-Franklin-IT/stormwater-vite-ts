// Icons
import pinWarningIcon from "@/assets/icons/pin/warning-pin.svg"
import pinErrorIcon from "@/assets/icons/pin/error-pin.png"
import pinNeutralContentIcon from "@/assets/icons/pin/neutral-content-pin.png"

// Types
import * as AppTypes from "@/context/App/types"

export const setSiteMarker = (site: AppTypes.SiteInterface) => {
  if(site.hasOpenComplaint || site.hasOpenIllicitDischarge || site.hasOpenViolation) { // Site has issue
    return pinErrorIcon
  }

  if(site.InactiveSite) {
    return pinNeutralContentIcon
  }

  return pinWarningIcon
}