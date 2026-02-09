import { Link } from 'react-router'
import icon from '@/assets/icons/api/api.png'
import { useHandleDocsBtn } from './hooks'

export const DocsBtn = () => {
  const visible = useHandleDocsBtn()

  if(!visible) return null

  return (
    <Link to={'/docs'} className="absolute flex flex-col items-center text-neutral-content bottom-4 right-6 hover:text-secondary">
      <img src={icon} alt="API docs icon" className="w-8" />
      <small className="uppercase">API Docs</small>
    </Link>
  )
}
