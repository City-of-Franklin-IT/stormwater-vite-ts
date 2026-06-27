import { useGetViolation } from "./hooks"

// Components
import Loading from "@/components/layout/loading/Loading"
import * as Components from "./components"

type GetViolationProps = { 
  handleDeleteBtn: { 
    onClick: React.MouseEventHandler<HTMLButtonElement>
    label: string 
  } 
}

function GetViolation(props: GetViolationProps) {
  const { data, isLoading } = useGetViolation()

  if(isLoading) return <Loading />

  return (
    <Components.Form 
        violation={data?.data}
        handleDeleteBtn={props.handleDeleteBtn} />
  )
}

export default GetViolation