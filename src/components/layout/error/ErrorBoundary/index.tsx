import { useNavigate } from "react-router"
import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary"

type ErrorBoundaryProps = { href: string, children: React.ReactNode }

function ErrorBoundary(props: ErrorBoundaryProps) {
  const ErrorFallback = () => {
    const navigate = useNavigate()

    setTimeout(() => {
      navigate(props.href)
    }, (50))

    return null
  }

  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        // Reset any state or perform any action on reset
      }}
    >
      {props.children}
    </ReactErrorBoundary>
  )
}

export default ErrorBoundary