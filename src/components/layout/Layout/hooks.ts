import { useEffect } from "react"
import { useNavigate, useLocation } from "react-router"
import { useMsal } from "@azure/msal-react"
import { infoPopup } from "@/utils/Toast/Toast"
import { MOCK_AUTH } from "@/context/Auth"

export const useAuthCheck = () => {
  const { instance, inProgress } = useMsal()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  useEffect(() => {
    if(MOCK_AUTH || pathname === "/") return

    if(inProgress === 'none') {
      const activeAccount = instance.getActiveAccount()
      if(!activeAccount) {
        infoPopup('Unauthorized: Please Login')
        navigate('/')
      }
    }
  }, [inProgress, instance, navigate, pathname])
}