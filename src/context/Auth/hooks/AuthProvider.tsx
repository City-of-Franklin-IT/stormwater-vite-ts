import { useEffect, useRef, useState } from "react"
import { PublicClientApplication, EventType } from "@azure/msal-browser"
import type { AuthenticationResult } from "@azure/msal-browser"
import { MsalProvider } from "@azure/msal-react"
import { msalConfig } from "../config"

// Components
import Loading from "@/components/layout/loading/Loading"

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [msalInstance, setMsalInstance] = useState<PublicClientApplication | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)
  const hasInitializedRef = useRef(false)

  useEffect(() => {
    if(hasInitializedRef.current) return
    hasInitializedRef.current = true

    const initializeMsal = async () => {
      const instance = new PublicClientApplication(msalConfig)

      await instance.initialize()

      const accounts = instance.getAllAccounts()

      if(!instance.getActiveAccount() && accounts.length > 0) {
        instance.setActiveAccount(accounts[0])
      }

      instance.addEventCallback((event) => {
        const authenticationResult = event.payload as AuthenticationResult
        const account = authenticationResult?.account

        if(event.eventType === EventType.LOGIN_SUCCESS && account) {
          instance.setActiveAccount(account)
        }
      })

      setMsalInstance(instance)
      setIsInitialized(true)
    }

    initializeMsal()
  }, [])

  if(!isInitialized || !msalInstance) {
    return <Loading />
  }

  return <MsalProvider instance={msalInstance}>
    {children}
  </MsalProvider>
}
