import { useRef } from 'react'
import { Link } from 'react-router'
import inspectorIcon from '@/assets/icons/inspector/inspector.svg'
import { useScrollToFormRef } from '@/components/enforcement/containers/ViolationsContainer/hooks'
import { useHandleForm, useHandleButtons, useHandleSiteIssuesCheckbox, useSetSiteMapView } from './hooks'

// Types
import * as AppTypes from '@/context/App/types'

// Components
import SetSiteForm from "../../forms/SetSiteForm"
import BackToHomeBtn from "@/components/layout/nav/buttons/BackToHomeBtn"
import UpdateBtn from "@/components/form-elements/buttons/UpdateBtn"
import ViolationsIndicator from '@/components/enforcement/indicators/ViolationsIndicator'
import ComplaintsIndicator from '@/components/enforcement/indicators/ComplaintsIndicator'
import IllicitDischargesIndicator from '@/components/enforcement/indicators/llicitDischargesIndicator'
import SiteDetails from '../../details/SiteDetails'
import SitesActivityCalendar from '@/components/sites/calendar/SitesActivityCalendar'
import DateRangeFilter from '../../filters/DateRangeFilter'
import SiteIssuesTable from '../../tables/SiteIssuesTable'

export const Header = ({ site }: { site: AppTypes.SiteInterface }) => {
  const label = !site.InactiveSite ? 'Active Site' : 'Inactive Site'

  return (
    <div className="flex gap-20 justify-between items-end">
      <div className="flex-1">
        <Buttons site={site} />
      </div>
      <div className="flex-2 flex flex-col gap-2 items-end text-neutral-content text-end">
        <div className="flex flex-col">
          <h2 className="font-[shrikhand] text-4xl">{site.name}</h2>

          <span className={`text-xl font-[play] font-bold italic ${ !site.InactiveSite ? 'text-success animate-pulse' : 'text-error font-normal' }`}>{label}</span>
        </div>
        <InspectorBtn inspector={site.Inspector} />
      </div>
    </div>
  )
}

export const ActivityCalendar = ({ site }: { site: AppTypes.SiteInterface }) => {

  return (
    <div className="flex-2 flex flex-col p-10 pt-0 border-4 border-secondary/30 border-double rounded">
      <h3 className="text-neutral-content font-[shrikhand] text-4xl py-8 text-center">Activity</h3>

      <SitesActivityCalendar sites={[site]} />
    </div>
  )
}

export const Enforcement = ({ site }: { site: AppTypes.SiteInterface }) => {

  return (
    <div className="flex-2 flex flex-col gap-20 items-center p-8 bg-neutral/20 shadow-xl rounded-xl">
      <h3 className="text-neutral-content font-[shrikhand] text-4xl py-8 text-center">Issues</h3>
      <EnforcementIndicators site={site} />
      <div className="flex flex-col gap-10 items-center w-full">
        <DateRangeFilter />
        <SiteIssuesCheckbox />
        <SiteIssuesTable site={site} />
      </div>
    </div>
  )
}

export const Form = ({ site }: { site: AppTypes.SiteInterface }) => { // Update site form
  const { formRef, visible } = useHandleForm()

  useScrollToFormRef({ formRef, activeForm: visible })

  if(!visible) return null

  return (
    <div ref={formRef} className="m-auto w-fit min-w-3/4">
      <SetSiteForm site={site} />
    </div>
  )
}

export const Buttons = ({ site }: { site: AppTypes.SiteInterface }) => {
  const { onClick, visible } = useHandleButtons(site.uuid)

  if(!visible) return

  return (
    <div className="flex flex-col gap-4">
      <BackToHomeBtn />
      <UpdateBtn onClick={onClick}>
        Update Site
      </UpdateBtn>
    </div>
  )
}

export const Map = ({ site }: { site: AppTypes.SiteInterface }) => {
  const mapRef = useRef<HTMLDivElement>(null)

  useSetSiteMapView(mapRef, site)

  return (
    <div className="flex-1 flex w-full h-full overflow-hidden rounded-xl shadow-xl touch-none">
      <div ref={mapRef} className="relative w-full h-full">
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
          <SiteDetails site={site} />
        </div>
      </div>
    </div>
  )
}

export const InspectorBtn = ({ inspector }: { inspector: AppTypes.InspectorInterface | undefined }) => { // Inspector name
  if(!inspector) return null

  return (
    <Link to={`/inspectors/${ inspector.slug }`} className="flex items-center gap-2 font-[play] font-xl uppercase p-6 py-4 bg-neutral/10 hover:bg-neutral/30">
      <img src={inspectorIcon} alt="inspector icon" className="w-12" />
      {inspector.name}
    </Link>
  )
}

export const SiteIssuesCheckbox = () => {
  const inputProps = useHandleSiteIssuesCheckbox()

  return (
    <div className="flex gap-2 items-center text-neutral-content font-[play] uppercase mr-auto w-fit">
      <label>Show Closed:</label>
      <input 
        type="checkbox"
        className="checkbox checkbox-secondary"
        { ...inputProps } />
    </div>
  )
}

const EnforcementIndicators = ({ site }: { site: AppTypes.SiteInterface }) => {

  return (
    <div className="flex gap-20 justify-around flex-wrap">
      <ViolationsIndicator violations={site.ConstructionViolations || []} />
      <ComplaintsIndicator complaints={site.Complaints || []} />
      <IllicitDischargesIndicator discharges={site.IllicitDischarges || []} />
    </div>
  )
}