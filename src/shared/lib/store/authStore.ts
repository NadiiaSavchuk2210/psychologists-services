import type { User } from 'firebase/auth';
import { create } from 'zustand';

type AuthStore = {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  clearAuth: () => void;
  setLoading: (value: boolean) => void;
};

export const useAuthStore = create<AuthStore>()(set => ({
  isAuthenticated: false,
  user: null,
  loading: true,

  setUser: user => {
    set({
      user,
      isAuthenticated: !!user,
      loading: false,
    });
  },

  clearAuth: () => {
    set({
      user: null,
      isAuthenticated: false,
      loading: false,
    });
  },
  setLoading: loading => set({ loading }),
}));
