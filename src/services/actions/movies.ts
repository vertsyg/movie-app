import { AppDispatch } from "../../types/hooks"
import { fetchMovies } from "../../utils/api"

export const GET_MOVIES_REQUEST = 'GET_MOVIES_REQUEST'
export const GET_MOVIES_SUCCESS = 'GET_MOVIES_SUCCESS'
export const GET_MOVIES_ERROR = 'GET_MOVIES_ERROR'

export const getMovies = (page:number, genres:string[]) => (dispatch: AppDispatch) => {
  dispatch({type: GET_MOVIES_REQUEST})
  fetchMovies(page, genres)
    .then(res => {
      dispatch({
        type: GET_MOVIES_SUCCESS,
        movies: res.docs,
        pages: res.pages
      })
    })
    .catch(err => {
      console.error(err)
      dispatch({type:GET_MOVIES_ERROR, moviesErrorMessage: err.message})
    })
}