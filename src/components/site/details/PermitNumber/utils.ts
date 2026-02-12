import icon from "@/assets/icons/permit/permit.svg"

// Types
import * as AppTypes from "@/context/App/types"

export const handlePermitNumber = (site: AppTypes.SiteInterface) => {
  const hasPermit = !!site.permit
  const iconClassName = `w-10 ${ !hasPermit ? "opacity-40" : null }`

  return { iconProps: { className: iconClassName, src: icon } }
}