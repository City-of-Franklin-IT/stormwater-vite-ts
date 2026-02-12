import { useGetViolation } from "./hooks"

// Components
import HandleLoading from "@/utils/HandleLoading"
import * as Components from "./components"

type GetViolationProps = { handleDeleteBtn: { onClick: React.MouseEventHandler<HTMLButtonElement>, label: string } }

function GetViolation(props: GetViolationProps) {
  const { data, isSuccess } = useGetViolation()

  return (
    <HandleLoading isSuccess={isSuccess}>
      <Components.Form 
        violation={data?.data}
        handleDeleteBtn={props.handleDeleteBtn} />
    </HandleLoading>
  )
}

export default GetViolation