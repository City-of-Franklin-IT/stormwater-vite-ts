import { useRedirectAuthenticated } from './hooks'

// Components
import LoginForm from "@/components/login/forms/LoginForm"

function Login() {
  useRedirectAuthenticated('/sites')

  return (
    <div className="flex flex-col my-10 mx-auto bg-neutral-content w-fit h-fit rounded-xl overflow-hidden">
      <LoginForm />
    </div>
  )
}

export default Login
