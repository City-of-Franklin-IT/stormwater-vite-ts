import { LogLevel } from "@azure/msal-browser"
import type { AccountInfo } from "@azure/msal-browser"

export const setAuth = () => {
  const auth = {
    clientId: import.meta.env.VITE_CLIENT_ID,
    authority: import.meta.env.VITE_AUTH_AUTHORITY,
    redirectUri: import.meta.env.VITE_AUTH_REDIRECT_URI,
    postLogoutRedirectUri: import.meta.env.VITE_AUTH_POST_LOGOUT_REDIRECT_URI,
    navigateToLoginRequestUrl: true,
    allowRedirectInIframe: true
  }

  return auth
}

const auth = setAuth()

export const msalConfig = {
  auth,
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false
  },
  system: {
    loggerOptions: {
      loggerCallback: (level: LogLevel, message: string, containsPii: boolean) => {
        if(containsPii) {
          return
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message)
            return
          case LogLevel.Verbose:
            console.debug(message)
            return
          case LogLevel.Warning:
            console.warn(message)
            return
          default:
            return
        }
      },
    },
  },
}

export const loginRequest = {
  scopes: ["openid", "profile"],
  redirectUri: auth.redirectUri
}

export const acquireRequest = (account: AccountInfo) => ({
  scopes: [`${ import.meta.env.VITE_ENTRA_CLIENT_ID }/.default`],
  account
})
