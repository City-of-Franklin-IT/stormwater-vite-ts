import { useGetContacts } from "./hooks"

// Components
import Loading from "@/components/layout/loading/Loading"
import ErrorBoundary from "../../components/layout/error/ErrorBoundary"
import { ContactsProvider } from "@/components/contacts/context"
import ContactsContainer from "../../components/contacts/containers/ContactsContainer"

function Contacts() {
  const { data, isLoading } = useGetContacts()

  if(isLoading) return <Loading />

  return (
    <ErrorBoundary href={"/sites"}>
      <ContactsProvider>
        <ContactsContainer contacts={data?.data || []} />
      </ContactsProvider>
    </ErrorBoundary>
  )
}

export default Contacts