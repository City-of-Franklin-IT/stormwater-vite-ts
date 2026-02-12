import { useGetComplaint } from "./hooks"

// Components
import HandleLoading from "@/utils/HandleLoading"
import * as Components from "./components"

type GetComplaintProps = { handleDeleteBtn: { onClick: React.MouseEventHandler<HTMLButtonElement>, label: string } }

function GetComplaint(props: GetComplaintProps) {
  const { data, isSuccess } = useGetComplaint()

  return (
    <HandleLoading isSuccess={isSuccess}>
      <Components.Form 
        complaint={data?.data}
        handleDeleteBtn={props.handleDeleteBtn} />
    </HandleLoading>
  )
}

export default GetComplaint