import { BrowserRouter as Router, Route, Routes } from "react-router"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { ToastContainer } from "react-toastify"
import { AuthCtxProvider } from "./context/Auth"
import "react-toastify/dist/ReactToastify.css"
import { useHandleVisibilityChange } from "./helpers/hooks"

// Components
import Layout from "./components/layout/Layout"
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

function AppContent() {
  useHandleVisibilityChange(queryClient)

  return (
    <Router basename={import.meta.env.VITE_APP_BASE}>
      <Routes>
        <Route element={<Layout />}>
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
        </Route>
        <Route path="/*" element={<Redirect />} />
      </Routes>
    </Router>
  )
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthCtxProvider>
        <AppContent />
        <ToastContainer />
      </AuthCtxProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
