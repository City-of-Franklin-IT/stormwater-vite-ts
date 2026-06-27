import { EnforcementProvider } from "@/components/enforcement/context"
import { useGetDischarges } from "./hooks"

// Components
import Loading from "@/components/layout/loading/Loading"
import DischargesContainer from "../../../components/enforcement/containers/DischargesContainer"
import ErrorBoundary from "../../../components/layout/error/ErrorBoundary"

function Discharges() {
  const { data, isLoading } = useGetDischarges()

  if(isLoading) return <Loading />

  return (
    <ErrorBoundary href={"/sites"}>
      <EnforcementProvider>
        <DischargesContainer discharges={data?.data || []} />
      </EnforcementProvider>
    </ErrorBoundary>
  )
}

export default Discharges