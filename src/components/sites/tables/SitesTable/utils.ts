import styles from "./SitesTable.module.css"

// Types
import * as AppTypes from "@/context/App/types"

export const setTableDataStyle = (index: number, site: AppTypes.SiteInterface): string | undefined => { // Set row style by index and whether the site has any open violations
  const hasOpenIssue = site.hasOpenViolation || site.hasOpenComplaint || site.hasOpenIllicitDischarge

  if(hasOpenIssue) {
    return styles.openViolationRow
  }

  return index % 2 === 0 ? styles.evenRow : undefined
}