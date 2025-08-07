// Types
import * as AppTypes from '@/context/App/types'

// Components
import CreateComplaintForm from "../../create/CreateComplaintForm"
import CreateIllicitDischargeForm from "../../create/CreateIllicitDischargeForm"
import CreateViolationForm from '../../create/CreateViolationForm'

type CreateFormMapProps = { site: AppTypes.SiteInterface | undefined }

export type CreateFormType = 'complaint' | 'discharge' | 'violation'

export const createFormMap = new Map<CreateFormType, (props: CreateFormMapProps) => JSX.Element>([
  ['complaint', CreateComplaintForm],
  ['discharge', CreateIllicitDischargeForm],
  ['violation', CreateViolationForm]
])