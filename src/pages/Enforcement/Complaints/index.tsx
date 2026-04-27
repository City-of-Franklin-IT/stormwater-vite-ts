import { EnforcementProvider } from "@/components/enforcement/context"
import { useGetComplaints } from "./hooks"

// Components
import HandleLoading from "../../../utils/HandleLoading"
import ComplaintsContainer from "../../../components/enforcement/containers/ComplaintsContainer"
import ErrorBoundary from "../../../components/layout/error/ErrorBoundary"

function Complaints() {
  const { data, isLoading } = useGetComplaints() 

  return (
    <HandleLoading isLoading={isLoading}>
      <ErrorBoundary href={"/sites"}>
        <EnforcementProvider>
          <ComplaintsContainer complaints={data?.data || []} />
        </EnforcementProvider>
      </ErrorBoundary>
    </HandleLoading>
  )
}

export default Complaints