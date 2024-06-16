import { combineReducers } from "redux";
import { moviesReducer } from "./reducers/moviesReducer";
import { configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  movies: moviesReducer
})

export const store = configureStore({
  reducer: rootReducer
})