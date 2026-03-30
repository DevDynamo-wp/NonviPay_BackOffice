/**
 * NONVIPAY BACKOFFICE — Configuration centralisée
 */

export const CONFIG = {
  // API
  API_BASE_URL: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000/api/v1',

  // App
  APP_NAME:    'NonviPay Admin',
  APP_VERSION: '1.0.0',

  // Pagination
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE:     100,

  // Devises supportées
  CURRENCIES: ['XOF', 'XAF', 'EUR', 'USD'] as const,
  DEFAULT_CURRENCY: 'XOF' as const,

  // Opérateurs Mobile Money
  MOBILE_MONEY_OPERATORS: ['MTN', 'MOOV', 'ORANGE', 'WAVE'] as const,

  // Statuts
  TRANSACTION_STATUSES: ['PENDING', 'SUCCESS', 'FAILED', 'CANCELLED', 'PROCESSING'] as const,
  KYC_STATUSES:         ['NOT_SUBMITTED', 'PENDING', 'APPROVED', 'REJECTED'] as const,
  ORDER_STATUSES:       ['EN_ATTENTE', 'VALIDEE', 'EN_LIVRAISON', 'LIVREE', 'TERMINEE', 'ANNULEE', 'LITIGE'] as const,
  USER_STATUSES:        ['ACTIVE', 'INACTIVE', 'BLOCKED', 'SUSPENDED'] as const,
  DISPUTE_STATUSES:     ['OPEN', 'UNDER_REVIEW', 'RESOLVED_BUYER', 'RESOLVED_SELLER', 'CLOSED'] as const,

  // Tokens
  ACCESS_TOKEN_KEY:  'nonvipay_access_token',
  REFRESH_TOKEN_KEY: 'nonvipay_refresh_token',

  // Timeouts
  REQUEST_TIMEOUT_MS: 15_000,
  TOAST_DURATION_MS:  4_000,
} as const;

// Endpoints Django correspondants
export const ENDPOINTS = {
  // Auth
  LOGIN:          '/admin/auth/login/',
  LOGOUT:         '/admin/auth/logout/',
  ME:             '/admin/auth/me/',
  REFRESH:        '/auth/token/refresh/',

  // Utilisateurs
  USERS:          '/admin/utilisateurs/',
  USER:           (id: string) => `/admin/utilisateurs/${id}/`,
  USER_BLOCK:     (id: string) => `/admin/utilisateurs/${id}/bloquer/`,
  USER_UNBLOCK:   (id: string) => `/admin/utilisateurs/${id}/debloquer/`,
  USER_WALLET:    (id: string) => `/admin/utilisateurs/${id}/wallet/`,

  // Transactions
  TRANSACTIONS:   '/admin/transactions/',
  TRANSACTION:    (id: string) => `/admin/transactions/${id}/`,

  // KYC
  KYC:            '/admin/kyc/',
  KYC_APPROVE:    (id: string) => `/admin/kyc/${id}/approuver/`,
  KYC_REJECT:     (id: string) => `/admin/kyc/${id}/rejeter/`,

  // Commandes (Escrow)
  ORDERS:         '/admin/commandes/',
  ORDER:          (id: string) => `/admin/commandes/${id}/`,
  ORDER_RELEASE:  (id: string) => `/admin/commandes/${id}/liberer-sequestre/`,
  ORDER_CANCEL:   (id: string) => `/admin/commandes/${id}/annuler/`,

  // Litiges
  DISPUTES:       '/admin/litiges/',
  DISPUTE:        (id: string) => `/admin/litiges/${id}/`,
  DISPUTE_RESOLVE:(id: string) => `/admin/litiges/${id}/resoudre/`,

  // Dashboard
  DASHBOARD_STATS:'/admin/dashboard/stats/',

  // Mobile Money
  MOBILE_MONEY:   '/admin/mobile-money/',
} as const;
