import { authApi } from "./useAxios"
import axios from "axios";
import { Order } from "../Interfaces"

export const create_order = async (data: Order) => {
  await authApi.post('/orders/create/', data)
  console.log("URL_CREATE_ORDER: ", data)
}

export const my_orders = async () => {
  const response = await authApi.get(`orders/my/orders/`)
  return response.data
}

export const solo_order = async (id: number) => {
  const response = await authApi.get(`/orders/solo/${id}/`)
  return response.data 
}

export const get_orders = async () => {
  const response = await authApi.get(`/orders/`)
  return response.data
}

export const search_order = async (query: string) => {
  const response = await authApi.get(`/orders/search/?query=${query}`)
  console.log("SEARCH_ORDER: ", response.data)
  return response.data
}

export const edit_order = async (id: number) => {
  await authApi.put(`/orders/deliver/${id}/`)
}