import { handleProjectNumber } from './utils'

// Types
import * as AppTypes from '@/context/App/types'

function ProjectNumber({ site }: { site: AppTypes.SiteInterface }) {
  const props = handleProjectNumber(site)
  
  return (
    <div className="flex flex-col gap-1 items-center" title={`COF #${ site.cof }`}>
      <img alt="cof number icon" { ...props.iconProps } />
      <span className={props.spanClassName}>COF #{site.cof}</span>
    </div>
  )
}

export default ProjectNumber