import { useState, useEffect } from "react"
import { useMsal } from "@azure/msal-react"
import { AccountInfo } from "@azure/msal-browser"
import { NODE_ENV } from '@config/index'
import { getUserDepartment } from "./utils"

export const useGetToken = () => {
  const [state, setState] = useState<{ token: string | undefined, isLoading: boolean }>({ token: undefined, isLoading: true })

  const { instance, accounts, inProgress } = useMsal()

  if(NODE_ENV === 'development') {
    return { token: 'dev-token', isLoading: false }
  }

  const checkToken = async () => {
    setState(prevState => ({ ...prevState, isLoading: true }))

    const activeAccount = instance.getActiveAccount()

    if(!activeAccount && accounts.length === 0) {
      setState(prevState => ({ ...prevState, isLoading: false }))
      window.location.href = '/stormwater'
      return
    }

    if(!activeAccount && accounts.length > 0) {
      setState(prevState => ({ ...prevState, isLoading: false }))
      instance.setActiveAccount(accounts[0])
      return
    }

    let token: string | undefined = undefined

    if(activeAccount?.idTokenClaims && activeAccount.idTokenClaims.exp) { // Check if token is expired or about to expire
      const expiresOn = activeAccount.idTokenClaims.exp * 1000
      const now = Date.now()
  
      if(expiresOn > now + 3000000) { // Still valid
        token = activeAccount.idToken
        setState(({ token, isLoading: false }))
        return
      }
  
      const request = {
        scopes: ["openid", "profile", "email"],
        account: activeAccount,
        forceRefresh: true
      }
  
      const response = await instance.acquireTokenSilent(request) // Refresh token

      setState(({ token: response.idToken, isLoading: false }))
    }

    if(activeAccount && !activeAccount.idTokenClaims) { // Active account but !idTokenClaims
      const request = {
        scopes: ["openid", "profile", "email"],
        account: activeAccount
      }

      const response = await instance.acquireTokenSilent(request) // Refresh token

      setState(({ token: response.idToken, isLoading: false }))
    }

    setState(prevState => ({ ...prevState, isLoading: false }))
  }

  useEffect(() => {
    if(inProgress !== 'none') { // Wait for instance to fully initialize
      return
    }

    checkToken()

    const intervalId = setInterval(checkToken, 4 * 60 * 1000) // Check every 4 minutes
    
    return () => clearInterval(intervalId)
  }, [inProgress, accounts.length])

  return state
}

export const useEnableQuery = () => {
  const [state, setState] = useState<{ enabled: boolean }>({ enabled: false })

  const { token, isLoading } = useGetToken()

  useEffect(() => {
    if(isLoading) {
      setState({ enabled: false })
    } else setState({ enabled: !!token })
  }, [token, isLoading])

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

  if(NODE_ENV === 'development') {
    return ['task.write']
  }
  
  const activeAccount = instance.getActiveAccount()
  const roles = activeAccount?.idTokenClaims?.roles || []
  
  return roles
}

export const useGetUserDepartment = () => {
  const [state, setState] = useState<{ department: string | undefined, isLoading: boolean }>({ department: undefined, isLoading: true })

  const { instance, inProgress } = useMsal()
  const activeAccount = instance.getActiveAccount()

  useEffect(() => {
    if(NODE_ENV === 'development') {
      setState({ department: 'IT', isLoading: false })
      return
    }

    if(activeAccount && inProgress === 'none' && !state.department) {
      getUserDepartment(instance, activeAccount as AccountInfo)
        .then(department => setState({ department, isLoading: false }))
        .catch((err) => {
          console.log(err)
          setState(prev => ({ ...prev, isLoading: false }))
        })
    } else if(inProgress === 'none' && !activeAccount) {
      setState(prev => ({ ...prev, isLoading: false }))
    }
  }, [inProgress, state.department])

  return { department: state.department, isLoading: state.isLoading }
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