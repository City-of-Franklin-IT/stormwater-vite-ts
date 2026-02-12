import { useOnDeleteBtnClick } from "./hooks"

// Types
import * as AppTypes from "@/context/App/types"

// Components
import UpdateSiteLogForm from "../../../../site/forms/update/UpdateSiteLogForm"
import DeleteBtn from "../../../../form-elements/buttons/DeleteBtn"

export const Form = ({ siteLog }: { siteLog: AppTypes.SiteLogInterface }) => {
  const { active, onClick } = useOnDeleteBtnClick(siteLog.uuid)

  const label = !active ? "Delete Site Log" : "Confirm Delete Site Log"

  return (
    <div className="flex flex-col gap-6 items-center w-full border">
      <UpdateSiteLogForm siteLog={siteLog} />
      <DeleteBtn onClick={onClick}>
        {label}
      </DeleteBtn>
    </div>
  )
}