import { MoviesAction } from "../../types/actions/movies"
import { TMovie } from "../../types/movie"
import { GET_MOVIES_ERROR, GET_MOVIES_REQUEST, GET_MOVIES_SUCCESS } from "../actions/movies"

type TMoviesState = {
  movies: TMovie[] | [],
  moviesRequest: boolean,
  moviesFailed: boolean,
  moviesErrorMessage: null | string
}

const moviesInitialState : TMoviesState = {
  movies: [],
  moviesRequest: false,
  moviesFailed: false,
  moviesErrorMessage: null
}

export const moviesReducer = (state = moviesInitialState, action: MoviesAction) => {
  switch (action.type) {
    case GET_MOVIES_REQUEST: {
      return {
        ...state,
        moviesRequest: true,
        moviesFailed: false
      }
    }
    case GET_MOVIES_SUCCESS: {
      return {
        ...state,
        moviesRequest: false,
        movies: action.movies
      }
    }
    case GET_MOVIES_ERROR: {
      return {
        ...state,
        moviesRequest: false,
        moviesFailed: true,
        moviesErrorMessage: action.moviesErrorMessage
      }
    }
    default: 
      return state
  }
}