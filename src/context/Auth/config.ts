import { LogLevel } from "@azure/msal-browser"
import type { AccountInfo } from "@azure/msal-browser"
import { CLIENT_ID, ENTRA_CLIENT_ID, AUTH_AUTHORITY, AUTH_REDIRECT_URI, AUTH_POST_LOGOUT_REDIRECT_URI } from "@/config"

export const setAuth = () => {
  const auth = {
    clientId: CLIENT_ID,
    authority: AUTH_AUTHORITY,
    redirectUri: AUTH_REDIRECT_URI,
    postLogoutRedirectUri: AUTH_POST_LOGOUT_REDIRECT_URI,
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
  scopes: [`${ ENTRA_CLIENT_ID }/.default`],
  account
})
