import { useHandleForm, useHandleSetCreateForm, useOnDeleteBtnClick, useHandleSetUpdateForm } from './hooks'

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

  if(!visible) return

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

const UpdateSite = ({ site }: { site: AppTypes.SiteInterface }) => {
  const { onClick, label } = useOnDeleteBtnClick()

  return (
    <div className="flex flex-col items-center gap-8 w-full">
      <UpdateSiteForm site={site} />
      <DeleteBtn onClick={onClick}>
        {label}
      </DeleteBtn>
    </div>
  )
}

const SetCreateForm = ({ site }: { site: AppTypes.SiteInterface }) => {
  const { visible, CreateFormComponent } = useHandleSetCreateForm()

  if(!visible || !CreateFormComponent) return null

  return (
    <CreateFormComponent site={site} />
  )
}

const SetUpdateForm = ({ site }: { site: AppTypes.SiteInterface }) => {
  const { visibility, deleteBtnProps, activeForm } = useHandleSetUpdateForm()

  if(!visibility.form) return null

  if(visibility.updateSite) {
    return <UpdateSite site={site} />
  }

  switch(activeForm) { 
    case 'updateSiteLog':
      return <GetSiteLog />
    case 'updateViolation':
      return <GetViolation handleDeleteBtn={deleteBtnProps.violation} />
    case 'updateComplaint':
      return <GetComplaint handleDeleteBtn={deleteBtnProps.complaint} />
    default:
      return <GetIllicitDischarge handleDeleteBtn={deleteBtnProps.illicit} />
  }
}