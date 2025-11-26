import { handleNavDropdown } from './utils'

// Types
import { PagesType } from '../../Header/context'

type NavDropdownProps = { label: PagesType, active: boolean, children: React.ReactNode }

function NavDropdown(props: NavDropdownProps) {
  const className = handleNavDropdown(props.active)

  return (
    <div className="dropdown dropdown-hover dropdown-left">
      <div tabIndex={0} role="button" className={className}>{props.label}</div>
      <ul tabIndex={0} className="dropdown-content menu bg-primary/80 text-neutral-content z-[1] w-52 outline">
        {props.children}
      </ul>
    </div>
  )
}

export default NavDropdown