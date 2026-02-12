import { memo } from "react"
import { useHandleTableData } from "./hooks"

// Types
import * as AppTypes from "@/context/App/types"

// Components
import { CreateBtn } from "@/components/enforcement/containers/ViolationsContainer/components"
import GetContact from "../../forms/get/GetContact"
import Motion from "@/utils/Motion"
import * as Components from "./components"

function ContactsContainer({ contacts }: { contacts: AppTypes.ContactInterface[] }) {
  const tableData = useHandleTableData(contacts)

  return (
    <Motion animation={"slideInLeft"}>
      <div className="flex flex-col my-10 gap-10 m-auto w-4/5 xl:w-3/4 2xl:w-2/3">
        <div className="relative flex flex-col gap-11 p-20 pt-30 bg-neutral/10 shadow-xl">
          <CreateBtn href={"/create/contact"}>
            Create New Contact
          </CreateBtn>
          <Components.ContactsTable contacts={tableData} />
        </div>

        <Components.UpdateForm>
          <GetContact />
        </Components.UpdateForm>
      </div>
    </Motion>
  )
}

export default memo(ContactsContainer)