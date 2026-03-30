/**
 * NONVIPAY BACKOFFICE — KYC Service
 */
import { api } from './api';
import type { KycDocument, PaginatedResponse, PaginationParams } from '@/types';

export const kycService = {
  getPending: (params?: PaginationParams) =>
    api.get<PaginatedResponse<KycDocument>>('/admin/kyc/', {
      status: 'PENDING',
      ...params,
    } as Record<string, string>),

  getAll: (params?: PaginationParams & { status?: string }) =>
    api.get<PaginatedResponse<KycDocument>>('/admin/kyc/', params as Record<string, string>),

  approve: (id: string) =>
    api.post(`/admin/kyc/${id}/approuver/`),

  reject: (id: string, reason: string) =>
    api.post(`/admin/kyc/${id}/rejeter/`, { reason }),
};

// ─────────────────────────────────────────────────────────────

/**
 * NONVIPAY BACKOFFICE — Disputes Service (Litiges)
 */
import type { Dispute } from '@/types';

export const disputesService = {
  getAll: (params?: PaginationParams & { status?: string }) =>
    api.get<PaginatedResponse<Dispute>>('/admin/litiges/', params as Record<string, string>),

  getById: (id: string) =>
    api.get<Dispute>(`/admin/litiges/${id}/`),

  resolveForBuyer: (id: string, note: string) =>
    api.post(`/admin/litiges/${id}/resoudre/`, { decision: 'ACHETEUR', note }),

  resolveForSeller: (id: string, note: string) =>
    api.post(`/admin/litiges/${id}/resoudre/`, { decision: 'VENDEUR', note }),

  close: (id: string, note: string) =>
    api.post(`/admin/litiges/${id}/fermer/`, { note }),
};

// ─────────────────────────────────────────────────────────────

/**
 * NONVIPAY BACKOFFICE — Orders Service (Escrow / Achat de biens)
 */
import type { Order } from '@/types';

export const ordersService = {
  getAll: (params?: PaginationParams & { status?: string }) =>
    api.get<PaginatedResponse<Order>>('/admin/commandes/', params as Record<string, string>),

  getById: (id: string) =>
    api.get<Order>(`/admin/commandes/${id}/`),

  forceRelease: (id: string, note: string) =>
    api.post(`/admin/commandes/${id}/liberer-sequestre/`, { note }),

  cancel: (id: string, note: string) =>
    api.post(`/admin/commandes/${id}/annuler/`, { note }),
};

// ─────────────────────────────────────────────────────────────

/**
 * NONVIPAY BACKOFFICE — Dashboard Service
 */
import type { DashboardStats } from '@/types';

export const dashboardService = {
  getStats: () =>
    api.get<DashboardStats>('/admin/dashboard/stats/'),

  getRecentTransactions: () =>
    api.get<PaginatedResponse<Transaction>>('/admin/transactions/', {
      pageSize: '10',
      ordering: '-created_at',
    }),
};
