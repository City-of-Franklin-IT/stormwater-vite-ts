import { memo } from 'react'

// Types
import * as AppTypes from '@/context/App/types'

// Components
import SiteContactsTable from '../../tables/SiteContactsTable'
import Motion from '@/utils/Motion'
import * as Components from './components'

function SiteContainer({ site }: { site: AppTypes.SiteInterface }) {

  return (
    <Motion animation={'fadeInOut'}>
      <div className="flex flex-col my-10 gap-10">
        <Components.Header site={site} />
        
        <div className="flex gap-6">
          <div className="flex flex-col gap-10 w-full">
            <div className="flex gap-10 h-fit">
              <Components.Map site={site} />
              <Components.ActivityCalendar site={site} />
            </div>
            <div className="flex gap-10">
              <SiteContactsTable siteContacts={site.SiteContacts || []} />
              <Components.Enforcement site={site} />
            </div>
          </div>
        </div>

        <Components.Form site={site} />
      </div>
    </Motion>
  )
}

export default memo(SiteContainer)