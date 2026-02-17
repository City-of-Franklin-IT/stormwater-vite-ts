import { useFormContext } from "react-hook-form"

/**
* Returns whether the form submit button should be disabled based on form validity and submission state
**/
export const useDisableBtn = () => {
  const { formState: { isValid, isSubmitting } } = useFormContext()

  return !isValid || isSubmitting
}