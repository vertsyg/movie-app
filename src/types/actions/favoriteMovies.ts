import { ADD_FAVORITE_MOVIE, DELETE_FAVORITE_MOVIE } from "../../services/actions/favoriteMovies"
import { TMovie } from "../movie"

interface AddFavoriteMovieAction {
  type: typeof ADD_FAVORITE_MOVIE,
  movie: TMovie
}

interface DeleteFavoriteMovieAction {
  type: typeof DELETE_FAVORITE_MOVIE,
  movie: TMovie
}

export type FavoriteMoviesAction = AddFavoriteMovieAction | DeleteFavoriteMovieAction