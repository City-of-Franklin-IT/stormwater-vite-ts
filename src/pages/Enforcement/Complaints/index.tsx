import { EnforcementProvider } from "@/components/enforcement/context"
import { useGetComplaints } from "./hooks"

// Components
import Layout from "../../../components/layout/Layout"
import HandleLoading from "../../../utils/HandleLoading"
import ComplaintsContainer from "../../../components/enforcement/containers/ComplaintsContainer"
import ErrorBoundary from "../../../components/layout/error/ErrorBoundary"

function Complaints() {
  const { data, isSuccess } = useGetComplaints() 

  return (
    <Layout>
      <HandleLoading isSuccess={isSuccess}>
        <ErrorBoundary href={"/sites"}>
          <EnforcementProvider>
            <ComplaintsContainer complaints={data?.data || []} />
          </EnforcementProvider>
        </ErrorBoundary>
      </HandleLoading>
    </Layout>
  )
}

export default Complaints