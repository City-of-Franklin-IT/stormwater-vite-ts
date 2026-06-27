import { useGetSite } from "./hooks"
import { SiteProvider } from "@/components/site/context"
import { EnforcementProvider } from "@/components/enforcement/context"

// Types
import type * as AppTypes from "@/context/App/types"

// Components
import Loading from "@/components/layout/loading/Loading"
import SiteContainer from "../../components/site/containers/SiteContainer"
import ErrorBoundary from "../../components/layout/error/ErrorBoundary"

function Site() {
  const { data, isLoading } = useGetSite()

  if(isLoading) return <Loading />
  
  return (
    <ErrorBoundary href={"/sites"}>
      <SiteProvider>
        <EnforcementProvider>
          <SiteContainer site={data?.data as AppTypes.SiteInterface} />
        </EnforcementProvider>
      </SiteProvider>
    </ErrorBoundary>
  )
}

export default Site