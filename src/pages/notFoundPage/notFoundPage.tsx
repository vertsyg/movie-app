import styles from './notFoundPage.module.css'

export const NotFoundPage = () => {
  return (
    <div className={styles.not_found}>
      <div>
        <span className={styles.emoji}>(ಠ_ಠ)</span>
        <h2>Page not found</h2>
      </div>
    </div>
  )
}