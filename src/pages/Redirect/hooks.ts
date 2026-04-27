import { useEffect } from "react"
import { useNavigate } from "react-router"
import { useAuth } from "@/context/Auth"

export const useRedirect = (href: string) => {
  const { isAuthenticated, isLoading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        navigate(href)
      } else {
        navigate('/')
      }
    }
  }, [isAuthenticated, isLoading, navigate, href])
}
