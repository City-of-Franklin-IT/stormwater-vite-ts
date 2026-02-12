import { useGetContact } from "./hooks"

// Components
import HandleLoading from "@/utils/HandleLoading"
import * as Components from "./components"

function GetContact() {
  const { data, isSuccess } = useGetContact()

  return (
    <HandleLoading isSuccess={isSuccess}>
      <Components.Form contact={data?.data} />
    </HandleLoading>
  )
}

export default GetContact