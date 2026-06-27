import { EnforcementProvider } from "@/components/enforcement/context"
import { useGetViolations } from "./hooks"

// Components
import Loading from "@/components/layout/loading/Loading"
import ViolationsContainer from "../../../components/enforcement/containers/ViolationsContainer"
import ErrorBoundary from "../../../components/layout/error/ErrorBoundary"

function Violations() {
  const { data, isLoading } = useGetViolations()

  if(isLoading) return <Loading />

  return (
    <ErrorBoundary href={"/sites"}>
      <EnforcementProvider>
        <ViolationsContainer violations={data?.data || []} />
      </EnforcementProvider>
    </ErrorBoundary>
  )
}

export default Violations