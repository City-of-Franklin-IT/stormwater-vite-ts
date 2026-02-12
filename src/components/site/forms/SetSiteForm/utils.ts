// Types
import * as AppTypes from "@/context/App/types"
import { FormType } from "../../context"

// Components
import CreateSiteLogForm from "../../../enforcement/forms/create/CreateSiteLogForm"
import CreateComplaintForm from "@/components/enforcement/forms/create/CreateComplaintForm"
import CreateIllicitDischargeForm from "@/components/enforcement/forms/create/CreateIllicitDischargeForm"
import CreateViolationForm from "@/components/enforcement/forms/create/CreateViolationForm"

type CreateFormProps = { site: AppTypes.SiteInterface }

export const createFormMap = new Map<FormType, (props: CreateFormProps) => JSX.Element>([
  ["createSiteLog", (props: CreateFormProps) => CreateSiteLogForm({ site: props.site })],
  ["createComplaint", (props: CreateFormProps) => CreateComplaintForm({ site: props.site })],
  ["createIllicitDischarge", (props: CreateFormProps) => CreateIllicitDischargeForm({ site: props.site })],
  ["createViolation", (props: CreateFormProps) => CreateViolationForm({ site: props.site })]
])
