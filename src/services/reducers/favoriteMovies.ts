import { TMovie } from "../../types/movie"
import { ADD_FAVORITE_MOVIE, DELETE_FAVORITE_MOVIE } from "../actions/favoriteMovies"
import { FavoriteMoviesAction } from "../../types/actions/favoriteMovies"

type TFavMoviesState = {
  favoriteMovies: TMovie[] | []
}

const favMoviesInitialState : TFavMoviesState = {
  favoriteMovies: JSON.parse(localStorage.getItem('favoriteMovies') || '[]')
}

export const favoriteMoviesReducer = (state = favMoviesInitialState, action: FavoriteMoviesAction) => {
  switch (action.type) {
    case ADD_FAVORITE_MOVIE: {
      return {
        ...state,
        favoriteMovies: [...state.favoriteMovies, action.movie]
      }
    }
    case DELETE_FAVORITE_MOVIE: {
      return {
        ...state,
        favoriteMovies: state.favoriteMovies.filter(i => i.id !== action.movie.id)
      }
    }
    default: 
      return state
  }
}