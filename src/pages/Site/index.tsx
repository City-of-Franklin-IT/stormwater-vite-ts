import { useGetSite } from "./hooks"
import { SiteProvider } from "@/components/site/context"
import { EnforcementProvider } from "@/components/enforcement/context"

// Types
import * as AppTypes from "@/context/App/types"

// Components
import HandleLoading from "../../utils/HandleLoading"
import SiteContainer from "../../components/site/containers/SiteContainer"
import ErrorBoundary from "../../components/layout/error/ErrorBoundary"

function Site() {
  const { data, isLoading } = useGetSite()
  
  return (
    <HandleLoading isLoading={isLoading}>
      <ErrorBoundary href={"/sites"}>
        <SiteProvider>
          <EnforcementProvider>
            <SiteContainer site={data?.data as AppTypes.SiteInterface} />
          </EnforcementProvider>
        </SiteProvider>
      </ErrorBoundary>
    </HandleLoading>
  )
}

export default Site