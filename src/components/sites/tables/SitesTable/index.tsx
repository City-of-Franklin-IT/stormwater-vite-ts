import { memo } from "react"
import styles from "./SitesTable.module.css"

// Types
import type * as AppTypes from "@/context/App/types"

// Components
import * as Components from "./components"

function SitesTable({ tableData }: { tableData: AppTypes.SiteInterface[] }) {

  return (
    <div className={styles.container}>
      <Components.Table tableData={tableData} />
      <Components.NoSites tableData={tableData} />
    </div>
  )
}

export default memo(SitesTable)