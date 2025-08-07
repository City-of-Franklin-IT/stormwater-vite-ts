// Types
import { Dispatch } from "react"
import { StreamWatershedEnum } from "@/components/enforcement/forms/create/CreateIllicitDischargeForm/types"
import { ConcernEnum } from "@/components/enforcement/forms/create/CreateComplaintForm/types"

export interface SiteInterface extends BaseInterface {
  siteId: string
  inspectorId: string
  name: string
  preconDate: string
  location: string
  xCoordinate: number
  yCoordinate: number
  permit: string | null
  cof: string | null
  tnq: string | null
  greenInfrastructure: boolean | null
  inactive: boolean
  hasOpenViolation: boolean
  hasOpenComplaint: boolean
  hasOpenIllicitDischarge: boolean
  Logs?: SiteLogInterface[]
  ConstructionViolations?: ConstructionViolationInterface[]
  Complaints?: ComplaintInterface[]
  IllicitDischarges?: IllicitDischargeInterface[]
  SiteContacts?: SiteContactInterface[]
  Inspector?: InspectorInterface
}

export interface SiteCreateInterface extends Omit<SiteInterface, 'siteId' | 'inactive' | 'hasOpenViolation' | 'hasOpenComplaint' | 'hasOpenIllicitDischarge' | 'Logs' | 'ConstructionViolations' | 'Complaints' | 'IllicitDischarges' | 'SiteContacts' | 'Inspector' | 'uuid' | 'createdBy' | 'createdAt' | 'updatedBy' | 'updatedAt'>{
  siteId?: string
  inactive?: boolean
  Logs?: SiteLogCreateInterface[]
  ConstructionViolations?: ConstructionViolationCreateInterface[]
  Complaints?: ComplaintCreateInterface[]
  IllicitDischarges?: IllicitDischargeCreateInterface[]
  SiteContacts?: SiteContactCreateInterface[]
  uuid?: string
}

export interface InspectorInterface extends BaseInterface {
  inspectorId: string
  name: string
  email: string
  slug: string
  inactive: boolean
  Sites?: SiteInterface[]
  Complaints?: ComplaintInterface[]
  IllicitDischarges?: IllicitDischargeInterface[]
}

export interface InspectorCreateInterface extends Omit<InspectorInterface, 'inspectorId' | 'slug' | 'inactive' | 'Sites' | 'Complaints' | 'IllicitDischarges' | 'uuid' | 'createdBy' | 'createdAt' | 'updatedBy' | 'updatedAt'>{
  inspectorId?: string
}

export interface SiteContactInterface extends BaseInterface {
  siteId: string
  contactId: string
  isPrimary: boolean
  isContractor: boolean
  isInspector: boolean
  Site?: SiteInterface
  Contact?: ContactInterface
}

export interface SiteContactCreateInterface extends Omit<SiteContactInterface, 'isPrimary' | 'isContractor' | 'isInspector' | 'Site' | 'Contact' | 'uuid' | 'createdBy' | 'createdAt' | 'updatedBy' | 'updatedAt'>{
  isPrimary?: boolean | null
  isContractor?: boolean | null
  isInspector?: boolean | null
  uuid?: string
}

export interface SiteLogInterface extends BaseInterface {
  logId: string
  siteId: string
  inspectionDate: string
}

export interface SiteLogCreateInterface extends Omit<SiteLogInterface, 'logId' | 'uuid' | 'createdBy' | 'createdAt' | 'updatedBy' | 'updatedAt'>{
  logId?: string
  uuid?: string
}

export interface ConstructionViolationInterface extends BaseInterface {
  violationId: string
  date: string
  siteId: string
  details: string
  enforcementAction: string | null
  penaltyDate: string | null
  penaltyAmount: number | null
  penaltyDueDate: string | null
  paymentReceived: string | null
  swoDate: string | null
  swoLiftedDate: string | null
  complaintId: string | null
  compliance: boolean | null
  closed: boolean | null
  FollowUpDates?: FollowUpInterface[]
  Site?: SiteInterface
}

export interface ConstructionViolationCreateInterface extends Omit<ConstructionViolationInterface, 'violationId' | 'FollowUpDates' | 'Site' | 'uuid' | 'createdBy' | 'createdAt' | 'updatedBy' | 'updatedAt'>{
  readonly violationId: string
  FollowUpDates: FollowUpCreateInterface[]
  uuid?: string
}

export interface ComplaintInterface extends BaseInterface {
  complaintId: string
  date: string
  siteId: string | null
  inspectorId: string | null
  name: string | null
  address: string | null
  phone: string | null
  email: string | null
  xCoordinate: number | null
  yCoordinate: number | null
  locationDescription: string | null
  concern: ConcernEnum
  otherConcern: string | null
  details: string
  responsibleParty: string | null
  comments: string | null
  compliance: boolean | null
  closed: boolean | null
  Inspector?: InspectorInterface
  FollowUpDates?: FollowUpInterface[]
  Site?: SiteInterface
}

