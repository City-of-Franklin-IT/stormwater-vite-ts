import { useLocation, Link } from "react-router"
import { useMsal } from "@azure/msal-react"
import { APP_TITLE } from "../../../config"
import cofIcon from "@/assets/icons/cof/cof-primary-content.svg"
import { useReturnUserRoles } from "@/helpers/hooks"
import useHandleLogoutRedirect from "@/context/Auth/hooks/useHandleLogoutRedirect"
import { useGetInspectors, useIsEnforcmentPageActive } from "./hooks"
import NavDropdown from "../nav/NavDropdown"

// Types
import * as AppTypes from "@/context/App/types"

export const Title = () => {
  const { pathname } = useLocation()

  const href = pathname === "/" ? "/" : "/sites"

  return (
    <Link to={href} className="flex flex-col text-primary-content text-center mt-4 w-fit lg:my-4">
      <div className="flex gap-4 text-primary-content items-center justify-center">
        <img src={cofIcon} alt="cof icon" className="w-20" />
        <h1 className="text-lg font-bold text-center md:text-xl lg:text-3xl">{APP_TITLE}</h1>
      </div>
    </Link>
  )
}

export const Buttons = () => {
  const pathname = useLocation().pathname

  if(pathname === "/") return null // Hide on login page

  return (
    <div className="flex flex-nowrap gap-2 overflow-visible w-full pl-4">
      <HeaderLink href={"/sites"}>Sites</HeaderLink>
      <HeaderLink href={"/contacts"}>Contacts</HeaderLink>
      <InspectorsMenu />
      <EnforcementMenu />
      <CreateMenu />
      <LogoutBtn />
    </div>
  )
}

type HeaderLinkProps = { href: string, children: React.ReactNode }

const HeaderLink = (props: HeaderLinkProps) => {
  const pathname = useLocation().pathname

  const active = pathname === props.href

  return (
    <Link to={props.href} className={`btn btn-ghost rounded-none uppercase hover:bg-primary hover:shadow-none ${ active ? "text-warning" : "text-neutral-content" }`}>{props.children}</Link>
  )
}

const InspectorsMenu = () => {
  const pathname = useLocation().pathname

  const active = pathname.includes("/inspectors")

  const { data } = useGetInspectors()

  return (
    <NavDropdown 
      label={"Inspectors"}
      active={active}>
        {data?.data.map(inspector => {
          return (
            <InspectorMenuItem 
              key={`inspector-menu-${ inspector.slug }`}
              inspector={inspector} />
          )
        })}
    </NavDropdown>
  )
}

const InspectorMenuItem = ({ inspector }: { inspector: AppTypes.InspectorInterface }) => {

  return (
    <li key={`inspector-${ inspector.uuid }`}><Link to={`/inspectors/${ inspector.slug }`} className="hover:cursor-pointer hover:bg-neutral">{inspector.name}</Link></li>
  )
}

const EnforcementMenu = () => {
  const active = useIsEnforcmentPageActive()

  return (
    <NavDropdown 
      label={"Enforcement"}
      active={active}>
        <EnforcementMenuItem href={"/enforcement/violations"}>Construction Violations</EnforcementMenuItem>
        <EnforcementMenuItem href={"/enforcement/complaints"}>Complaints</EnforcementMenuItem>
        <EnforcementMenuItem href={"/enforcement/discharges"}>Illicit Discharges</EnforcementMenuItem>
    </NavDropdown>
  )
}

type EnforcementMenuItemProps = { href: string, children: React.ReactNode }

const EnforcementMenuItem = (props: EnforcementMenuItemProps) => {
  const pathname = useLocation().pathname

  const active = pathname.includes(props.href)

  return (
    <li><Link to={props.href} className={`hover:cursor-pointer hover:bg-neutral ${ active ? "text-warning" : null }`}>{props.children}</Link></li>
  )
}

const CreateMenu = () => {
  const pathname = useLocation().pathname

  const active = pathname.includes("create")

  const roles = useReturnUserRoles()

  if(!roles.includes("task.write")) return null // Viewers

  return (
    <NavDropdown
      label={"Create"}
      active={active}>
        <CreateMenuItem href={"/create/site"}>Site</CreateMenuItem>
        <CreateMenuItem href={"/create/enforcement/violations"}>Construction Violation</CreateMenuItem>
        <CreateMenuItem href={"/create/enforcement/complaints"}>Complaint</CreateMenuItem>
        <CreateMenuItem href={"/create/enforcement/discharges"}>Illicit Discharge</CreateMenuItem>
        <CreateMenuItem href={"/create/contact"}>Contact</CreateMenuItem>
        <CreateMenuItem href={"/create/inspector"}>Inspector</CreateMenuItem>
    </NavDropdown>
  )
}

type CreateMenuItemProps = { href: string, children: React.ReactNode }

const CreateMenuItem = (props: CreateMenuItemProps) => {
  const pathname = useLocation().pathname

  const active = pathname.includes(props.href)

  return (
    <li><Link to={props.href} className={`hover:cursor-pointer hover:bg-neutral ${ active ? "text-warning" : null }`}>{props.children}</Link></li>
  )
}

const LogoutBtn = () => { // Logout button
  const { instance } = useMsal()
  const activeAccount = instance.getActiveAccount()

  const handleLogoutRedirect = useHandleLogoutRedirect()

  if(!activeAccount) return null

  return (
    <button 
      type="button"
      onClick={handleLogoutRedirect}
      className="btn btn-ghost text-neutral-content rounded-none uppercase hover:bg-primary hover:shadow-none">
        Logout
    </button>
  )
}