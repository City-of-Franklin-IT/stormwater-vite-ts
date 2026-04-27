import { useGetViolation } from "./hooks"

// Components
import HandleLoading from "@/utils/HandleLoading"
import * as Components from "./components"

type GetViolationProps = { handleDeleteBtn: { onClick: React.MouseEventHandler<HTMLButtonElement>, label: string } }

function GetViolation(props: GetViolationProps) {
  const { data, isLoading } = useGetViolation()

  return (
    <HandleLoading isLoading={isLoading}>
      <Components.Form 
        violation={data?.data}
        handleDeleteBtn={props.handleDeleteBtn} />
    </HandleLoading>
  )
}

export default GetViolation