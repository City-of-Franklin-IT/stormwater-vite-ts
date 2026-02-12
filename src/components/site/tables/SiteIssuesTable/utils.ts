// Icons
import complaintIcon from "@/assets/icons/complaint/complaint.svg"
import dischargeIcon from "@/assets/icons/discharge/discharge.svg"
import violationIcon from "@/assets/icons/violation/violation.svg"

// Types
import { FormType } from "../../context"

export const setFormType = (issue: { complaintId?: string, violationId?: string, illicitId?: string }) => {
  if(issue.complaintId) {
    return "updateComplaint"
  }

  if(issue.violationId) {
    return "updateViolation"
  }

  return "updateIllicitDischarge"
}

export const typeIconMap = new Map<FormType, { title: string, src: string }>([
  ["updateComplaint", { title: "Site Complaint", src: complaintIcon }],
  ["updateIllicitDischarge", { title: "Illicit Discharge", src: dischargeIcon }],
  ["updateViolation", { title: "Construction Violation", src: violationIcon }]
])