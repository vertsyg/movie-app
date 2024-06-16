import { AppDispatch } from "../../types/hooks"
import { fetchMovies } from "../../utils/api"

export const GET_MOVIES_REQUEST = 'GET_MOVIES_REQUEST'
export const GET_MOVIES_SUCCESS = 'GET_MOVIES_SUCCESS'
export const GET_MOVIES_ERROR = 'GET_MOVIES_ERROR'

export const getMovies = () => (dispatch: AppDispatch) => {
  dispatch({type: GET_MOVIES_REQUEST})
  fetchMovies()
    .then(res => {
      dispatch({
        type: GET_MOVIES_SUCCESS,
        movies: res.docs
      })
    })
    .catch(err => {
      console.error(err)
      dispatch({type:GET_MOVIES_ERROR})
    })
}