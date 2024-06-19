import { HEADERS, URL } from "../constants/api"

export const checkResponse = (res:Response) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err))
}

export const request = async (endpoint:string, options?:RequestInit) => {
  const res = await fetch(`${URL}/${endpoint}`, options)
  return checkResponse(res)
}

export const fetchMovies = (page: number) => {
  return request(`movie?page=${page}&limit=50`, HEADERS)
};


export const fetchMovie = (movieId : string) => {
  return request(`movie/${movieId}`, HEADERS)
}