import { authApi } from "./useAxios"
import axios from "axios";
import { Order } from "../Interfaces"

export const create_order = async (data: Order) => {
  await authApi.post('/orders/create/', data)
}

export const my_orders = async () => {
  const response = await authApi.get(`orders/my/orders/`)
  return response.data
}