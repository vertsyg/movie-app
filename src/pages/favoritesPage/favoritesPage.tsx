import { MovieCard } from "../../components/movieCard/movieCard"
import { getFavoriteMovies } from "../../services/selectors"
import { useAppSelector } from "../../types/hooks"

import styles from "./favoritesPage.module.css"

export const FavoritePage = () => {
  const favoriteMovies = useAppSelector(getFavoriteMovies)

  return (
    <div className={styles.cards}>
      {favoriteMovies.length !== 0 ? (
        favoriteMovies.map(movie => 
          <MovieCard 
            key={movie.id}
            id={movie.id}
            name={movie.name}
            alternativeName={movie.alternativeName}
            year={movie.year}
            poster={movie.poster}
            rating={movie.rating}
          />
        )
      ) : (
        <p>У вас еще нет фильмов в избранном</p>
      )}
    </div>
  )
}