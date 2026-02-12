import { memo } from "react"
import { useSetTableData } from "./hooks"

// Types
import * as AppTypes from "@/context/App/types"

// Components
import * as Components from "./components"

function SiteIssuesTable({ site }: { site: AppTypes.SiteInterface }) {
  const tableData = useSetTableData(site)

  return (
    <Components.Table tableData={tableData} />
  )
}

export default memo(SiteIssuesTable)