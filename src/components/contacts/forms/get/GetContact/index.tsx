import { useGetContact } from "./hooks"

// Components
import HandleLoading from "@/utils/HandleLoading"
import * as Components from "./components"

function GetContact() {
  const { data, isLoading } = useGetContact()

  return (
    <HandleLoading isLoading={isLoading}>
      <Components.Form contact={data?.data} />
    </HandleLoading>
  )
}

export default GetContact