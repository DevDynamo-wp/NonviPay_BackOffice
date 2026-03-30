/**
 * NONVIPAY BACKOFFICE — Transactions Service
 */
import { api } from './api';
import type { Transaction, PaginatedResponse, TransactionFilters } from '@/types';

export const transactionsService = {
  getAll: (filters?: TransactionFilters) =>
    api.get<PaginatedResponse<Transaction>>('/admin/transactions/', filters as Record<string, string>),

  getById: (id: string) =>
    api.get<Transaction>(`/admin/transactions/${id}/`),
};
