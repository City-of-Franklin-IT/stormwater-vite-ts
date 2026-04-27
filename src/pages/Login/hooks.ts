import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '@/context/Auth'

export const useRedirectAuthenticated = (redirectTo: string = '/sites') => {
  const { isAuthenticated, isLoading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate(redirectTo)
    }
  }, [isAuthenticated, isLoading, navigate, redirectTo])
}
