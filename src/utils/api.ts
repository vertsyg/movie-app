import { API_KEY, URL } from "../constants/api"

export const checkResponse = (res:Response) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err))
}

export const request = async (endpoint:string, options?:RequestInit) => {
  const res = await fetch(`${URL}/${endpoint}`, options)
  return checkResponse(res)
}

// TODO: 'эндпоинт в зависимости от номера страницы
export const fetchMovies = () => {
  return request('movie?page=1&limit=50', {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'X-API-KEY': API_KEY
    }
  })
};