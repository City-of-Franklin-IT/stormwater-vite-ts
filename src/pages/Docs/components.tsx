import { Link } from "react-router"
import { docColorsMap } from "./utils"
import { useHandleEndpointItem } from "./hooks"

// Types
import { MethodsType, RequestItemType, CollectionType } from "./utils"

export const EndpointItems = ({ collection }: { collection: CollectionType }) => {

  return (
    <div className="space-y-4">
      {collection.item.map((category, idx) => (
        <EndpointItem key={idx} item={category} />
      ))}
    </div>
  )
}

export const MethodBadge = ({ method }: { method: MethodsType }) => {

  return (
    <span className={`badge ${ docColorsMap.get(method)! || "badge-ghost" } badge-sm font-mono`}>{method}</span>
  )
}

export const CloseDocsBtn = () => {

  return (
    <Link to={"/sites"} className="btn btn-primary w-full">
      Close API Documentation
    </Link>
  )
}

const EndpointItem = ({ item }: { item: RequestItemType }) => {
  const inputProps = useHandleEndpointItem()

  if(item.item) {
    return (
      <div className="collapse collapse-arrow bg-neutral/40 px-4 py-2 mb-2">
        <input type="checkbox" { ...inputProps } />
        <div className="text-neutral-content collapse-title font-semibold capitalize">{item.name}</div>
        <div className="collapse-content">
          {item.item.map((subItem, index) => (
            <EndpointItem key={index} item={subItem} />
          ))}
        </div>
      </div>
    )
  }

  if(!item.request) return null

  return (
    <div className="card bg-neutral shadow-sm mb-2">
      <div className="card-body p-4">
        <div className="flex items-center gap-3">
          <MethodBadge method={item.request.method as MethodsType} />
          <span className="font-medium">{item.name}</span>
        </div>
        <code className="text-sm p-2 rounded mt-2 block overflow-x-auto">
          {item.request.url.raw.replace("{{URL}}", "https://dev.franklintn.gov")}
        </code>
        <RequestDescription description={item.request?.description} />
        <RequestBody body={item.request.body?.raw} />
      </div>
    </div>
  )
}

const RequestDescription = ({ description }: { description: string | undefined }) => {
  if(!description) return null

  return (
    <p className="text-sm text-warning opacity-70 mt-2">{description}</p>
  )
}

const RequestBody = ({ body }: { body: string | undefined }) => {
  if(!body) return null

  return (
    <div className="mt-3">
      <span className="text-xs font-semibold uppercase opacity-50">Request Body</span>
      <pre className="text-sm bg-warning/10 p-3 rounded mt-1 overflow-x-auto">
        <code>{JSON.stringify(JSON.parse(body), null, 2)}</code>
      </pre>
    </div>
  )
}
