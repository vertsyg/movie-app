import { MovieCard } from "../../components/movieCard/movieCard"
import { getAllMovies } from "../../services/selectors"
import { useAppSelector } from "../../types/hooks"

import styles from './mainPage.module.css'

export const MainPage = () => {
  // TODO: добавить лоадер и ошибку
  const movies = useAppSelector(getAllMovies)
  return (
    <>
      <h2>Список фильмов</h2>
      <div className={styles.cards}>
        {
          movies.map(movie => 
          <MovieCard 
            id={movie.id}
            name={movie.name}
            alternativeName={movie.alternativeName}
            year={movie.year}
            poster={movie.poster}
            rating={movie.rating}
          />)
        }
      </div>
    </>
  )
}