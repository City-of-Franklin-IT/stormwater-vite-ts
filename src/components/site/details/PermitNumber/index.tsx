import { handlePermitNumber } from "./utils"

// Types
import * as AppTypes from "@/context/App/types"

function PermitNumber({ site }: { site: AppTypes.SiteInterface }) {
  const { iconProps } = handlePermitNumber(site)
  
  return (
    <div className="flex flex-col gap-1 items-center" title={`Permit: ${ site.permit }`}>
      <img alt="permit icon" { ...iconProps } />
      <span className="whitespace-nowrap">{site.permit}</span>
    </div>
  )
}

export default PermitNumber