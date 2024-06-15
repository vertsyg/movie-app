import { NavLink } from 'react-router-dom'
import styles from './header.module.css'

export const Header = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.header_nav}>
        <NavLink  to='/'><h1>Movie App</h1></NavLink>
        <NavLink 
          to='/favorites'
          className={({ isActive }) => 
            isActive ? styles.header_nav_p_active : styles.header_nav_p
          }
        >
          Favorites
        </NavLink>
      </nav>
    </header>
  )
}