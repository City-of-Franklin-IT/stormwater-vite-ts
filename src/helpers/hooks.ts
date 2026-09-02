import { useState, useEffect } from "react"
import { useNavigate } from "react-router"
import { QueryClient } from "@tanstack/react-query"
import { useMsal } from "@azure/msal-react"
import { AccountInfo } from "@azure/msal-browser"
import { useAuth } from "@/context/Auth"
import { getUserDepartment } from "./utils"

export const useEnableQuery = () => {
  const { token, isLoading, refreshToken } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoading && !token) {
      navigate('/')
    }
  }, [token, isLoading, navigate])

  return { enabled: !!token && !isLoading, token, refreshToken }
}

export const withTokenRefresh = async <T>(
  fn: () => Promise<T>,
  refresh: (forceRefresh?: boolean) => Promise<void>
): Promise<T> => {
  try {
    return await fn()
  } catch (e) {
    if (e instanceof Error && e.message === '401') {
      await refresh(true)
      return await fn()
    }
    throw e
  }
}

export const useReturnUserRoles = () => {
  const { instance } = useMsal()
  const activeAccount = instance.getActiveAccount()

  if (import.meta.env.DEV) return ["task.write"]

  return activeAccount?.idTokenClaims?.roles ?? []
}

export const useGetUserDepartment = () => {
  const [state, setState] = useState<{ department: string | undefined, isLoading: boolean }>({ department: undefined, isLoading: true })

  const { instance, inProgress } = useMsal()
  const activeAccount = instance.getActiveAccount()

  useEffect(() => {
    if(import.meta.env.DEV) {
      setState({ department: 'IT', isLoading: false })
      return
    }

    if (activeAccount && inProgress === 'none' && !state.department) {
      getUserDepartment(instance, activeAccount as AccountInfo)
        .then(department => setState({ department, isLoading: false }))
        .catch((err) => {
          console.log(err)
          setState(prev => ({ ...prev, isLoading: false }))
        })
    } else if (inProgress === 'none' && !activeAccount) {
      setState(prev => ({ ...prev, isLoading: false }))
    }
  }, [inProgress, state.department])

  return { department: state.department, isLoading: state.isLoading }
}

export const useDebounce = <T>(value: T, delay: number): T => {
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

export const useHandleVisibilityChange = (queryClient: QueryClient) => {
  const { refreshToken } = useAuth()

  useEffect(() => {
    const handleVisibilityChange = async () => {
      if (!document.hidden) {
        await refreshToken(true)
        queryClient.refetchQueries()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [refreshToken, queryClient])
}