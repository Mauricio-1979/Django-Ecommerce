import { authApi, axi } from "./useAxios";
import axios from "axios";
import { Product } from "../Interfaces";


export const search_prod =async (query:string) => {
  const response = await authApi.get(`/product/search/?query=${query}`)
  return response.data
}

export const get_category = async (cate: string) => {
  const response = await authApi.get(`/product/category/${cate}`)
  return response.data
}

export const get_solo =async (slug: string) => {  
  
  const response = await authApi.get(`/product/name/${slug}`)
  return response.data
}

export const get_solo_prod =async (id: number) => {
  
  const response = await authApi.get(`/product/id/${id}`)
  return response.data
}

export const getProduct = async (name: string | undefined) => {
  if (!name) {
    throw new Error('No product found with that name.'); 
  }
  const res = await axi.get(`products/id/${name}`)
  return res.data
}

export const postProduct = async (data: Product) => {  
  const formData = new FormData();
  formData.append('name', data.name)
  formData.append('description', data.description)
  formData.append('count_in_stock', data.count_in_stock.toString())
  formData.append('category', data.category)
  formData.append('price', data.price.toString())
  if(data.image) {
    formData.append('image', data.image)
  }  
  await authApi.post('/product/post/', formData)
}

export const get_products = async ({ pageParam = 1 }) => {
  const response = await axios.get(`http://localhost:8000/product/?page=${pageParam}&pages=9`)
  return response.data
}

export const edit_product = async (data: Product) => {  
  
  const formData = new FormData();
  formData.append('name', data.name)
  formData.append('description', data.description)
  formData.append('count_in_stock', data.count_in_stock.toString())
  formData.append('category', data.category)
  formData.append('price', data.price.toString())
  if(data.image  && typeof data.image !== "string") {
    formData.append('image', data.image)
  }  
  await authApi.put(`/product/edit/${data.id}/`, formData)
  //await authApi.put<Product>(`/product/edit/${data.id}/`, formData)
}

export const delete_product = async (id: number) => {
  await authApi.delete(`/product/delete/${id}`)
}

export const create_review = async (id: number) => {
  await authApi.post(`/products/reviews/${id}`)
  //return response.data
} 
