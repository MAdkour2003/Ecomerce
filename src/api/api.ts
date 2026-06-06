import axios from 'axios';
import type { Product } from '../types';

const api = axios.create({
  baseURL: 'https://fakestoreapi.com',
  timeout: 10000,
});

export const getProducts = (): Promise<Product[]> =>
  api.get<Product[]>('/products').then((res) => res.data);

export const getProductById = (id: number | string): Promise<Product> =>
  api.get<Product>(`/products/${id}`).then((res) => res.data);

export default api;
