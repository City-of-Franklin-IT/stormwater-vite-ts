import { useState, useEffect } from "react"
import { useNavigate } from "react-router"
import { useMsal } from "@azure/msal-react"
import { NODE_ENV } from '@config/index'

export const useGetToken = () => {
  const [state, setState] = useState<{ token: string | undefined }>({ token: undefined })

  const { instance, inProgress } = useMsal()

  const activeAccount = instance.getActiveAccount()

  const navigate = useNavigate()

  if(NODE_ENV === 'development') {
    return 'dev-token'
  }

  const checkToken = async () => {
    let token: string | undefined = undefined

    if(activeAccount?.idTokenClaims && activeAccount.idTokenClaims.exp) { // Check if token is expired or about to expire
      const expiresOn = activeAccount.idTokenClaims.exp * 1000
      const now = Date.now()
  
      if(expiresOn > now + 3000000) { // Still valid
        token = activeAccount.idToken
        setState({ token })
        return
      }
  
      const request = {
        scopes: ["openid", "profile", "email"],
        account: activeAccount,
        forceRefresh: true
      }
  
      const response = await instance.acquireTokenSilent(request) // Refresh token

      setState({ token: response.idToken })
    }

    if(activeAccount && !activeAccount.idTokenClaims) { // Active account but !idTokenClaims
      const request = {
        scopes: ["openid", "profile", "email"],
        account: activeAccount
      }

      const response = await instance.acquireTokenSilent(request) // Refresh token

      setState({ token: response.idToken })
    }

    if(!activeAccount) { // !Active account - redirect to login
      navigate('/')
    }
  }

  useEffect(() => {
    if(inProgress !== 'none') { // Wait for instance to fully initialize
      return
    }

    checkToken()

    const intervalId = setInterval(checkToken, 4 * 60 * 1000) // Check every 4 minutes
    
    return () => clearInterval(intervalId)
  }, [inProgress])

  return state.token
}

export const useEnableQuery = () => {
  const [state, setState] = useState<{ enabled: boolean }>({ enabled: false })

  const token = useGetToken()

  useEffect(() => {
    let timeout = null

    if(token) {
      timeout = setTimeout(() => {
        setState({ enabled: true })
      }, 300) // 300ms delay
    } else setState({ enabled: false })

    return () => {
      if(timeout) {
        clearTimeout(timeout)
      }
    }
  }, [token])

  return { enabled: state.enabled, token }
}

export const useRedirectAfterLogin = () => {
  const { instance, inProgress } = useMsal()
  const activeAccount = instance.getActiveAccount()

  useEffect(() => {
    if(inProgress === 'none') {

      if(activeAccount) {
        const redirectUrl = sessionStorage.getItem('redirectUrl') // Check for redirectUrl

        if(redirectUrl) {        
          window.location.href = redirectUrl
          sessionStorage.removeItem('redirectUrl')
        }
      } else window.location.pathname = '/stormwater'
    }
  }, [activeAccount, inProgress])
}

export const useReturnUserRoles = () => {
  const { instance } = useMsal()
  
  const activeAccount = instance.getActiveAccount()
  const roles = activeAccount?.idTokenClaims?.roles || []
  
  return roles
}

export const useDebounce = <T>(value: T, delay: number): T => { // Debouncer
  const [state, setState] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setState(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return state
}