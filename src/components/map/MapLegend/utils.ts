import warningPinIcon from "../../../assets/icons/pin/warning-pin.png"
import errorPinIcon from "../../../assets/icons/pin/error-pin.png"
import neutralContentPinIcon from "../../../assets/icons/pin/neutral-content-pin.png"
import infoPinIcon from "../../../assets/icons/pin/info-pin.svg"

// Types
import * as AppTypes from '@/context/App/types'

export const handleLegendItems = (sites: AppTypes.SiteInterface[]) => {
  const activeSitesCount = sites.filter(site => !site.InactiveSite && !site.IncompleteSite).length

  const activeSitesProps = {
    src: legendItemIconSrcMap.get("Active Site")!,
    visible: activeSitesCount > 0,
    label: `(${ activeSitesCount })`
  }

  const openIssuesCount = sites.filter(site => site.hasOpenViolation || site.hasOpenComplaint || site.hasOpenIllicitDischarge).length

  const openIssuesProps = {
    src: legendItemIconSrcMap.get("Open Issue")!,
    visible: openIssuesCount > 0,
    label: `(${ openIssuesCount })`
  }

  const inactiveCount = sites.filter(site => site.InactiveSite).length

  const inactiveProps = {
    src: legendItemIconSrcMap.get("Inactive Site")!,
    visible: inactiveCount > 0,
    label: `(${ inactiveCount })`
  }

  const incompleteCount = sites.filter(site => site.IncompleteSite).length

  const incompleteProps = {
    src: legendItemIconSrcMap.get("Incomplete Site")!,
    visible: incompleteCount > 0,
    label: `(${ incompleteCount })`
  }

  return { activeSitesProps, openIssuesProps, inactiveProps, incompleteProps }
}

type LegendType =
  | "Active Site"
  | "Open Issue"
  | "Inactive Site"
  | "Incomplete Site"

const legendItemIconSrcMap = new Map<LegendType, string>([
  ["Active Site", warningPinIcon],
  ["Open Issue", errorPinIcon],
  ["Inactive Site", neutralContentPinIcon],
  ["Incomplete Site", infoPinIcon]
])