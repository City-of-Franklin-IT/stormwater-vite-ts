import { useContext } from "react"
import EnforcementCtx from "@/components/enforcement/context"

// Types
import { FormType } from "@/components/site/context"

/**
* Returns form nav visibility and onClick handler for setting the active form type
**/
export const useHandleFormNav = () => {
  const { activeForm, dispatch } = useContext(EnforcementCtx)

  const showNav = activeForm?.includes("update") ? false : true

  return { showNav, onClick: (formType: FormType) => dispatch({ type: "SET_ACTIVE_FORM", payload: formType }) }
}