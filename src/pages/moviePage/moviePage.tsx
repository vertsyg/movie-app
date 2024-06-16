import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { fetchMovie } from "../../utils/api"
import { TMovie } from "../../types/movie"

import styles from "./moviePage.module.css"
import calendar from '../../images/calendar.svg'
import star from '../../images/star.svg'
import { Loader } from "../../components/loader/loader"
import { ErrorMessage } from "../../components/erorrMessage/errorMessage"
import { useAppDispatch, useAppSelector } from "../../types/hooks"
import { ADD_FAVORITE_MOVIE, DELETE_FAVORITE_MOVIE } from "../../services/actions/favoriteMovies"
import { getFavoriteMovies } from "../../services/selectors"

export const MoviePage = () => {
  const { movieId } = useParams()
  const dispatch = useAppDispatch()

  const [movie, setMovie] = useState<TMovie | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState('')
  const genres = movie?.genres?.map(genre => genre.name)

  const favoriteMovies = useAppSelector(getFavoriteMovies)
  const isFavorite = favoriteMovies.some(favMovie => favMovie.id === movie?.id)
  
  useEffect(() => {
    if (movieId) {
      fetchMovie(movieId)
        .then(movie => setMovie(movie))
        .catch(error => setError(error.message))
        .finally(() => setLoading(false))
    }
  }, [movieId])

  const handleButtonClick = () => {
    if (isFavorite) {
      dispatch({
        type: DELETE_FAVORITE_MOVIE,
        movie: movie
      });
    } else {
      dispatch({
        type: ADD_FAVORITE_MOVIE,
        movie: movie
      });
    }
  };

  return (
    <>
      {error && <ErrorMessage error={error}/>}
      {loading && <Loader/>}
      {movie && (
        <div className={styles.movie}>
          <div className={styles.movie_data}>
            <h2>{movie.name ? movie.name : movie.alternativeName}</h2>
            <div className={styles.movie_info}>
              {
                genres?.slice(0,2).map(genre => <div key={genre} className={styles.movie_info_genre}>{genre}</div>)
              }
              <div className={styles.movie_year}>
                <img className={styles.svg} src={calendar} alt='календарь'/>
                <p>{movie.year}</p>
              </div>
              <div className={styles.movie_rating}>
                <img className={styles.svg} src={star} alt='рейтинг'/>
                <p>{movie.rating.kp}</p>
              </div>
            </div>
            <p className={styles.description}>{movie.description}</p>
            <button 
              className={styles.favorites}
              onClick={handleButtonClick}
            >
              {isFavorite ? '- Удалить из избранного' : '+ Добавить в избранное'}
            </button>
          </div>
            <img 
              className={styles.movie_image}
              src={movie.poster?.url} 
              alt={movie.name}
            />
        </div>
      )}
    </>
  )
}