import axios from 'axios';
import type {
  Pet,
  Product,
  Service,
  Booking,
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  BookingRequest,
  User
} from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ==================== AUTH API ====================
export const register = async (data: RegisterRequest): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/register', data);
  return response.data;
};

export const login = async (data: LoginRequest): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/login', data);
  return response.data;
};

export const logout = async (): Promise<void> => {
  await api.post('/logout');
};

export const getCurrentUser = async (): Promise<User> => {
  const response = await api.get<User>('/user');
  return response.data;
};

// ==================== PETS API ====================
export const getPets = async (): Promise<Pet[]> => {
  const response = await api.get<Pet[]>('/pets');
  return response.data;
};

export const getPetById = async (id: number): Promise<Pet> => {
  const response = await api.get<Pet>(`/pets/${id}`);
  return response.data;
};

// ==================== PRODUCTS API ====================
export const getProducts = async (): Promise<Product[]> => {
  const response = await api.get<Product[]>('/products');
  return response.data;
};

export const getProductById = async (id: number): Promise<Product> => {
  const response = await api.get<Product>(`/products/${id}`);
  return response.data;
};

// ==================== SERVICES API ====================
export const getServices = async (): Promise<Service[]> => {
  const response = await api.get<Service[]>('/services');
  return response.data;
};

export const getServiceById = async (id: number): Promise<Service> => {
  const response = await api.get<Service>(`/services/${id}`);
  return response.data;
};

// ==================== BOOKINGS API ====================
export const getBookings = async (): Promise<Booking[]> => {
  const response = await api.get<Booking[]>('/bookings');
  return response.data;
};

export const createBooking = async (data: BookingRequest): Promise<Booking> => {
  const response = await api.post<Booking>('/bookings', data);
  return response.data;
};

// ==================== ADMIN API ====================

// Admin Pets
export const adminGetPets = async (): Promise<Pet[]> => {
  const response = await api.get<Pet[]>('/admin/pets');
  return response.data;
};

export const adminCreatePet = async (data: FormData): Promise<Pet> => {
  const response = await api.post<Pet>('/admin/pets', data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data;
};

export const adminUpdatePet = async (id: number, data: FormData): Promise<Pet> => {
  const response = await api.post<Pet>(`/admin/pets/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data;
};

export const adminDeletePet = async (id: number): Promise<void> => {
  await api.delete(`/admin/pets/${id}`);
};

// Admin Products
export const adminGetProducts = async (): Promise<Product[]> => {
  const response = await api.get<Product[]>('/admin/products');
  return response.data;
};

export const adminCreateProduct = async (data: FormData): Promise<Product> => {
  const response = await api.post<Product>('/admin/products', data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data;
};

export const adminUpdateProduct = async (id: number, data: FormData): Promise<Product> => {
  const response = await api.post<Product>(`/admin/products/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data;
};

export const adminDeleteProduct = async (id: number): Promise<void> => {
  await api.delete(`/admin/products/${id}`);
};

// Admin Services
export const adminGetServices = async (): Promise<Service[]> => {
  const response = await api.get<Service[]>('/admin/services');
  return response.data;
};

export const adminCreateService = async (data: Partial<Service>): Promise<Service> => {
  const response = await api.post<Service>('/admin/services', data);
  return response.data;
};

export const adminUpdateService = async (id: number, data: Partial<Service>): Promise<Service> => {
  const response = await api.put<Service>(`/admin/services/${id}`, data);
  return response.data;
};

export const adminDeleteService = async (id: number): Promise<void> => {
  await api.delete(`/admin/services/${id}`);
};

// Admin Bookings
export const adminGetBookings = async (): Promise<Booking[]> => {
  const response = await api.get<Booking[]>('/admin/bookings');
  return response.data;
};

export const adminUpdateBooking = async (id: number, status: Booking['status']): Promise<Booking> => {
  const response = await api.put<Booking>(`/admin/bookings/${id}`, { status });
  return response.data;
};

export const adminDeleteBooking = async (id: number): Promise<void> => {
  await api.delete(`/admin/bookings/${id}`);
};

export default api;
