import { useGetSiteLog } from "./hooks"

// Types
import type * as AppTypes from "@/context/App/types"

// Components
import Loading from "@/components/layout/loading/Loading"
import * as Components from "./components"

function GetSiteLog() {
  const { data, isLoading } = useGetSiteLog()

  if(isLoading) return <Loading />

  return (
    <Components.Form siteLog={data?.data as AppTypes.SiteLogInterface} />
  )
}

export default GetSiteLog