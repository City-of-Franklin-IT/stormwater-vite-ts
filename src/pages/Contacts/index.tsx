import { useGetContacts } from "./hooks"

// Components
import HandleLoading from "../../utils/HandleLoading"
import ErrorBoundary from "../../components/layout/error/ErrorBoundary"
import { ContactsProvider } from "@/components/contacts/context"
import ContactsContainer from "../../components/contacts/containers/ContactsContainer"

function Contacts() {
  const { data, isLoading } = useGetContacts()

  return (
    <HandleLoading isLoading={isLoading}>
      <ErrorBoundary href={"/sites"}>
        <ContactsProvider>
          <ContactsContainer contacts={data?.data || []} />
        </ContactsProvider>
      </ErrorBoundary>
    </HandleLoading>
  )
}

export default Contacts