import { useLocation } from 'react-router'

/**
* Returns container className
**/
export const useSetStyle = (hovered: boolean | undefined) => {
  const { pathname } = useLocation()

  const textColor = (pathname === '/sites' || pathname.includes('inspectors')) && !hovered ?
    'text-neutral' : 
    'text-neutral-content'
  
  const fontWeight = pathname !== '/sites' && !pathname.includes('inspectors') ? 
    'font-bold' :
    'font-normal'

  const className = `flex gap-4 justify-around font-[play] uppercase m-auto w-fit ${ textColor } ${ fontWeight }`

  return className
}