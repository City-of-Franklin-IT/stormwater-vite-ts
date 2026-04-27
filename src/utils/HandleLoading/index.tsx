// Components
import Loading from "@/components/layout/loading/Loading"

type HandleLoadingProps = { isLoading: boolean, children: React.ReactNode }

function HandleLoading(props: HandleLoadingProps) {
  if(props.isLoading) return <Loading />
  
  return <>{props.children}</>
}

export default HandleLoading