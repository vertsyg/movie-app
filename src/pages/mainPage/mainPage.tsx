import { ErrorMessage } from "../../components/erorrMessage/errorMessage"
import { Loader } from "../../components/loader/loader"
import { MovieCard } from "../../components/movieCard/movieCard"
import { getAllMovies, getErrorMessage, getLoading } from "../../services/selectors"
import { useAppSelector } from "../../types/hooks"

import styles from './mainPage.module.css'

export const MainPage = () => {
  const movies = useAppSelector(getAllMovies)
  const errorMessage = useAppSelector(getErrorMessage)
  const loading = useAppSelector(getLoading)

  return (
    <>
      {loading && <Loader/>}
      {errorMessage && <ErrorMessage error={errorMessage}/>}
      <div className={styles.cards}>
        {
          movies.map(movie => 
          <MovieCard 
            key={movie.id}
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