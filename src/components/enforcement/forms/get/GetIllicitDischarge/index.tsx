import { useGetIllicitDischarge } from "./hooks"

// Components
import Loading from "@/components/layout/loading/Loading"
import * as Components from "./components"

type GetIllicitDischargeProps = { 
  handleDeleteBtn: { 
    onClick: React.MouseEventHandler<HTMLButtonElement>
    label: string 
  } 
}

function GetIllicitDischarge(props: GetIllicitDischargeProps) {
  const { data, isLoading } = useGetIllicitDischarge()

  if(isLoading) return <Loading />

  return (
    <Components.Form 
      illicitDischarge={data?.data}
      handleDeleteBtn={props.handleDeleteBtn} />
  )
}

export default GetIllicitDischarge