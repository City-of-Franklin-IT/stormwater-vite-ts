import { useMsal } from "@azure/msal-react"

export default () => {
  const { instance, accounts } = useMsal()

  return () => {
    instance
      .logoutPopup({
        account: accounts[0],
        postLogoutRedirectUri: "/"
      })
  }
}