// Components
import Layout from "@/components/layout/Layout"
import ErrorBoundary from "@/components/layout/error/ErrorBoundary"
import GetSite from "@/components/enforcement/forms/get/GetSite"

function CreateComplaint() {

  return (
    <Layout>
      <ErrorBoundary href={"/enforcement/complaints"}>
        <GetSite />
      </ErrorBoundary>
    </Layout>
  )
}

export default CreateComplaint