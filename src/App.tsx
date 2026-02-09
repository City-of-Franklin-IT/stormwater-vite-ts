import { BrowserRouter as Router, Route, Routes } from "react-router"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { ToastContainer } from "react-toastify"
import { APP_BASE } from "./config"
import 'react-toastify/dist/ReactToastify.css'

// Components
import Login from "./pages/Login"
import Sites from "./pages/Sites"
import Site from "./pages/Site"
import CreateRouting from "./pages/CreateRouting"
import Inspector from "./pages/Inspector"
import Violations from "./pages/Enforcement/Violations"
import Complaints from "./pages/Enforcement/Complaints"
import Discharges from "./pages/Enforcement/Discharges"
import Contacts from "./pages/Contacts"
import Redirect from "./pages/Redirect"
import Docs from "./pages/Docs"

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router basename={APP_BASE}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/sites" element={<Sites />} />
          <Route path="/site/:uuid" element={<Site />} />
          <Route path="/create/*" element={<CreateRouting />} />
          <Route path="/inspectors/:slug" element={<Inspector />} />
          <Route path="/enforcement/violations" element={<Violations />} />
          <Route path="/enforcement/complaints" element={<Complaints />} />
          <Route path="/enforcement/discharges" element={<Discharges />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/*" element={<Redirect />} />
        </Routes>
      </Router>
      <ToastContainer />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App