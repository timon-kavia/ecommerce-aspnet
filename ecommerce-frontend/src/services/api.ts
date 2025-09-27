import axios from 'axios';
import type { Product, Category, Order } from '../types';

const API_BASE_URL = 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Products API
export const getProducts = async (): Promise<Product[]> => {
  const response = await api.get('/products');
  return response.data;
};

export const getProductById = async (id: number): Promise<Product> => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

export const getProductsByCategory = async (categoryId: number): Promise<Product[]> => {
  const response = await api.get(`/products/category/${categoryId}`);
  return response.data;
};

// Categories API
export const getCategories = async (): Promise<Category[]> => {
  const response = await api.get('/categories');
  return response.data;
};

export const getCategoryById = async (id: number): Promise<Category> => {
  const response = await api.get(`/categories/${id}`);
  return response.data;
};

// Orders API
export const getOrders = async (): Promise<Order[]> => {
  const response = await api.get('/orders');
  return response.data;
};

export const getOrderById = async (id: number): Promise<Order> => {
  const response = await api.get(`/orders/${id}`);
  return response.data;
};

export const createOrder = async (order: Order): Promise<Order> => {
  const response = await api.post('/orders', order);
  return response.data;
};

export default api;