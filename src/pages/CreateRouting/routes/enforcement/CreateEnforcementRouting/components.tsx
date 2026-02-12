import { Routes, Route } from "react-router"

// Components
import CreateViolation from "./routes/CreateViolation"
import CreateComplaint from "./routes/CreateComplaint"
import CreateIlllicitDischarge from "./routes/CreateIllicitDischarge"

export const Routing = () => {

  return (
    <Routes>
      <Route path={"violations"} element={<CreateViolation />} />
      <Route path={"complaints"} element={<CreateComplaint />} />
      <Route path={"discharges"} element={<CreateIlllicitDischarge />} />
    </Routes>
  )
}