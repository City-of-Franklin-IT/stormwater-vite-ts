import { EnforcementProvider } from "@/components/enforcement/context"
import { useGetDischarges } from "./hooks"

// Components
import HandleLoading from "../../../utils/HandleLoading"
import DischargesContainer from "../../../components/enforcement/containers/DischargesContainer"
import ErrorBoundary from "../../../components/layout/error/ErrorBoundary"

function Discharges() {
  const { data, isLoading } = useGetDischarges()

  return (
    <HandleLoading isLoading={isLoading}>
      <ErrorBoundary href={"/sites"}>
        <EnforcementProvider>
          <DischargesContainer discharges={data?.data || []} />
        </EnforcementProvider>
      </ErrorBoundary>
    </HandleLoading>
  )
}

export default Discharges