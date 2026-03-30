/**
 * NONVIPAY BACKOFFICE — Auth Store (Zustand)
 * État global de l'authentification admin
 *
 * Installation requise : npm install zustand
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AdminUser } from '@/types';

interface AuthStore {
  user:       AdminUser | null;
  isLoggedIn: boolean;
  setUser:    (user: AdminUser) => void;
  clearUser:  () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user:       null,
      isLoggedIn: false,

      setUser: (user) => set({ user, isLoggedIn: true }),

      clearUser: () => set({ user: null, isLoggedIn: false }),
    }),
    {
      name: 'nonvipay-auth',
      // Ne persister que l'utilisateur, pas les fonctions
      partialize: (state) => ({ user: state.user, isLoggedIn: state.isLoggedIn }),
    },
  ),
);
