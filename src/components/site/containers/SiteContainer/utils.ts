// Types
import * as AppTypes from '@/context/App/types'

export const setSiteStatusHeader = (site: AppTypes.SiteInterface) => {
  const className = "text-xl font-[play] font-bold italic animate-pulse"

  if(site.InactiveSite) {
    return {
      label: "Inactive Site",
      className: `${ className } text-error`
    }
  }

  if(site.IncompleteSite) {
    return {
      label: "Incomplete Site",
      className: `${ className } text-info`
    }
  }

  return {
    label: "Active Site",
    className: `${ className } text-success`
  }
}