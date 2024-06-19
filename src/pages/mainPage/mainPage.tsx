import { Pagination } from "@mui/material"
import { ErrorMessage } from "../../components/erorrMessage/errorMessage"
import { Loader } from "../../components/loader/loader"
import { MovieCard } from "../../components/movieCard/movieCard"
import { getAllMovies, getErrorMessage, getLoading, getNumberOfPages } from "../../services/selectors"
import { useAppDispatch, useAppSelector } from "../../types/hooks"

import styles from './mainPage.module.css'
import { ChangeEvent, useEffect, useState } from "react"
import { getMovies } from "../../services/actions/movies"

export const MainPage = () => {
  const dispatch = useAppDispatch()
  const [currentPage, setCurrentPage] = useState(1); 

  const movies = useAppSelector(getAllMovies)
  const pages = useAppSelector(getNumberOfPages)
  const errorMessage = useAppSelector(getErrorMessage)
  const loading = useAppSelector(getLoading)

  useEffect(() => {
    dispatch(getMovies(currentPage))
  }, [currentPage])

const handlePageChange = (event: ChangeEvent<unknown>, page: number) => {
  setCurrentPage(page);
};

  return (
    <>
      {loading && <Loader/>}
      {errorMessage && <ErrorMessage error={errorMessage}/>}
      <div className={styles.mainPage}>
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
        <Pagination 
          count={pages} 
          variant="outlined" 
          color="primary"
          onChange={handlePageChange}
        />
      </div>
    </>
  )
}