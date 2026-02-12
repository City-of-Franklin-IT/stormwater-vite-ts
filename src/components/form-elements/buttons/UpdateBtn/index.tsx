import styles from "./UpdateBtn.module.css"

type UpdateBtnProps = { onClick: React.MouseEventHandler<HTMLButtonElement>, disabled?: boolean, children: React.ReactNode }

function UpdateBtn(props: UpdateBtnProps) { 
  
  return (
    <button 
      type="button"
      disabled={props.disabled}
      onClick={props.onClick}
      className={styles.btn}>
        {props.children}
    </button>
  )
}

export default UpdateBtn