import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { User } from '../types';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  getCurrentUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  error: null,

  signUp: async (email, password, name) => {
    set({ isLoading: true, error: null });
    try {
      // In a real app, this would use Supabase auth
      // For now, we'll simulate a successful signup
      const mockUser: User = {
        id: `user_${Math.random().toString(36).substring(2, 9)}`,
        email,
        name,
        created_at: new Date().toISOString(),
        subscription: 'free'
      };
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      set({ user: mockUser, isLoading: false });
      localStorage.setItem('dogify_user', JSON.stringify(mockUser));
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  signIn: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      // In a real app, this would use Supabase auth
      // For now, we'll simulate a successful login
      const mockUser: User = {
        id: `user_${Math.random().toString(36).substring(2, 9)}`,
        email,
        name: email.split('@')[0],
        created_at: new Date().toISOString(),
        subscription: 'free'
      };
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      set({ user: mockUser, isLoading: false });
      localStorage.setItem('dogify_user', JSON.stringify(mockUser));
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  signOut: async () => {
    set({ isLoading: true });
    try {
      // In a real app, this would use Supabase auth
      // For now, we'll just clear the local state
      localStorage.removeItem('dogify_user');
      set({ user: null, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  getCurrentUser: async () => {
    set({ isLoading: true });
    try {
      // Check if we have a user in localStorage
      const storedUser = localStorage.getItem('dogify_user');
      if (storedUser) {
        set({ user: JSON.parse(storedUser), isLoading: false });
      } else {
        set({ user: null, isLoading: false });
      }
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false, user: null });
    }
  }
}));