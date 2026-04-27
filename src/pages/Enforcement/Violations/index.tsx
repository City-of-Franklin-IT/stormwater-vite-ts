import { EnforcementProvider } from "@/components/enforcement/context"
import { useGetViolations } from "./hooks"

// Components
import HandleLoading from "../../../utils/HandleLoading"
import ViolationsContainer from "../../../components/enforcement/containers/ViolationsContainer"
import ErrorBoundary from "../../../components/layout/error/ErrorBoundary"

function Violations() {
  const { data, isLoading } = useGetViolations()

  return (
    <HandleLoading isLoading={isLoading}>
      <ErrorBoundary href={"/sites"}>
        <EnforcementProvider>
          <ViolationsContainer violations={data?.data || []} />
        </EnforcementProvider>
      </ErrorBoundary>
    </HandleLoading>
  )
}

export default Violations