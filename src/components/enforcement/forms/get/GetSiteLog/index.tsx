import { useGetSiteLog } from "./hooks"

// Types
import * as AppTypes from "@/context/App/types"

// Components
import HandleLoading from "@/utils/HandleLoading"
import * as Components from "./components"

function GetSiteLog() {
  const { data, isLoading } = useGetSiteLog()

  return (
    <HandleLoading isLoading={isLoading}>
      <Components.Form siteLog={data?.data as AppTypes.SiteLogInterface} />
    </HandleLoading>
  )
}

export default GetSiteLog