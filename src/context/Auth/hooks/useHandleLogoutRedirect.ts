import { useMsal } from "@azure/msal-react"
import { AUTH_POST_LOGOUT_REDIRECT_URI } from "@/config"

export default () => {
  const { instance, accounts } = useMsal()

  return () => {
    instance
      .logoutPopup({
        account: accounts[0],
        postLogoutRedirectUri: AUTH_POST_LOGOUT_REDIRECT_URI
      })
  }
}