import { Box, Checkbox, FormControl, FormControlLabel, FormGroup, Pagination, Slider } from "@mui/material"
import { ErrorMessage } from "../../components/erorrMessage/errorMessage"
import { Loader } from "../../components/loader/loader"
import { MovieCard } from "../../components/movieCard/movieCard"
import { getAllMovies, getErrorMessage, getLoading, getNumberOfPages } from "../../services/selectors"
import { useAppDispatch, useAppSelector } from "../../types/hooks"

import styles from './mainPage.module.css'
import { ChangeEvent, useEffect, useState } from "react"
import { getMovies } from "../../services/actions/movies"
import { fetchGenres } from "../../utils/api"
import { ratingMarks, yearsMarks } from "../../utils/marks"

export const MainPage = () => {
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(1)

  const [genres, setGenres] = useState<string[]>([])
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])
  const [years, setYears] = useState<number[]>([1990, 2025])
  const [rating, setRating] = useState<number[]>([0, 10])

  const movies = useAppSelector(getAllMovies);
  const pages = useAppSelector(getNumberOfPages)
  const errorMessage = useAppSelector(getErrorMessage)
  const loading = useAppSelector(getLoading)

  useEffect(() => {
    dispatch(getMovies(currentPage, selectedGenres, years, rating))
    fetchGenres().then(genres => setGenres(genres))
  }, [currentPage, selectedGenres, years, rating])

  // @ts-expect-error: 'event' is declared but its value is never read.
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

  // @ts-expect-error: 'event' is declared but its value is never read.
  const handleYearsChange = (event: Event, newValue: number | number[]) => {
    setYears(newValue as number[]);
  }

  // @ts-expect-error: 'event' is declared but its value is never read.
  const handleRatingChange = (event: Event, newValue: number | number[]) => {
    setRating(newValue as number[]);
  }

  return (
    <>
      {genres.length !== 0 &&
        <>
          <h2>Фильтры</h2>
          <div className={styles.filters}>
            <Box>
              <FormControl sx={{ width: 230 }}>
                <p>Жанры:</p>
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
            <div className={styles.genres_rating}>
              <Box sx={{ width: '100%', display: 'flex', gap: 8 }}>
                <p>Годы:</p>
                <Slider
                  value={years}
                  onChange={handleYearsChange}
                  valueLabelDisplay="auto"
                  min={1990}
                  max={2025}
                  marks={yearsMarks}
                />
              </Box>
              <Box sx={{ width: '100%', display: 'flex', gap: 4 }}>
                <p>Рейтинг:</p>
                <Slider
                  value={rating}
                  onChange={handleRatingChange}
                  valueLabelDisplay="auto"
                  min={1}
                  max={10}
                  marks={ratingMarks}
                  step={0.1}
                />
              </Box>
            </div>
          </div>
        </>
      }
      {loading && <Loader/>}
      {errorMessage && <ErrorMessage error={errorMessage}/>}
      {movies && <div className={styles.mainPage}>
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
      </div>}
    </>
  )
}