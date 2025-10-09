import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, LoginRequest, RegisterRequest } from '../types';
import { login as apiLogin, register as apiRegister, logout as apiLogout, getCurrentUser } from '../services/api';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading: boolean;

  // Actions
  login: (data: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: localStorage.getItem('auth_token'),
      isAuthenticated: false,
      isAdmin: false,
      loading: false,

      login: async (data: LoginRequest) => {
        try {
          set({ loading: true });
          const response = await apiLogin(data);

          localStorage.setItem('auth_token', response.access_token);

          set({
            user: response.user,
            token: response.access_token,
            isAuthenticated: true,
            isAdmin: response.user.role === 'admin',
            loading: false
          });
        } catch (error) {
          set({ loading: false });
          throw error;
        }
      },

      register: async (data: RegisterRequest) => {
        try {
          set({ loading: true });
          const response = await apiRegister(data);

          localStorage.setItem('auth_token', response.access_token);

          set({
            user: response.user,
            token: response.access_token,
            isAuthenticated: true,
            isAdmin: response.user.role === 'admin',
            loading: false
          });
        } catch (error) {
          set({ loading: false });
          throw error;
        }
      },

      logout: async () => {
        try {
          await apiLogout();
        } catch (error) {
          console.error('Logout error:', error);
        } finally {
          localStorage.removeItem('auth_token');
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isAdmin: false
          });
        }
      },

      checkAuth: async () => {
        const token = localStorage.getItem('auth_token');

        if (!token) {
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isAdmin: false
          });
          return;
        }

        try {
          const user = await getCurrentUser();
          set({
            user,
            token,
            isAuthenticated: true,
            isAdmin: user.role === 'admin'
          });
        } catch (error) {
          localStorage.removeItem('auth_token');
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isAdmin: false
          });
        }
      },

      setUser: (user: User | null) => {
        set({
          user,
          isAuthenticated: !!user,
          isAdmin: user?.role === 'admin' || false
        });
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        isAdmin: state.isAdmin
      })
    }
  )
);
