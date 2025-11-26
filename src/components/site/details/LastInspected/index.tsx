import { handleLastInspected } from './utils'

// Types
import * as AppTypes from '@/context/App/types'

function LastInspected({ site }: { site: AppTypes.SiteInterface }) {
  const props = handleLastInspected(site)
  
  return (
    <div className="flex flex-col gap-1 items-center" title={`Last Inspected: ${ props?.lastInspectionDate }`}>
      <img alt="inspection icon" { ...props?.iconProps } />
      <span className="whitespace-nowrap">{props?.lastInspectionDate}</span>
    </div>
  )
}

export default LastInspected