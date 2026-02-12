// Components
import Loading from "@/components/layout/loading/Loading"

type HandleLoadingProps = { isSuccess: boolean, children: React.ReactNode }

function HandleLoading(props: HandleLoadingProps) {
  if(!props.isSuccess) return <Loading />
  
  return <>{props.children}</>
}

export default HandleLoading