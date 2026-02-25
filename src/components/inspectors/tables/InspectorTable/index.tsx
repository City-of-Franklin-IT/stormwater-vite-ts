import styles from "./InspectorTable.module.css"
import { useSetInspectorTableData, useScrollToFormRef, useHandleActiveSitesBtn } from "./hooks"

// Types
import * as AppTypes from "@/context/App/types"

// Components
import InspectorTableYearBtns from "../../buttons/InspectorTableYearBtns"
import { ActiveSitesBtn } from "@/components/sites/containers/SitesContainer/components"
import * as Components from "./components"

function InspectorTable({ sites }: { sites: AppTypes.SiteInterface[] }) {
  const tableData = useSetInspectorTableData(sites)

  const { tableRef, formRef } = useScrollToFormRef()

  const btnProps = useHandleActiveSitesBtn()

  return (
    <div ref={tableRef} className={styles.container}>
      <div className="relative flex justify-between items-center w-full min-h-10">
        <Components.CreateLogBtn />
        <div className="absolute left-0 -bottom-1">
          <ActiveSitesBtn { ...btnProps } />
        </div>
        <div className="absolute right-0 -bottom-1">
          <InspectorTableYearBtns />
        </div>
      </div>
      <Components.Table tableData={tableData} />
      <Components.Form formRef={formRef} />
    </div>
  )
}

export default InspectorTable