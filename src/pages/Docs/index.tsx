import { useGetDocs } from "./hooks"

// Types
import type { CollectionType } from "./utils"

// Components
import Loading from "@/components/layout/loading/Loading"
import ErrorBoundary from "@/components/layout/error/ErrorBoundary"
import * as Components from "./components"

function Documentation() {
  const { data, isLoading } = useGetDocs()
  const collection = data as CollectionType

  if(isLoading) return <Loading />

  return (
    <ErrorBoundary href={"/sites"}>
      <div className="container font-[play] text-primary-content mx-auto mt-4 mb-6 p-6 max-w-5xl">
        <h1 className="text-3xl font-bold mb-2">{collection?.info.name} API</h1>
        <p className="italic mb-6 max-w-3/4">{collection?.info.description}</p>

        <Components.EndpointItems collection={collection} />
        <Components.CloseDocsBtn />
      </div>
    </ErrorBoundary>
  )
}

export default Documentation
