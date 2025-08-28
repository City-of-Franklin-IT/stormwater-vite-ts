import { useCallback } from "react"
import { useNavigate } from "react-router"
import { useReturnUserRoles } from "@/helpers/hooks"

export const useOnTableRowClick = (uuid: string) => {
  const navigate = useNavigate()
  const roles = useReturnUserRoles()

  return useCallback(() => {
    if(!roles.includes('task.write')) {
      return null
    }

    navigate(`/site/${ uuid }`)
  }, [roles, navigate, uuid])
}