import Layout from "@/components/layout/Layout"
import { useGetDocs } from "./hooks"

// Types
import { CollectionType } from "./utils"

// Components
import HandleLoading from "@/utils/HandleLoading"
import ErrorBoundary from "@/components/layout/error/ErrorBoundary"
import * as Components from "./components"

function Documentation() {
  const { data, isSuccess } = useGetDocs()
  const collection = data as CollectionType

  return (
    <Layout>
      <ErrorBoundary href={"/sites"}>
        <HandleLoading isSuccess={isSuccess}>
          <div className="container font-[play] text-primary-content mx-auto mt-4 mb-6 p-6 max-w-5xl">
            <h1 className="text-3xl font-bold mb-2">{collection?.info.name} API</h1>
            <p className="italic mb-6 max-w-3/4">{collection?.info.description}</p>

            <Components.EndpointItems collection={collection} />
            <Components.CloseDocsBtn />
          </div>
        </HandleLoading>
      </ErrorBoundary>
    </Layout>
  )
}

export default Documentation
