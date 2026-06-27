import { memo } from "react"

// Types
import type * as AppTypes from "@/context/App/types"

// Components
import * as Components from "./components"

function SiteContactsTable({ siteContacts }: { siteContacts: AppTypes.SiteContactInterface[] }) {

  return (
    <div className="flex flex-col gap-6 items-center p-8 bg-neutral/20 h-fit shadow-xl rounded-xl">
      <h2 className="text-neutral-content font-[shrikhand] text-4xl py-8 text-center">Contacts</h2>

      <Components.Table siteContacts={siteContacts} />
      <Components.EmailContacts siteContacts={siteContacts} />
    </div>
  )
}

export default memo(SiteContactsTable)