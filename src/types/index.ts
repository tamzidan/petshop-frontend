export interface Pet {
  id: number;
  name: string;
  description?: string;
  image_url?: string;
  created_at?: string;
  updated_at?: string;
  products?: Product[];
  services?: Service[];
}

export interface Product {
  id: number;
  pet_id: number;
  name: string;
  description: string;
  price: number;
  image_url?: string;
  shopee_url?: string;
  tokopedia_url?: string;
  lazada_url?: string;
  created_at?: string;
  updated_at?: string;
  pet?: Pet;
}

export interface Service {
  id: number;
  pet_id: number;
  name: string;
  description: string;
  price: number;
  image_url?: string;
  created_at?: string;
  updated_at?: string;
  pet?: Pet;
}

export interface User {
  id: number;
  name: string;
  whatsapp_number: string;
  whatsapp_verified_at?: string;
  role: 'admin' | 'user';
  created_at?: string;
  updated_at?: string;
}

export interface Booking {
  id: number;
  user_id: number;
  service_id: number;
  booking_date: string;
  booking_time: string;
  notes?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  created_at?: string;
  updated_at?: string;
  user?: User;
  service?: Service;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface AuthResponse {
  message: string;
  access_token: string;
  token_type: string;
  user: User;
}

export interface LoginRequest {
  whatsapp_number: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  whatsapp_number: string;
  password: string;
  password_confirmation: string;
}

export interface BookingRequest {
  service_id: number;
  booking_date: string;
  booking_time: string;
  notes?: string;
}

export interface Slider {
  id: number;
  title: string;
  description?: string;
  image_url: string;
  link_url?: string;
  is_active: boolean;
  order: number;
  created_at?: string;
  updated_at?: string;
}
