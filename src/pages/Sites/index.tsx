import { SitesProvider } from "@/components/sites/context"
import { useGetSites } from "./hooks"

// Components
import Layout from "@/components/layout/Layout"
import HandleLoading from "../../utils/HandleLoading"
import SitesContainer from "@/components/sites/containers/SitesContainer"
import ErrorBoundary from "@/components/layout/error/ErrorBoundary"

function Sites() {
  const { data, isSuccess } = useGetSites()

  return (
    <Layout>
      <HandleLoading isSuccess={isSuccess}>
        <ErrorBoundary href={"/"}>
          <SitesProvider>
            <SitesContainer sites={data?.data || []} />
          </SitesProvider>
        </ErrorBoundary>
      </HandleLoading>
    </Layout>
  )
}

export default Sites