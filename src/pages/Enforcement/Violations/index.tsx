import { EnforcementProvider } from "@/components/enforcement/context"
import { useGetViolations } from "./hooks"

// Components
import Layout from "../../../components/layout/Layout"
import HandleLoading from "../../../utils/HandleLoading"
import ViolationsContainer from "../../../components/enforcement/containers/ViolationsContainer"
import ErrorBoundary from "../../../components/layout/error/ErrorBoundary"

function Violations() {
  const { data, isSuccess } = useGetViolations()

  return (
    <Layout>
      <HandleLoading isSuccess={isSuccess}>
        <ErrorBoundary href={"/sites"}>
          <EnforcementProvider>
            <ViolationsContainer violations={data?.data || []} />
          </EnforcementProvider>
        </ErrorBoundary>
      </HandleLoading>
    </Layout>
  )
}

export default Violations