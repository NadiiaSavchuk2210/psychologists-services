import type { User } from 'firebase/auth';
import { create } from 'zustand';

type AuthStore = {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  clearIsAuthenticated: () => void;
  setLoading: (value: boolean) => void;
};

export const useAuthStore = create<AuthStore>()(set => ({
  isAuthenticated: false,
  user: null,
  loading: true,
  setUser: (user: User | null) => {
    set(() => ({ user, isAuthenticated: true }));
  },
  clearIsAuthenticated: () => {
    set(() => ({ user: null, isAuthenticated: false }));
  },
  setLoading: loading => set({ loading }),
}));
