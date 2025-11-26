import { useContext } from "react"
import EnforcementCtx from "@/components/enforcement/context"
import SiteCtx from "../../context"
import { useOnDeleteBtnClick } from './hooks'
import { useHandleDeleteBtn as useHandleDeleteViolationBtn } from "@/components/enforcement/containers/ViolationsContainer/hooks"
import { useHandleDeleteBtn as useHandleDeleteComplaintBtn } from "@/components/enforcement/containers/ComplaintsContainer/hooks"
import { useHandleDeleteBtn as useHandleDeleteIllicitDischargeBtn } from "@/components/enforcement/containers/DischargesContainer/hooks"
import { createFormMap } from './utils'
import { useHandleForm } from './hooks'

// Types
import * as AppTypes from '@/context/App/types'

// Components
import FormContainer from "../../../form-elements/FormContainer"
import FormNav from "../../../form-elements/FormNav"
import UpdateSiteForm from "../update/UpdateSiteForm"
import GetSiteLog from "../../../enforcement/forms/get/GetSiteLog"
import GetViolation from "../../../enforcement/forms/get/GetViolation"
import GetComplaint from "../../../enforcement/forms/get/GetComplaint"
import GetIllicitDischarge from "../../../enforcement/forms/get/GetIllicitDischarge"
import DeleteBtn from "../../../form-elements/buttons/DeleteBtn"

export const Form = ({ site }: { site: AppTypes.SiteInterface }) => { // Set form opened on site page
  const { visible, createFormActive } = useHandleForm()

  if(visible) {
    if(createFormActive) { // Create site log, violation, complaint, and illicit discharge
      return (
        <div className="flex flex-col gap-10 items-center m-auto w-full">
          <FormNav />
          <FormContainer>
            <SetCreateForm site={site} />
          </FormContainer>
        </div>
      )
    }

    return ( // Update
      <div className="flex">
        <FormContainer>
          <SetUpdateForm site={site} />
        </FormContainer>
      </div>
    )
  }
}

const UpdateSite = ({ site }: { site: AppTypes.SiteInterface }) => {
  const { onClick, active } = useOnDeleteBtnClick()

  const label = !active ? 'Delete Site' : 'Confirm Delete Site'

  return ( // Update site
    <div className="flex flex-col items-center gap-8 w-full">
      <UpdateSiteForm site={site} />
      <DeleteBtn onClick={onClick}>
        {label}
      </DeleteBtn>
    </div>
  )
}

const SetCreateForm = ({ site }: { site: AppTypes.SiteInterface }) => {
  const { activeForm } = useContext(EnforcementCtx)

  if(!activeForm) return null

  const CreateFormComponent = createFormMap.get(activeForm)

  if(CreateFormComponent) { // Create forms
    return <CreateFormComponent site={site} />
  }
}

const SetUpdateForm = ({ site }: { site: AppTypes.SiteInterface }) => {
  const { activeForm } = useContext(EnforcementCtx)
  const { siteUUID } = useContext(SiteCtx)

  const handleDeleteViolationBtn = useHandleDeleteViolationBtn()
  const handleDeleteComplaintBtn = useHandleDeleteComplaintBtn()
  const handleDeleteIllicitDischargeBtn = useHandleDeleteIllicitDischargeBtn()

  if(!activeForm && !siteUUID) return null

  if(siteUUID) {
    return <UpdateSite site={site} />
  }

  switch(activeForm) { // Update forms
    case 'updateSiteLog':
      return <GetSiteLog />
    case 'updateViolation':
      return <GetViolation handleDeleteBtn={handleDeleteViolationBtn} />
    case 'updateComplaint':
      return <GetComplaint handleDeleteBtn={handleDeleteComplaintBtn} />
    case 'updateIllicitDischarge':
      return <GetIllicitDischarge handleDeleteBtn={handleDeleteIllicitDischargeBtn} />
  }
}