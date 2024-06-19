import { HEADERS, URL } from "../constants/api"
import { Genre } from "../types/movie"

export const checkResponse = (res:Response) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err))
}

export const request = async (endpoint:string) => {
  const res = await fetch(`${URL}/${endpoint}`, HEADERS)
  return checkResponse(res)
}

export const fetchMovies = (page: number, genres: string[], years: number[], rating: number[]) => {
  const genresQuery = genres.map(genre => `genres.name=${genre}`).join('&')
  const yearsQuery = years.join('-')
  const ratingQuery = rating.join('-')
  if (genres.length === 0) {
    return request(`movie?page=${page}&limit=50&rating.kp=${ratingQuery}&year=${yearsQuery}`)
  } else {
    return request(`movie?page=${page}&limit=50&rating.kp=${ratingQuery}&${genresQuery}&year=${yearsQuery}`)
  }
};

export const fetchMovie = (movieId : string) => {
  return request(`movie/${movieId}`)
}

export const fetchGenres = async () => {
  // используется другая версия
  const genres = await fetch('https://api.kinopoisk.dev/v1/movie/possible-values-by-field?field=genres.name', HEADERS)
    .then(result => result.json())
    .then((genres: Genre[]) => genres.map(genre => genre.name))
  return genres
}