import icon from "@/assets/icons/inspection/inspection.svg"

// Types
import * as AppTypes from "@/context/App/types"

export const handleLastInspected = (site: AppTypes.SiteInterface) => {
  const logs = site.Logs

  if(!logs?.length) return {}

  const lastInspectionDate = logs.reduce((latest, log) =>
    log.inspectionDate > latest ? log.inspectionDate : latest,
    logs[0].inspectionDate
  )

  const iconClassName = `w-10 ${ !lastInspectionDate ? "opacity-40" : null }`

  return { lastInspectionDate, iconProps: { src: icon, className: iconClassName } }
}