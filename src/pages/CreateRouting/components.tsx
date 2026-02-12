import { Routes, Route } from "react-router"

// Components
import CreateContact from "./routes/CreateContact"
import CreateInspector from "./routes/CreateInspector"
import CreateSite from "./routes/CreateSite"
import CreateEnforcementRouting from "./routes/enforcement/CreateEnforcementRouting"

export const Routing = () => {

  return (
    <Routes>
      <Route path={"contact"} element={<CreateContact />} />
      <Route path={"inspector"} element={<CreateInspector />} />
      <Route path={"site"} element={<CreateSite />} />
      <Route path={"enforcement/*"} element={<CreateEnforcementRouting />} />
    </Routes>
  )
}