import { useState } from 'react'
import { useQuery } from "@tanstack/react-query"
import { useEnableQuery } from "@/helpers/hooks"
import { authHeaders } from "@/helpers/utils"
import * as AppActions from '@/context/App/AppActions'

/**
* Returns docs from server
**/
export const useGetDocs = () => {
  const { enabled, token } = useEnableQuery()

  return useQuery({
    queryKey: ['getDocs'],
    queryFn: () => AppActions.getDocs(authHeaders(token)),
    enabled: enabled && !!token
  })
}

/**
* Returns endpoint item input checkbox props
**/
export const useHandleEndpointItem = () => {
  const [state, setState] = useState<{ isOpen: boolean }>({ isOpen: false })

  const onChange = () => {
    setState(prevState => ({ isOpen: !prevState.isOpen }))
  }

  return { checked: state.isOpen, onChange }
}
