import axios, { AxiosInstance, AxiosResponse } from "axios";

import type { Product } from "../types";

export const api: AxiosInstance = axios.create({
  baseURL: "https://fakestoreapi.com",
  timeout: 15000,
});

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) =>
    Promise.reject(new Error(error.response?.data?.message || "network error")),
);

// const api = axios.create({
//   baseURL: 'https://fakestoreapi.com',
//   timeout: 10000,
// });

export const getProducts = (): Promise<Product[]> =>
  api.get<Product[]>("/products").then((res) => res.data);

export const getProductById = (id: number | string): Promise<Product> =>
  api.get<Product>(`/products/${id}`).then((res) => res.data);

export default api;
