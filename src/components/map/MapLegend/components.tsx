// Icons
import warningPinIcon from '../../../assets/icons/pin/warning-pin.png'
import errorPinIcon from '../../../assets/icons/pin/error-pin.png'
import neutralContentPinIcon from '../../../assets/icons/pin/neutral-content-pin.png'

// Types
import * as AppTypes from '@/context/App/types'

export const LegendItems = ({ sites }: { sites: AppTypes.SiteInterface[] }) => {

  return (
    <div className="flex gap-6 text-neutral-content font-[play] font-bold p-3 py-2 bg-neutral/30 border w-fit rounded-lg">
      <LegendItem src={warningPinIcon}>
        <small>Active Site</small>
        <small>({sites.filter(site => !site.InactiveSite).length})</small>
      </LegendItem>
      <LegendItem src={errorPinIcon}>
        <small>Open Issue</small>
        <small>({sites.filter(site => site.hasOpenViolation || site.hasOpenComplaint || site.hasOpenIllicitDischarge).length})</small>
      </LegendItem>
      <LegendItem src={neutralContentPinIcon}>
        <small>Inactive Site</small>
        <small>({sites.filter(site => site.InactiveSite).length})</small>
      </LegendItem>
    </div>
  )
}

type LegendItemProps = { src: string, children: React.ReactNode }

const LegendItem = (props: LegendItemProps) => {

  return (
    <div className="flex flex-col gap-1 items-center">
      <img src={props.src} alt="map legend icon" className="w-6" />
      <div className="flex flex-col items-center">
        {props.children}
      </div>
    </div>
  )
}