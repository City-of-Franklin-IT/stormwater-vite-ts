// Components
import ErrorBoundary from "@/components/layout/error/ErrorBoundary"
import GetSite from "@/components/enforcement/forms/get/GetSite"

function CreateComplaint() {

  return (
    <ErrorBoundary href={"/enforcement/complaints"}>
      <GetSite />
    </ErrorBoundary>
  )
}

export default CreateComplaint