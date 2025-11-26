import { Link } from 'react-router'
import styles from './CreateLink.module.css'

type CreateLinkProps = { href: string, children: React.ReactNode }

function CreateLink(props: CreateLinkProps) {
  
  return (
    <Link 
      className={styles.createLink} 
      to={props.href}>
        {props.children}
    </Link>
  )
}

export default CreateLink