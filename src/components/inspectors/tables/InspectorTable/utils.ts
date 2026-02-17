// Types
import { InspectorTableData } from "./hooks"

export const setSiteNameLabel = (row: InspectorTableData) => {
  let className
  let label

  if(row.inactiveAt) {
    className = "text-neutral-content"
    label = `${ row.site } - Inactive`
  }

  if(row.incompleteAt) {
    className = "text-info"
    label =`${ row.site } - Incomplete`
  }

  if(!className) {
    className = "text-warning"
    label = `${ row.site }`
  }

  return { className, label }
}