import { useGetSiteLog } from "./hooks"

// Types
import * as AppTypes from "@/context/App/types"

// Components
import HandleLoading from "@/utils/HandleLoading"
import * as Components from "./components"

function GetSiteLog() {
  const { data, isSuccess } = useGetSiteLog()

  return (
    <HandleLoading isSuccess={isSuccess}>
      <Components.Form siteLog={data?.data as AppTypes.SiteLogInterface} />
    </HandleLoading>
  )
}

export default GetSiteLog