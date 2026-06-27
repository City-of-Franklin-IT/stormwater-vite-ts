import { useGetComplaint } from "./hooks"

// Components
import Loading from "@/components/layout/loading/Loading"
import * as Components from "./components"

type GetComplaintProps = { 
  handleDeleteBtn: { 
    onClick: React.MouseEventHandler<HTMLButtonElement>
    label: string 
  } 
}

function GetComplaint(props: GetComplaintProps) {
  const { data, isLoading } = useGetComplaint()

  if(isLoading) return <Loading />

  return (
    <Components.Form 
      complaint={data?.data}
      handleDeleteBtn={props.handleDeleteBtn} />
  )
}

export default GetComplaint