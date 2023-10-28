export interface Product {
  id?: number
  name: string
  slug?: string
  description: string
  price: number
  rating?: number
  count_in_Stock: number;
  category: string
  image: File | null;
  quantity?: number
  num_reviews?: number
}

export interface Order_items {
  category: string;
  description: string;
  id: number;
  image: string;
  order: number;
  price: number; 
  product: string;
  quantity: number;
}

export interface User {
  id?: number;
  email: string;
  name: string;
  last_name: string
  avatar: File | null
}

export interface Order {
  id?: number;
  total_price: number;
  address: string;
  city: string;
  postal_code: string;
  country: string;
  order_items: Product[];
  created_at?: string;
}

export interface Token {
  exp: number;
  user_id: number;
  is_staff: boolean;
  email: string;
  name: string;
  last_name: string
  avatar: File | null;
}