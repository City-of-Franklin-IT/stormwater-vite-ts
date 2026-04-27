import { Outlet } from "react-router"
import { HeaderProvider } from "../Header/context"
import { useAuthCheck } from "./hooks"

// Components
import Header from "../Header"
import Footer from "../Footer"

function Layout() {
  useAuthCheck()

  return (
    <div className="flex flex-col w-full h-[100%] min-h-screen">
      <HeaderProvider>
        <Header />
      </HeaderProvider>
      <main>
        <div className="flex flex-col m-auto w-[90%] h-full 2xl:w-[80%]">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Layout