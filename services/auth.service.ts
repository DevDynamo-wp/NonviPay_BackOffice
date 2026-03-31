/**
 * NONVIPAY BACKOFFICE — Auth Service
 * Connexion, déconnexion, vérification session admin
 */

import { api, tokenStorage } from './api';
import type { AdminUser, LoginCredentials, AuthTokens } from '@/types';

interface LoginResponse {
  success: boolean;
  access: string;
  refresh: string;
  user: AdminUser;
}

interface MeResponse {
  success: boolean;
  id: string;
  email: string;
  prenom: string;
  nom: string;
  role: string;
  email_pro: string;
}

export const authService = {
  /**
   * Connexion admin — POST /api/v1/admin/auth/login/
   * Le backend Django attend { email, password }
   */
  login: async (credentials: LoginCredentials) => {
    const res = await api.post<LoginResponse>('/admin/auth/login/', credentials);

    if (res.data?.access) {
      tokenStorage.setTokens({
        access:  res.data.access,
        refresh: res.data.refresh,
      });
    }

    return res;
  },

  /**
   * Déconnexion — révoque le refresh token côté Django
   */
  logout: async () => {
    const refresh = tokenStorage.getRefresh();
    if (refresh) {
      await api.post('/admin/auth/logout/', { refresh }).catch(() => {});
    }
    tokenStorage.clearTokens();
    // Supprimer aussi le cookie utilisé par le proxy Next.js
    if (typeof document !== 'undefined') {
      document.cookie =
        'nonvipay_access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    }
  },

  /**
   * Profil de l'admin connecté — GET /api/v1/admin/auth/me/
   */
  me: async () => {
    const res = await api.get<MeResponse>('/admin/auth/me/');

    // Normaliser la réponse Django → format AdminUser attendu par le front
    if (res.data) {
      const adminUser: AdminUser = {
        id:        res.data.id,
        email:     res.data.email,
        name:      `${res.data.prenom} ${res.data.nom}`,
        role:      res.data.role as AdminUser['role'],
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
      };
      return { ...res, data: adminUser };
    }

    return res as { data?: AdminUser; error?: typeof res.error; status: number };
  },

  /**
   * Rafraîchir le token — POST /api/v1/auth/token/refresh/
   */
  refreshToken: (refresh: string) =>
    api.post<AuthTokens>('/auth/token/refresh/', { refresh }),
};