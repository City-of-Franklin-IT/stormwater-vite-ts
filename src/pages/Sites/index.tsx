import { SitesProvider } from "@/components/sites/context"
import { useGetSites } from "./hooks"

// Components
import HandleLoading from "../../utils/HandleLoading"
import SitesContainer from "@/components/sites/containers/SitesContainer"
import ErrorBoundary from "@/components/layout/error/ErrorBoundary"

function Sites() {
  const { data, isLoading } = useGetSites()

  return (
    <HandleLoading isLoading={isLoading}>
      <ErrorBoundary href={"/"}>
        <SitesProvider>
          <SitesContainer sites={data?.data || []} />
        </SitesProvider>
      </ErrorBoundary>
    </HandleLoading>
  )
}

export default Sites