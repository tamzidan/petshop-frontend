import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, LoginRequest, RegisterRequest } from '../types';
import {
  login as apiLogin,
  register as apiRegister,
  logout as apiLogout,
  getCurrentUser,
  getCsrfCookie, // Import the new CSRF function
} from '../services/api';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading: boolean;
  initialized: boolean; // To track if initial auth check is done

  // Actions
  login: (data: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>; // This will be our initialization function
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>()(
  // We can still persist the user object as a cache to prevent UI flickering on page load
  // But the final authority is the checkAuth function hitting the /api/user endpoint
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isAdmin: false,
      loading: false,
      initialized: false, // Start as not initialized

      login: async (data: LoginRequest) => {
        try {
          set({ loading: true });
          // 1. Get the CSRF cookie
          await getCsrfCookie();
          // 2. Attempt to login
          const user = await apiLogin(data);
          // 3. Set user state
          set({
            user,
            isAuthenticated: true,
            isAdmin: user.role === 'admin',
            loading: false,
          });
        } catch (error) {
          set({ loading: false });
          throw error;
        }
      },

      register: async (data: RegisterRequest) => {
        try {
          set({ loading: true });
          // 1. Get the CSRF cookie
          await getCsrfCookie();
          // 2. Attempt to register
          const user = await apiRegister(data);
          // 3. Set user state
          set({
            user,
            isAuthenticated: true,
            isAdmin: user.role === 'admin',
            loading: false,
          });
        } catch (error) {
          set({ loading: false });
          throw error;
        }
      },

      logout: async () => {
        try {
          set({ loading: true });
          await apiLogout();
        } catch (error) {
          console.error('Logout error:', error);
        } finally {
          // Always clear user state on logout
          set({
            user: null,
            isAuthenticated: false,
            isAdmin: false,
            loading: false,
          });
        }
      },

      // This function checks if a session is still active on the backend
      checkAuth: async () => {
        // Prevent re-checking if already initialized
        if (get().initialized) return;

        try {
          // The http-only session cookie will be sent automatically by the browser
          const user = await getCurrentUser();
          set({
            user,
            isAuthenticated: true,
            isAdmin: user.role === 'admin',
            initialized: true,
          });
        } catch (error) {
          // If this fails, it means no active session, so we ensure state is cleared
          set({
            user: null,
            isAuthenticated: false,
            isAdmin: false,
            initialized: true,
          });
        }
      },

      setUser: (user: User | null) => {
        set({
          user,
          isAuthenticated: !!user,
          isAdmin: user?.role === 'admin' || false,
        });
      },
    }),
    {
      name: 'auth-storage',
      // Only persist the user object. Auth status is determined at runtime by checkAuth.
      partialize: (state) => ({
        user: state.user,
      }),
    }
  )
);