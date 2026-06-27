import { useGetInspector } from "./hooks"

// Types
import type * as AppTypes from "@/context/App/types"

// Components
import Loading from "@/components/layout/loading/Loading"
import ErrorBoundary from "../../components/layout/error/ErrorBoundary"
import { InspectorProvider } from "@/components/inspectors/context"
import InspectorContainer from "../../components/inspectors/containers/InspectorContainer"

function Inspector() {
  const { data, isLoading } = useGetInspector()

  if(isLoading) return <Loading />

  return (
    <ErrorBoundary href={"/sites"}>
      <InspectorProvider>
        <InspectorContainer 
          sites={data?.data.sites || []}
          inspector={data?.data.inspector as AppTypes.InspectorInterface} />
      </InspectorProvider>
    </ErrorBoundary>
  )
}

export default Inspector