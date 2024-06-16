import { TMovie } from "../../types/movie";

import styles from './movieCard.module.css'

export const MovieCard = (movie: TMovie) => {
  return (
    <div 
      key={movie.id}
      className={styles.movieCard}
    >
      {
        movie.poster?.url ? <img className={styles.movieCard_img} src={movie.poster.url} alt={movie.alternativeName}/> : ''
      }
      <div className={styles.movie_info}>
        <h3>{movie.name ? movie.name : movie.alternativeName}</h3>
        <span>{movie.rating.kp}</span> 
        <p>{movie.year}</p>
      </div>
    </div>
  )
}