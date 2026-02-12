import styles from "@/components/form-elements/Forms.module.css"

function FormError({ error }: { error: string | undefined }) {

  if(!error) return null

  return (
    <div className={styles.error}>{error}</div>
  )
}

export default FormError