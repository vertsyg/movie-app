import styles from './errorMessage.module.css'

type TErrorMessage = {
  error: string
}

export const ErrorMessage = ({error} : TErrorMessage) => {
  return (
    <div className={styles.error}>
      <span className={styles.emoji}>(＞﹏＜)</span>
      <p>{error}</p>
    </div>
  )
}