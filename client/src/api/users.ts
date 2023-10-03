import {axi, authApi} from "./useAxios";
import axios from "axios";

export const registerRequest = async (email: string, name: string, last_name: string, password: string) => {
  await axios.post('http://localhost:8000/users/register/', {email, name, last_name, password})
}

export const loginRequest = async (email: string, password: string) => {
  const response = await axios.post('http://localhost:8000/users/login/', {email, password})
  return response
}

export const get_users = async () => {
  const response = await authApi.get('/users/get/')
  return response.data
}

export const search_users = async (query:string) => {
  const response = await authApi.get(`/users/search/?query=${query}`)
  return response.data
}

export const delete_user = async (id:number) => { 
  await authApi.delete(`/users/delete/${id}`)
}