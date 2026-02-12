import styles from "./FormNavBtn.module.css"

type FormNavBtnProps = { isActive: boolean, onClick: React.MouseEventHandler<HTMLButtonElement>, children: React.ReactNode }

function FormNavBtn(props: FormNavBtnProps) {

  return (
    <button 
      type="button"
      className={props.isActive ? styles.activeBtn : styles.btn}
      onClick={props.onClick}>
        {props.children}
    </button>
  )
}

export default FormNavBtn