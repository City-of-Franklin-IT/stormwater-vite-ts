import { memo } from "react"
import { useHandleSitesContainer } from "./hooks"
import SitesCtx from "../../context"
import styles from "./SitesContainer.module.css"

// Types
import * as AppTypes from "@/context/App/types"

// Components
import Search from "../../search/Search"
import SitesTable from "../../tables/SitesTable"
import SitesActivityCalendar from "../../calendar/SitesActivityCalendar"
import Motion from "@/utils/Motion"
import * as Components from "./components"

function SitesContainer({ sites }: { sites: AppTypes.SiteInterface[] }) {
  const { tableData, activeSitesBtnProps, onOpenIssuesBtnClick } = useHandleSitesContainer(sites)

  return (
    <Motion animation={"fadeInOut"}>
      <div className="flex flex-col my-10">

        <div className="flex justify-between mb-4 w-full">
          <Search ctx={SitesCtx} />
          <div className="flex gap-4 ml-auto">
            <Components.ActiveSitesBtn { ...activeSitesBtnProps } />
            <Components.OpenIssuesBtn onClick={onOpenIssuesBtnClick} />
          </div>
        </div>

        <div className="flex flex-col gap-8 shadow-xl">
          <div className={styles.mapDiv}>
            <div className="flex-1">
              <Components.Map sites={tableData} />
            </div>
            <div className="flex-1 min-h-0 overflow-hidden">
              <SitesTable tableData={tableData} />
            </div>
          </div>

          <div className="flex flex-col p-10 pt-0 border-4 border-secondary/30 border-double rounded shadow-xl">
            <h3 className={styles.header}>Activity</h3>

            <SitesActivityCalendar sites={tableData} />
          </div>
        </div>

      </div>
    </Motion>
  )
}

export default memo(SitesContainer)