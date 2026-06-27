import { SitesProvider } from "@/components/sites/context"
import { useGetSites } from "./hooks"

// Components
import Loading from "@/components/layout/loading/Loading"
import SitesContainer from "@/components/sites/containers/SitesContainer"
import ErrorBoundary from "@/components/layout/error/ErrorBoundary"

function Sites() {
  const { data, isLoading } = useGetSites()

  if(isLoading) return <Loading />

  return (
    <ErrorBoundary href={"/"}>
      <SitesProvider>
        <SitesContainer sites={data?.data || []} />
      </SitesProvider>
    </ErrorBoundary>
  )
}

export default Sites