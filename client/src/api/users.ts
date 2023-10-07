import {axi, authApi} from "./useAxios";
import axios from "axios";
import { User } from "../Interfaces";

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

export const edit_user = async (data: User) => {  
  const formData = new FormData();
  formData.append('name', data.name)
  formData.append('last_name', data.last_name)
  formData.append('email', data.email)
  if(data.avatar  && typeof data.avatar !== "string") {
    formData.append('avatar', data.avatar)
  }  
  await authApi.put(`/users/edit/${data.id}`, formData)
  //await authApi.put<Product>(`/product/edit/${data.id}/`, formData)
}

export const delete_user = async (id:number) => { 
  await authApi.delete(`/users/delete/${id}`)
}