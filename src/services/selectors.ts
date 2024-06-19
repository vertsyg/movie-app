import { RootState } from "../types/hooks"

export const getLoading = (state : RootState) => state.movies.moviesRequest
export const getError = (state : RootState) => state.movies.moviesFailed
export const getAllMovies = (state : RootState) => state.movies.movies
export const getNumberOfPages = (state : RootState) => state.movies.pages
export const getErrorMessage = (state : RootState) => state.movies.moviesErrorMessage

export const getFavoriteMovies = (state : RootState) => state.favoriteMovies.favoriteMovies