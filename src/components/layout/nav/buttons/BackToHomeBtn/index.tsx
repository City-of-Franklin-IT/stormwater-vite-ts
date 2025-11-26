import { Link } from 'react-router'
import styles from './BackToHomeBtn.module.css'

function BackToHomeBtn() {
  
  return (
    <Link 
      to={'/sites'} 
      className={styles.btn}>
        Back To All Sites
    </Link>
  )
}

export default BackToHomeBtn