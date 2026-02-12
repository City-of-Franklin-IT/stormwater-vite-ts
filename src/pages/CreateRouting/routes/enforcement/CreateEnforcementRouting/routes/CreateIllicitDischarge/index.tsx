// Components
import Layout from "@/components/layout/Layout"
import ErrorBoundary from "@/components/layout/error/ErrorBoundary"
import GetSite from "@/components/enforcement/forms/get/GetSite"

function CreateIlllicitDischarge() {
  
  return (
    <Layout>
      <ErrorBoundary href={"/enforcement/discharges"}>
        <GetSite />
      </ErrorBoundary>
    </Layout>
  )
}

export default CreateIlllicitDischarge
