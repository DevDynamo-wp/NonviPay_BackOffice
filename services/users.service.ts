/**
 * NONVIPAY BACKOFFICE — Users Service
 * Correspond à GET/PATCH /api/v1/admin/utilisateurs/
 */

import { api } from './api';
import type {
  User,
  PaginatedResponse,
  UserFilters,
  Wallet,
  Transaction,
  PaginationParams,
} from '@/types';

export const usersService = {
  // Liste paginée
  getAll: (filters?: UserFilters) =>
    api.get<PaginatedResponse<User>>('/admin/utilisateurs/', filters as Record<string, string>),

  // Détail d'un utilisateur
  getById: (id: string) =>
    api.get<User>(`/admin/utilisateurs/${id}/`),

  // Bloquer / débloquer
  block: (id: string, reason: string) =>
    api.post(`/admin/utilisateurs/${id}/bloquer/`, { reason }),

  unblock: (id: string) =>
    api.post(`/admin/utilisateurs/${id}/debloquer/`),

  // Wallet de l'utilisateur
  getWallet: (userId: string) =>
    api.get<Wallet>(`/admin/utilisateurs/${userId}/wallet/`),

  // Transactions de l'utilisateur
  getTransactions: (userId: string, params?: PaginationParams) =>
    api.get<PaginatedResponse<Transaction>>(
      `/admin/utilisateurs/${userId}/transactions/`,
      params as Record<string, string>,
    ),
};
