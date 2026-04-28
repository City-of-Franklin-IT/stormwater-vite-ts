import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { useMsal } from '@azure/msal-react'
import { loginRequest } from '@/context/Auth/config'

interface AuthContextType {
  isAuthenticated: boolean
  token: string | undefined
  isLoading: boolean
  refreshToken: () => Promise<string | undefined>
}

const AuthContext = createContext<AuthContextType | null>(null)

export const MOCK_AUTH = import.meta.env.VITE_MOCK_AUTH === 'true'
const MOCK_TOKEN = 'dev-token-12345'

export function AuthCtxProvider({ children }: { children: ReactNode }) {
  const { instance, inProgress } = useMsal()
  const [token, setToken] = useState<string | undefined>(undefined)

  const isReady = inProgress === 'none'
  const activeAccount = instance.getActiveAccount()

  useEffect(() => {
    if (MOCK_AUTH) {
      setToken(MOCK_TOKEN)
      return
    }

    if (!isReady) return

    if (!activeAccount) {
      setToken(undefined)
    } else {
      setToken(activeAccount.idToken)
    }
  }, [isReady, activeAccount])

  const refreshToken = async (): Promise<string | undefined> => {
    if (MOCK_AUTH) return MOCK_TOKEN
    if (!activeAccount) return undefined
    try {
      const result = await instance.acquireTokenSilent({
        ...loginRequest,
        account: activeAccount,
        forceRefresh: true
      })
      setToken(result.idToken)
      return result.idToken
    } catch {
      setToken(undefined)
      return undefined
    }
  }

  const value: AuthContextType = {
    isAuthenticated: !!token,
    token,
    isLoading: !isReady && !MOCK_AUTH,
    refreshToken
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within AuthCtxProvider')
  }

  return context
}
