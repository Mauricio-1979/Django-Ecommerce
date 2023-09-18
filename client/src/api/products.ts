import { authApi, axi } from "./useAxios";
import axios from "axios";
import { Product } from "../Interfaces";


export const get_products = async ({ pageParam = 1 }) => {
  const response = await axios.get(`http://localhost:8000/product/?page=${pageParam}&pages=9`)
  return response.data
}

export const delete_product = async (id: number) => {
  await authApi.delete(`/product/delete/${id}`)
}

export const postProduct = async (data: Product) => {
  console.log("estas por crear el objeto para guardar los datos");
  
  const formData = new FormData();
  formData.append('name', data.name)
  formData.append('description', data.description)
  formData.append('count_in_stock', data.count_in_stock.toString())
  formData.append('category', data.category)
  formData.append('price', data.price.toString())
  if(data.image) {
    formData.append('image', data.image)
  }
  console.log("llegaste hasta product api");
  
  await authApi.post('/product/post/', formData)
}