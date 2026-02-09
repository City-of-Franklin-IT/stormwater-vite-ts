import { NODE_ENV } from "@/config"
import { useGetUserDepartment } from "@/helpers/hooks"

/**
* Returns docs button visibility based on user department
**/
export const useHandleDocsBtn = () => {
  const { department } = useGetUserDepartment()

  const visible = department === 'IT' || NODE_ENV === 'development'

  return visible
}
