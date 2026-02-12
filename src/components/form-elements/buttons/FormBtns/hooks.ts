import { useFormContext } from "react-hook-form"

export const useDisableBtn = () => {
  const { formState: { isValid, isSubmitting } } = useFormContext()

  return !isValid || isSubmitting
}