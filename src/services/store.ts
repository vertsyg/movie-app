import { combineReducers } from "redux";
import { moviesReducer } from "./reducers/moviesReducer";
import { configureStore } from "@reduxjs/toolkit";
import { favoriteMoviesReducer } from "./reducers/favoriteMovies";
import { saveToLocalStorageMiddleware } from "./middleware/saveToLSMiddleware";

const rootReducer = combineReducers({
  movies: moviesReducer,
  favoriteMovies: favoriteMoviesReducer
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(saveToLocalStorageMiddleware)
})