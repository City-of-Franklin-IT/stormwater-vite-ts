import { useContext } from "react"
import EnforcementCtx from "@/components/enforcement/context"
import { useHandleFormNav } from "./hooks"
import styles from "./FormNav.module.css"

// Components
import FormNavBtn from "../buttons/FormNavBtn"

function FormNav() {
  const { activeForm } = useContext(EnforcementCtx)

  const { showNav, onClick } = useHandleFormNav()

  if(!showNav) return null // Hide if update form is active

  return (
    <nav className={styles.container}>
      Select Form Type
      <div className="flex gap-8 w-full">
        <FormNavBtn 
          isActive={activeForm === "createSiteLog"}
          onClick={() => onClick("createSiteLog")}>
            Site Log
        </FormNavBtn>
        <FormNavBtn 
          isActive={activeForm === "createViolation"}
          onClick={() => onClick("createViolation")}>
            Violation
        </FormNavBtn>
        <FormNavBtn 
          isActive={activeForm === "createComplaint"}
          onClick={() => onClick("createComplaint")}>
            Complaint
        </FormNavBtn>
        <FormNavBtn 
          isActive={activeForm === "createIllicitDischarge"}
          onClick={() => onClick("createIllicitDischarge")}>
            Illicit Discharge
        </FormNavBtn>
      </div>
    </nav>
  )
}

export default FormNav