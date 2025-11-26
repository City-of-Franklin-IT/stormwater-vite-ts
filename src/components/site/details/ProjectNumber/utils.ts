import icon from '@/assets/icons/project/project.svg'

// Types
import * as AppTypes from '@/context/App/types'

export const handleProjectNumber = (site: AppTypes.SiteInterface) => {
  const hasProjectNumber = !!site.cof
  const className = `w-10 ${ !hasProjectNumber ? 'opacity-40' : null }`
  const spanClassName = !site.cof ? 'hidden' : 'font-[play] whitespace-nowrap'

  return { iconProps: { src: icon, className }, spanClassName }
}