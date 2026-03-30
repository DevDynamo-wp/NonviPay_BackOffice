/**
 * NONVIPAY BACKOFFICE — Utilitaires
 */

import { CONFIG } from '@/config/constants';

// ── Dates ── //

/** Formate une date ISO en format lisible */
export function formatDate(iso: string, opts?: Intl.DateTimeFormatOptions): string {
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    ...opts,
  }).format(new Date(iso));
}

/** Formate une date avec heure */
export function formatDateTime(iso: string): string {
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(iso));
}

/** Temps relatif ("il y a 3 min") */
export function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins  = Math.floor(diff / 60_000);
  const hours = Math.floor(diff / 3_600_000);
  const days  = Math.floor(diff / 86_400_000);

  if (mins < 1)   return 'à l\'instant';
  if (mins < 60)  return `il y a ${mins} min`;
  if (hours < 24) return `il y a ${hours}h`;
  if (days < 7)   return `il y a ${days}j`;
  return formatDate(iso);
}

// ── Montants ── //

/**
 * Formate un montant monétaire.
 * IMPORTANT : Toujours utiliser cette fonction — jamais Number.toFixed()
 * Les montants viennent du backend Django en string (DecimalField)
 */
export function formatAmount(
  value: string | number,
  currency: string = CONFIG.DEFAULT_CURRENCY,
): string {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  if (isNaN(num)) return '—';
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(num);
}

// ── Strings ── //

/** Tronque un ID long pour l'affichage */
export function shortId(id: string, len = 8): string {
  return id.length > len ? `${id.slice(0, len)}…` : id;
}

/** Initiales d'un nom complet */
export function initials(name: string): string {
  return name
    .split(' ')
    .map((w) => w[0]?.toUpperCase() ?? '')
    .slice(0, 2)
    .join('');
}

/** Masque partiellement un numéro de téléphone */
export function maskPhone(phone: string): string {
  if (phone.length < 6) return phone;
  return `${phone.slice(0, 3)}****${phone.slice(-3)}`;
}

// ── Classnames helper ── //

/** Concatène des classes Tailwind conditionnellement */
export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

// ── Types de transaction lisibles ── //

const TX_TYPE_LABELS: Record<string, string> = {
  TRANSFER_P2P:             'Transfert P2P',
  DEPOSIT_MOBILE_MONEY:     'Dépôt Mobile Money',
  WITHDRAWAL_MOBILE_MONEY:  'Retrait Mobile Money',
  PAYMENT_MERCHANT:         'Paiement marchand',
  ESCROW_LOCK:              'Mise en séquestre',
  ESCROW_RELEASE:           'Libération séquestre',
  REFUND:                   'Remboursement',
  FEE:                      'Frais',
  BONUS:                    'Bonus',
};

export function txTypeLabel(type: string): string {
  return TX_TYPE_LABELS[type] ?? type;
}
