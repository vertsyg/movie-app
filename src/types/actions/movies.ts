import { GET_MOVIES_ERROR, GET_MOVIES_REQUEST, GET_MOVIES_SUCCESS } from "../../services/actions/movies";
import { TMovie } from "../movie";

interface GetMoviesRequestAction {
  type: typeof GET_MOVIES_REQUEST,
}

interface GetMoviesSuccessAction {
  type: typeof GET_MOVIES_SUCCESS,
  movies: TMovie[]
}

interface GetMoviesErrorAction {
  type: typeof GET_MOVIES_ERROR,
  moviesErrorMessage: string
}

export type MoviesAction = GetMoviesRequestAction | GetMoviesSuccessAction | GetMoviesErrorAction