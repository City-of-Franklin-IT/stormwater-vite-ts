import { useState } from "react"
import { useNavigate } from "react-router"
import { useReturnUserRoles } from "@/helpers/hooks"
import { setTableDataStyle } from "./utils"

// Types
import * as AppTypes from "@/context/App/types"

/**
* Returns sites table row onClick handler and className
**/
export const useHandleTableRow = (site: AppTypes.SiteInterface, index: number) => {
  const navigate = useNavigate()
  const roles = useReturnUserRoles()

  const onClick = () => {
    if(!roles.includes("task.write")) {
      return null
    }

    navigate(`/site/${ site.uuid }`)
  }

  const className = setTableDataStyle(index, site)

  return { onClick, className }
}

/**
* Returns sites table data props and hovered boolean
**/
export const useHandleTableData = () => {
  const [state, setState] = useState<{ hovered: boolean }>({ hovered: false })

  const tableDataProps = {
    onMouseEnter: () => setState({ hovered: true }),
    onMouseLeave: () => setState({ hovered: false })
  }

  return { tableDataProps, hovered: state.hovered }
}