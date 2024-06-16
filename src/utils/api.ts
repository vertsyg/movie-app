import { HEADERS, URL } from "../constants/api"

export const checkResponse = (res:Response) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err))
}

export const request = async (endpoint:string, options?:RequestInit) => {
  const res = await fetch(`${URL}/${endpoint}`, options)
  return checkResponse(res)
}

// TODO: 'эндпоинт в зависимости от номера страницы
export const fetchMovies = () => {
  return request('movie?page=1&limit=50', HEADERS)
};

export const fetchMovie = (movieId : string) => {
  return request(`movie/${movieId}`, HEADERS)
}