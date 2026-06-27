import { useState, useEffect } from "react"
import { useNavigate } from "react-router"
import { useMsal } from "@azure/msal-react"
import { AccountInfo } from "@azure/msal-browser"
import { useAuth, MOCK_AUTH } from "@/context/Auth"
import { getUserDepartment } from "./utils"

export const useGetToken = () => {
  const { token } = useAuth()

  return token
}

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
  refresh: (forceRefresh?: boolean) => Promise<string | undefined>
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

  if (import.meta.env.VITE_MOCK_AUTH === 'true') return ["task.write"]

  return activeAccount?.idTokenClaims?.roles ?? []
}

export const useGetUserDepartment = () => {
  const [state, setState] = useState<{ department: string | undefined, isLoading: boolean }>({ department: undefined, isLoading: true })

  const { instance, inProgress } = useMsal()
  const activeAccount = instance.getActiveAccount()

  useEffect(() => {
    if(MOCK_AUTH) {
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
