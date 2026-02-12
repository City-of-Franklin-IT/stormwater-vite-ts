import icon from "@/assets/icons/violation/violation.svg"

// Types
import * as AppTypes from "@/context/App/types"

// Components
import * as Components from "./components"

function SiteViolationsIndicator({ violations }: { violations: AppTypes.ConstructionViolationInterface[] }) {

  return (
    <div className="indicator bg-neutral text-neutral-content p-6 shadow-xl">
      <Components.Stats issues={violations} />
      <div className="flex flex-col items-center text-center h-fit w-40">
        <img src={icon} alt="violation icon" className="w-20" />
        Violations
      </div>
    </div>
  )
}

export default SiteViolationsIndicator