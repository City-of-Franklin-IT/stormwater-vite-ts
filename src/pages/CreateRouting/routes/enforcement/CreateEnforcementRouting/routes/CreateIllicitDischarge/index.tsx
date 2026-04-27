// Components
import ErrorBoundary from "@/components/layout/error/ErrorBoundary"
import GetSite from "@/components/enforcement/forms/get/GetSite"

function CreateIlllicitDischarge() {
  
  return (
    <ErrorBoundary href={"/enforcement/discharges"}>
      <GetSite />
    </ErrorBoundary>
  )
}

export default CreateIlllicitDischarge