export interface ComplaintCreateInterface extends Omit<ComplaintInterface, 'complaintId' | 'Inspector' | 'FollowUpDates' | 'uuid' | 'createdBy' | 'createdAt' | 'updatedBy' | 'updatedAt'>{
  readonly complaintId: string
  FollowUpDates: FollowUpCreateInterface[]
  uuid?: string
}

export interface IllicitDischargeInterface extends BaseInterface {
  illicitId: string
  complaintId: string | null
  siteId: string | null
  date: string
  xCoordinate: number | null
  yCoordinate: number | null
  locationDescription: string | null
  inspectorId: string | null
  details: string
  responsibleParty: string | null
  volumeLost: string | null
  streamWatershed: StreamWatershedEnum | string
  otherStreamWatershed: string
  enforcementAction: string | null
  penaltyDate: string | null
  penaltyAmount: number | null
  penaltyDueDate: string | null
  paymentReceived: string | null
  compliance: boolean | null
  closed: boolean | null
  Inspector?: InspectorInterface
  FollowUpDates?: FollowUpInterface[]
  Site?: SiteInterface
}

export interface IllicitDischargeCreateInterface extends Omit<IllicitDischargeInterface, 'illicitId' | 'FollowUpDates' | 'Site' | 'uuid' | 'createdBy' | 'createdAt' | 'updatedBy' | 'updatedAt'>{
  readonly illicitId: string
  FollowUpDates: FollowUpCreateInterface[]
  uuid?: string
}

export interface FollowUpInterface extends BaseInterface {
  followUpId: string
  violationId: string | null
  complaintId: string | null
  illicitId: string | null
  followUpDate: string
}

export interface FollowUpCreateInterface extends Omit<FollowUpInterface, 'followUpId' | 'violationId' | 'complaintId' | 'illicitId' | 'uuid' | 'createdBy' | 'createdAt' | 'updatedBy' | 'updatedAt'>{
  violationId?: string | null
  complaintId?: string | null
  illicitId?: string | null
  uuid?: string
}

export interface ContactInterface extends BaseInterface {
  contactId: string
  name: string
  phone: string | null
  company: string | null
  email: string | null
  inactive: boolean
  SiteContacts?: SiteContactInterface[]
}

export interface ContactCreateInterface extends Omit<ContactInterface, 'contactId' | 'inactive' | 'SiteContacts' | 'uuid' | 'createdBy' | 'createdAt' | 'updatedBy' | 'updatedAt'>{
  readonly contactid: string
  inactive?: boolean
  uuid?: string
}

export interface AppContext { // App ctx
  dispatch: Dispatch<AppAction>
  activePage: PageType
  contactOptions: { text: string, value: string }[]
  dateRangeFilter: {
    start: string | undefined
    end: string | undefined
  }
  hoveredSite: string | undefined
  inspectorOptions: { text: string, value: string }[]
  searchValue: string
  showActiveSitesOnly: boolean
  showClosedSiteIssues: boolean
  showMenu: boolean
  showOpenIssuesOnly: boolean
  showSiteComplaints: boolean
  showSiteIllicitDischarges: boolean
  showSiteViolations: boolean
}

export interface AppState extends Omit<AppContext, 'dispatch'>{}

export interface AppReducerProps { // AppReducer props
  state: AppState
  action: AppAction
}

export interface ServerResponse { // Server response object
  success: boolean
  msg?: string
}

export interface BaseInterface { 
  uuid: string
  createdBy: string
  createdAt: string
  updatedBy: string
  updatedAt: string
}

export type AppAction =
  | { type: 'SET_ACTIVE_PAGE', payload: PageType }
  | { type: 'SET_SEARCH_VALUE', payload: string }
  | { type: 'TOGGLE_SHOW_OPEN_ISSUES_ONLY', payload: undefined }
  | { type: 'TOGGLE_SHOW_ACTIVE_SITES_ONLY', payload: undefined }
  | { type: 'SET_HOVERED_SITE', payload: string | undefined }
  | { type: 'TOGGLE_SHOW_SITE_COMPLAINTS', payload: undefined }
  | { type: 'TOGGLE_SHOW_SITE_VIOLATIONS', payload: undefined }
  | { type: 'TOGGLE_SHOW_SITE_ILLICIT_DISCHARGES', payload: undefined }
  | { type: 'TOGGLE_SHOW_CLOSED_SITE_ISSUES', payload: undefined }
  | { type: 'TOGGLE_SHOW_MENU', payload: undefined }
  | { type: 'SET_INSPECTOR_OPTIONS', payload: { text: string, value: string }[] }
  | { type: 'SET_CONTACT_OPTIONS', payload: { text: string, value: string }[] }
  | { type: 'SET_DATE_RANGE_FILTER', payload: { start: string | undefined, end: string | undefined } }
  | { type: 'RESET_CTX', payload: undefined }

export type PageType =
  | "Sites"
  | "Inspectors"
  | "Contacts"
  | "Enforcement"
  | "Create"
  | "Login"
  | "Site"