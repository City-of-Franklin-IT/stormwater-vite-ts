// Types
import * as AppTypes from "@/context/App/types"

// Components
import { Form } from "./components"

function SetSiteForm({ site }: { site: AppTypes.SiteInterface }) {

  return (
    <Form site={site} />
  )
}

export default SetSiteForm