import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import type { ReactNode } from 'react'
import { useMsal } from '@azure/msal-react'
import { acquireRequest, loginRequest } from '@/context/Auth/config'

interface AuthContextType {
  isAuthenticated: boolean
  token: string | undefined
  isLoading: boolean
  refreshToken: (forceRefresh?: boolean) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthCtxProvider = ({ children }: { children: ReactNode }) => {
  const { instance, accounts, inProgress } = useMsal()
  const [token, setToken] = useState<string | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(true)

  const getToken = useCallback(async () => {
    if(import.meta.env.DEV) {
      setToken(import.meta.env.VITE_MOCK_TOKEN)
      setIsLoading(false)
      return
    }

    if(inProgress !== 'none') {
      return
    }

    setIsLoading(true)

    const activeAccount = instance.getActiveAccount()

    if(!activeAccount && accounts.length === 0) {
      setToken(undefined)
      setIsLoading(false)
      return
    }

    if(!activeAccount && accounts.length > 0) {
      instance.setActiveAccount(accounts[0])
      setIsLoading(false)
      return
    }

    if(!activeAccount) {
      setToken(undefined)
      setIsLoading(false)
      return
    }

    try {
      const request = acquireRequest(activeAccount)
      const response = await instance.acquireTokenSilent(request)
      setToken(response.accessToken)
      setIsLoading(false)
    } catch {
      try {
        const request = acquireRequest(activeAccount)
        const response = await instance.acquireTokenPopup(request)
        setToken(response.accessToken)
        setIsLoading(false)
      } catch {
        instance.loginRedirect(loginRequest)
      }
    }
  }, [instance, accounts, inProgress])

  const refreshToken = useCallback(async (forceRefresh = false) => {
    const activeAccount = instance.getActiveAccount()

    if(!activeAccount || import.meta.env.DEV) return

    try {
      const request = { ...acquireRequest(activeAccount), forceRefresh }
      const response = await instance.acquireTokenSilent(request)
      setToken(response.accessToken)
    } catch {
      instance.loginRedirect(loginRequest)
    }
  }, [instance])

  useEffect(() => {
    getToken()
  }, [inProgress, getToken])

  const value: AuthContextType = {
    isAuthenticated: !!token,
    token,
    isLoading,
    refreshToken,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if(!context) {
    throw new Error('useAuth must be used within AuthCtxProvider')
  }

  return context
}
