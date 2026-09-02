import { useEffect } from "react"
import { useNavigate, useLocation } from "react-router"
import { infoPopup } from "@/utils/Toast/Toast"
import { useAuth } from "@/context/Auth"

export const useAuthCheck = () => {
  const { isAuthenticated, isLoading } = useAuth()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  useEffect(() => {
    if(pathname === "/") return

    if(!isLoading && !isAuthenticated) {
      infoPopup('Unauthorized: Please Login')
      navigate('/')
    }
  }, [isAuthenticated, isLoading, navigate, pathname])
}