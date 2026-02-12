import { useRedirect } from "../Redirect/hooks"

// Components
import Layout from "@/components/layout/Layout"
import LoginForm from "@/components/login/forms/LoginForm"

function Login() {
  useRedirect("/sites")

  return (
    <Layout>
      <div className="flex flex-col my-10 mx-auto bg-neutral-content w-fit h-fit rounded-xl overflow-hidden">
        <LoginForm />
      </div>
    </Layout>
  )
}

export default Login