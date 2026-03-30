/**
 * NONVIPAY BACKOFFICE — Design Tokens (TypeScript)
 * Source unique de vérité pour les couleurs, fonts, spacing
 * Synchronisé avec styles/theme.css
 */

export const colors = {
  brand: {
    primary:   '#F5A623',
    secondary: '#E8931A',
    accent:    '#FFD166',
    glow:      'rgba(245, 166, 35, 0.15)',
  },

  bg: {
    base:     '#0D0E12',
    surface:  '#13151C',
    elevated: '#1A1D27',
    subtle:   '#21253A',
    input:    '#191C28',
  },

  text: {
    primary:   '#F0F0F5',
    secondary: '#9A9DB8',
    tertiary:  '#5C6080',
    inverted:  '#0D0E12',
  },

  border: {
    default: 'rgba(255, 255, 255, 0.07)',
    subtle:  'rgba(255, 255, 255, 0.04)',
    strong:  'rgba(255, 255, 255, 0.14)',
    brand:   'rgba(245, 166, 35, 0.35)',
  },

  status: {
    success:  '#22C55E',
    warning:  '#F5A623',
    error:    '#EF4444',
    info:     '#3B82F6',
  },

  transaction: {
    pending:   '#F59E0B',
    success:   '#10B981',
    failed:    '#EF4444',
    cancelled: '#6B7280',
    escrow:    '#8B5CF6',
    dispute:   '#F97316',
  },

  kyc: {
    pending:  '#F59E0B',
    approved: '#10B981',
    rejected: '#EF4444',
  },
} as const;

export const fonts = {
  display: '"Syne", sans-serif',
  body:    '"Instrument Sans", sans-serif',
  mono:    '"JetBrains Mono", monospace',
} as const;

export const spacing = {
  1:  '0.25rem',
  2:  '0.5rem',
  3:  '0.75rem',
  4:  '1rem',
  5:  '1.25rem',
  6:  '1.5rem',
  8:  '2rem',
  10: '2.5rem',
  12: '3rem',
  16: '4rem',
} as const;

export const radius = {
  sm:   '4px',
  md:   '8px',
  lg:   '12px',
  xl:   '16px',
  '2xl': '20px',
  full: '9999px',
} as const;

export const shadows = {
  sm:    '0 1px 3px rgba(0, 0, 0, 0.4)',
  md:    '0 4px 12px rgba(0, 0, 0, 0.5)',
  lg:    '0 8px 24px rgba(0, 0, 0, 0.6)',
  xl:    '0 16px 48px rgba(0, 0, 0, 0.7)',
  brand: '0 4px 20px rgba(245, 166, 35, 0.25)',
  glow:  '0 0 40px rgba(245, 166, 35, 0.08)',
} as const;

export const layout = {
  sidebarWidth:          '240px',
  sidebarCollapsedWidth: '64px',
  headerHeight:          '60px',
  contentMaxWidth:       '1400px',
} as const;

export const transitions = {
  fast:   '150ms ease',
  base:   '200ms ease',
  slow:   '300ms cubic-bezier(0.4, 0, 0.2, 1)',
  spring: '400ms cubic-bezier(0.34, 1.56, 0.64, 1)',
} as const;

export const zIndex = {
  dropdown: 100,
  sticky:   200,
  overlay:  300,
  modal:    400,
  toast:    500,
  tooltip:  600,
} as const;

// ── Helpers ── //

/** Retourne la couleur CSS selon le statut de transaction */
export function getTransactionStatusColor(
  status: 'PENDING' | 'SUCCESS' | 'FAILED' | 'CANCELLED' | 'ESCROW' | 'DISPUTE',
): string {
  const map: Record<string, string> = {
    PENDING:   colors.transaction.pending,
    SUCCESS:   colors.transaction.success,
    FAILED:    colors.transaction.failed,
    CANCELLED: colors.transaction.cancelled,
    ESCROW:    colors.transaction.escrow,
    DISPUTE:   colors.transaction.dispute,
  };
  return map[status] ?? colors.text.secondary;
}

/** Retourne la couleur CSS selon le statut KYC */
export function getKycStatusColor(
  status: 'PENDING' | 'APPROVED' | 'REJECTED',
): string {
  const map: Record<string, string> = {
    PENDING:  colors.kyc.pending,
    APPROVED: colors.kyc.approved,
    REJECTED: colors.kyc.rejected,
  };
  return map[status] ?? colors.text.secondary;
}

/** Formate un montant en FCFA (ou devise) */
export function formatAmount(
  value: number | string,
  currency = 'XOF',
  locale = 'fr-FR',
): string {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(num);
}
