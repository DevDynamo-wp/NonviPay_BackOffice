/**
 * NONVIPAY BACKOFFICE — Auth Service
 * Connexion, déconnexion, vérification session
 */

import { api, tokenStorage } from './api';
import type { AdminUser, LoginCredentials, AuthTokens } from '@/types';

export const authService = {
  login: async (credentials: LoginCredentials) => {
    const res = await api.post<AuthTokens & { user: AdminUser }>('/admin/auth/login/', credentials);
    if (res.data) {
      tokenStorage.setTokens({ access: res.data.access, refresh: res.data.refresh });
    }
    return res;
  },

  logout: async () => {
    const refresh = tokenStorage.getRefresh();
    if (refresh) {
      await api.post('/admin/auth/logout/', { refresh }).catch(() => {});
    }
    tokenStorage.clearTokens();
  },

  me: () => api.get<AdminUser>('/admin/auth/me/'),

  refreshToken: (refresh: string) =>
    api.post<AuthTokens>('/auth/token/refresh/', { refresh }),
};
