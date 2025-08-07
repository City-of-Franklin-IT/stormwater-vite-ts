import { useHandleSiteSelection } from './hooks'

// Components
import * as Components from './components'

function GetSite() {
  const { selectionMade, onSelect, onNoSiteSelect } = useHandleSiteSelection()

  return (
    <div className="flex flex-col gap-6 text-neutral-content font-[play] mt-10">
      <Components.SiteSelect 
        onSelect={onSelect}
        onNoSiteSelect={onNoSiteSelect} />
      <Components.Form visible={selectionMade} />
    </div>
  )
}

export default GetSite