import { EnforcementProvider } from "@/components/enforcement/context"

// Components
import * as Components from "./components"

function CreateEnforcementRouting() {

  return (
    <EnforcementProvider>
      <Components.Routing />
    </EnforcementProvider>
  )
}

export default CreateEnforcementRouting