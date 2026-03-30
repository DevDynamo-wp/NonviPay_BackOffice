/**
 * NONVIPAY BACKOFFICE — Types globaux
 * Tous les types métier centralisés
 */

// ── Auth ── //
export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: AdminRole;
  avatar?: string;
  createdAt: string;
  lastLogin: string;
}

export type AdminRole = 'SUPER_ADMIN' | 'ADMIN' | 'SUPPORT' | 'COMPLIANCE';

export interface AuthTokens {
  access: string;
  refresh: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

// ── Utilisateurs ── //
export interface User {
  id: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  fullName: string;
  avatar?: string;
  status: UserStatus;
  kycStatus: KycStatus;
  kycLevel: 0 | 1 | 2 | 3;
  isVerified: boolean;
  isBlocked: boolean;
  walletId: string;
  referralCode: string;
  referredBy?: string;
  createdAt: string;
  updatedAt: string;
}

export type UserStatus = 'ACTIVE' | 'INACTIVE' | 'BLOCKED' | 'SUSPENDED';

// ── KYC ── //
export type KycStatus = 'NOT_SUBMITTED' | 'PENDING' | 'APPROVED' | 'REJECTED';

export interface KycDocument {
  id: string;
  userId: string;
  user: Pick<User, 'id' | 'fullName' | 'email'>;
  documentType: 'NATIONAL_ID' | 'PASSPORT' | 'DRIVER_LICENSE';
  frontImageUrl: string;
  backImageUrl?: string;
  selfieUrl?: string;
  status: KycStatus;
  rejectionReason?: string;
  submittedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
}

// ── Wallet ── //
export interface Wallet {
  id: string;
  userId: string;
  balance: string;        // Decimal as string — critique fintech
  currency: string;       // 'XOF', 'EUR', etc.
  isActive: boolean;
  isLocked: boolean;
  createdAt: string;
  updatedAt: string;
}

// ── Transactions ── //
export type TransactionType =
  | 'TRANSFER_P2P'
  | 'DEPOSIT_MOBILE_MONEY'
  | 'WITHDRAWAL_MOBILE_MONEY'
  | 'PAYMENT_MERCHANT'
  | 'ESCROW_LOCK'
  | 'ESCROW_RELEASE'
  | 'REFUND'
  | 'FEE'
  | 'BONUS';

export type TransactionStatus =
  | 'PENDING'
  | 'SUCCESS'
  | 'FAILED'
  | 'CANCELLED'
  | 'PROCESSING';

export interface Transaction {
  id: string;
  reference: string;
  type: TransactionType;
  status: TransactionStatus;
  amount: string;          // Decimal as string
  fee: string;             // Decimal as string
  currency: string;
  senderWalletId?: string;
  receiverWalletId?: string;
  sender?: Pick<User, 'id' | 'fullName' | 'email'>;
  receiver?: Pick<User, 'id' | 'fullName' | 'email'>;
  description?: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

// ── Orders (Escrow / Achat de biens) ── //
export type OrderStatus =
  | 'EN_ATTENTE'
  | 'VALIDEE'
  | 'EN_LIVRAISON'
  | 'LIVREE'
  | 'TERMINEE'
  | 'ANNULEE'
  | 'LITIGE';

export interface Order {
  id: string;
  reference: string;
  status: OrderStatus;
  seller: Pick<User, 'id' | 'fullName' | 'email'>;
  buyer: Pick<User, 'id' | 'fullName' | 'email'>;
  deliverer?: Pick<User, 'id' | 'fullName' | 'email'>;
  amount: string;           // Decimal as string
  description: string;
  deliveryCode?: string;    // Hash, jamais affiché en clair en admin
  deliveryCodeExpiresAt?: string;
  escrowTransactionId?: string;
  createdAt: string;
  updatedAt: string;
}

// ── Disputes (Litiges) ── //
export type DisputeStatus =
  | 'OPEN'
  | 'UNDER_REVIEW'
  | 'RESOLVED_BUYER'
  | 'RESOLVED_SELLER'
  | 'CLOSED';

export interface Dispute {
  id: string;
  orderId: string;
  order: Pick<Order, 'id' | 'reference' | 'amount'>;
  openedBy: Pick<User, 'id' | 'fullName'>;
  status: DisputeStatus;
  reason: string;
  adminNote?: string;
  resolvedBy?: string;
  resolvedAt?: string;
  createdAt: string;
  updatedAt: string;
}

// ── Mobile Money ── //
export type MobileMoneyOperator = 'MTN' | 'MOOV' | 'ORANGE' | 'WAVE';
export type MobileMoneyStatus = 'PENDING' | 'SUCCESS' | 'FAILED' | 'EXPIRED';

export interface MobileMoneyTransaction {
  id: string;
  userId: string;
  user: Pick<User, 'id' | 'fullName' | 'phone'>;
  operator: MobileMoneyOperator;
  phone: string;
  amount: string;
  type: 'DEPOSIT' | 'WITHDRAWAL';
  status: MobileMoneyStatus;
  externalRef?: string;
  createdAt: string;
  updatedAt: string;
}

// ── API Responses ── //
export interface PaginatedResponse<T> {
  results: T[];
  count: number;
  next: string | null;
  previous: string | null;
  totalPages: number;
  currentPage: number;
}

export interface ApiError {
  message: string;
  code?: string;
  field?: string;
  details?: Record<string, string[]>;
}

export interface ApiResponse<T = unknown> {
  data?: T;
  error?: ApiError;
  status: number;
}

// ── Dashboard Stats ── //
export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  newUsersToday: number;
  totalTransactions: number;
  transactionsToday: number;
  totalVolume: string;         // Decimal as string
  volumeToday: string;
  pendingKyc: number;
  openDisputes: number;
  pendingOrders: number;
  activeEscrows: number;
}

// ── Filters & Pagination ── //
export interface PaginationParams {
  page?: number;
  pageSize?: number;
  ordering?: string;
}

export interface DateRangeFilter {
  dateFrom?: string;
  dateTo?: string;
}

export interface TransactionFilters extends PaginationParams, DateRangeFilter {
  status?: TransactionStatus;
  type?: TransactionType;
  search?: string;
  userId?: string;
}

export interface UserFilters extends PaginationParams {
  status?: UserStatus;
  kycStatus?: KycStatus;
  search?: string;
}
