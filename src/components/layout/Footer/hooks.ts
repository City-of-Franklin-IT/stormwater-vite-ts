import { MOCK_AUTH } from "@/context/Auth"
import { useGetUserDepartment } from "@/helpers/hooks"

/**
* Returns docs button visibility based on user department
**/
export const useHandleDocsBtn = () => {
  const { department } = useGetUserDepartment()

  const visible = department === "IT" || MOCK_AUTH

  return visible
}
