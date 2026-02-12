import React from "react"
import icon from "../../../../assets/icons/recycle/recycle.svg"
import styles from "./DeleteBtn.module.css"

type DeleteBtnProps = { onClick: React.MouseEventHandler<HTMLButtonElement>, children: React.ReactNode }

function DeleteBtn(props: DeleteBtnProps) {
  
  return (
    <button 
      type="button"
      className={styles.btn}
      onClick={props.onClick}>
        <div className="flex items-center gap-2 hover:cursor-pointer">
          {props.children}
          <img src={icon} alt="recycle icon" className="w-4" />
        </div>
    </button>
  )
}

export default DeleteBtn