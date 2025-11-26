import { memo } from "react"
import { useSetTableData } from "@/components/sites/containers/SitesContainer/hooks"
import { useSetTableDataProps, useHandleBtns } from './hooks'
import InspectorCtx from "../../context"
import styles from './InspectorContainer.module.css'

// Types
import * as AppTypes from '@/context/App/types'

// Components
import Search from "@/components/sites/search/Search"
import UpdateInspectorForm from "../../forms/update/UpdateInspectorForm"
import SitesTable from "@/components/sites/tables/SitesTable"
import Motion from "@/utils/Motion"
import { ActiveSitesBtn, OpenIssuesBtn } from "@/components/sites/containers/SitesContainer/components"
import * as Components from './components'

function InspectorContainer({ sites, inspector }: { sites: AppTypes.SiteInterface[], inspector: AppTypes.InspectorInterface }) {
  const tableDataProps = useSetTableDataProps()

  const tableData = useSetTableData({ sites, ...tableDataProps })

  const { onActiveSitesBtnClick, onOpenIssuesBtnClick, showActiveSitesOnly } = useHandleBtns()

  return (
    <Motion animation={'fadeInOut'}>
      <div className="flex flex-col my-10">
        <Components.Header inspector={inspector} />

        <div className="flex justify-between w-full">
          <Search ctx={InspectorCtx} />
          <div className="flex gap-4 mb-6 ml-auto">
            <Components.UpdateInspectorBtn inspector={inspector} />
            <ActiveSitesBtn
              showActiveSitesOnly={showActiveSitesOnly}
              onClick={onActiveSitesBtnClick} />
            <OpenIssuesBtn onClick={onOpenIssuesBtnClick} />
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

            <Components.CalendarAndTable tableData={tableData} />
          </div>
        </div>

        <Components.UpdateForm>
          <UpdateInspectorForm inspector={inspector} />
        </Components.UpdateForm>
      </div>
    </Motion>
  )
}

export default memo(InspectorContainer)