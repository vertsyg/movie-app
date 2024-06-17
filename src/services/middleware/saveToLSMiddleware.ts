import { Middleware } from "redux";
import { ADD_FAVORITE_MOVIE, DELETE_FAVORITE_MOVIE } from "../actions/favoriteMovies";

export const saveToLocalStorageMiddleware: Middleware = store => next => action => {
  const result = next(action)
  const state = store.getState()

  if (action.type === ADD_FAVORITE_MOVIE || action.type === DELETE_FAVORITE_MOVIE) {
    localStorage.setItem('favoriteMovies', JSON.stringify(state.favoriteMovies.favoriteMovies));
  }

  return result;
}