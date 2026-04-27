import { useGetComplaint } from "./hooks"

// Components
import HandleLoading from "@/utils/HandleLoading"
import * as Components from "./components"

type GetComplaintProps = { handleDeleteBtn: { onClick: React.MouseEventHandler<HTMLButtonElement>, label: string } }

function GetComplaint(props: GetComplaintProps) {
  const { data, isLoading } = useGetComplaint()

  return (
    <HandleLoading isLoading={isLoading}>
      <Components.Form 
        complaint={data?.data}
        handleDeleteBtn={props.handleDeleteBtn} />
    </HandleLoading>
  )
}

export default GetComplaint