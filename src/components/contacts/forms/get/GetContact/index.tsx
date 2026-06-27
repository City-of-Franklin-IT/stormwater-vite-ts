import { useGetContact } from "./hooks"

// Components
import Loading from "@/components/layout/loading/Loading"
import * as Components from "./components"

function GetContact() {
  const { data, isLoading } = useGetContact()

  if(isLoading) return <Loading />

  return (
    <Components.Form contact={data?.data} />
  )
}

export default GetContact