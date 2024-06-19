import { Box, Checkbox, FormControl, FormControlLabel, FormGroup, Pagination } from "@mui/material"
import { ErrorMessage } from "../../components/erorrMessage/errorMessage"
import { Loader } from "../../components/loader/loader"
import { MovieCard } from "../../components/movieCard/movieCard"
import { getAllMovies, getErrorMessage, getLoading, getNumberOfPages } from "../../services/selectors"
import { useAppDispatch, useAppSelector } from "../../types/hooks"

import styles from './mainPage.module.css'
import { ChangeEvent, useEffect, useState } from "react"
import { getMovies } from "../../services/actions/movies"
import { fetchGenres } from "../../utils/api"

export const MainPage = () => {
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(1)

  const [genres, setGenres] = useState<string[]>([])
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])

  const movies = useAppSelector(getAllMovies);
  const pages = useAppSelector(getNumberOfPages)
  const errorMessage = useAppSelector(getErrorMessage)
  const loading = useAppSelector(getLoading)

  useEffect(() => {
    dispatch(getMovies(currentPage, selectedGenres))
    fetchGenres().then(genres => setGenres(genres))
  }, [currentPage, selectedGenres])

  const handlePageChange = (event: ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page)
  }

  const handleGenreChange = (event: ChangeEvent<HTMLInputElement>) => {
    const index = selectedGenres.indexOf(event.target.value)
    if (index === -1) {
      setSelectedGenres([...selectedGenres, event.target.value])
    } else {
      setSelectedGenres(selectedGenres.filter(genre => genre !== event.target.value))
    }
  }

  return (
    <>
      {loading && <Loader/>}
      {errorMessage && <ErrorMessage error={errorMessage}/>}
      {genres.length !== 0 &&
        <>
          <div>
            <Box>
              <FormControl>
                <h2>Фильтры</h2>
                <div className={styles.genres_form}>
                <FormGroup>
                  {
                    genres.map(genre => 
                      <FormControlLabel 
                        key={genre}
                        label={genre}
                        value={genre}
                        control={<Checkbox value={genre} checked={selectedGenres.includes(genre)} onChange={handleGenreChange}/>}
                      />
                    )
                  }
                </FormGroup>
                </div>
              </FormControl>
            </Box>
          </div>
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
      }
    </>
  )
}