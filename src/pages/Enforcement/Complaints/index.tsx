import { EnforcementProvider } from "@/components/enforcement/context"
import { useGetComplaints } from "./hooks"

// Components
import Loading from "@/components/layout/loading/Loading"
import ComplaintsContainer from "../../../components/enforcement/containers/ComplaintsContainer"
import ErrorBoundary from "../../../components/layout/error/ErrorBoundary"

function Complaints() {
  const { data, isLoading } = useGetComplaints() 

  if(isLoading) return <Loading />

  return (
    <ErrorBoundary href={"/sites"}>
      <EnforcementProvider>
        <ComplaintsContainer complaints={data?.data || []} />
      </EnforcementProvider>
    </ErrorBoundary>
  )
}

export default Complaints