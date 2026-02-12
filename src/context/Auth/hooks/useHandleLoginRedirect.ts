import { useMsal } from "@azure/msal-react"
import { loginRequest } from "../config";

export default () => {
  const { instance, inProgress } = useMsal()

  return () => {
    if(inProgress === "none") {
      instance
        .loginRedirect({
          ...loginRequest,
          prompt: "create"
        })
        .catch((error) => console.log(error))
    } else console.log(inProgress)
  }
}