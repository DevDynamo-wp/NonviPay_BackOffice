/**
 * NONVIPAY BACKOFFICE — Design Tokens
 * Source unique de vérité pour toutes les couleurs de l'application.
 * Ne pas mettre des couleurs directement dans les composants.
 * Toujours référencer ces tokens.
 */

// ─── Palette brute (ne pas utiliser directement dans les composants) ──────────

export const palette = {
  // Brand
  amber: {
    50:  '#FFFBEB',
    100: '#FEF3C7',
    200: '#FDE68A',
    300: '#FCD34D',
    400: '#FBBF24',
    500: '#F5A623', // Brand primary
    600: '#E8931A', // Brand dark
    700: '#D97706',
    800: '#B45309',
    900: '#92400E',
  },

  // Neutres sombres (dark theme)
  slate: {
    950: '#0D0E12', // bg-base
    900: '#13151C', // bg-surface
    850: '#1A1D27', // bg-elevated
    800: '#21253A', // bg-subtle
    750: '#191C28', // bg-input
    700: '#2C3048',
    600: '#3C3F55',
    500: '#5C6080',
    400: '#9A9DB8',
    300: '#C5C7D6',
    200: '#E2E3ED',
    100: '#F0F0F5',
    50:  '#F8F8FB',
  },

  // Neutres clairs (light theme)
  gray: {
    50:  '#F9FAFB',
    100: '#F3F4F6',
    150: '#EBEDF0',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },

  // Sémantiques
  green:  { 400: '#4ADE80', 500: '#22C55E', 600: '#16A34A' },
  red:    { 400: '#F87171', 500: '#EF4444', 600: '#DC2626' },
  amber2: { 400: '#FBBF24', 500: '#F59E0B', 600: '#D97706' },
  blue:   { 400: '#60A5FA', 500: '#3B82F6', 600: '#2563EB' },
  purple: { 400: '#C084FC', 500: '#A855F7', 600: '#9333EA' },
  orange: { 400: '#FB923C', 500: '#F97316', 600: '#EA580C' },
} as const;


// ─── Tokens sémantiques par thème ─────────────────────────────────────────────

export type Theme = 'dark' | 'light';

export const themeTokens = {
  dark: {
    // Backgrounds
    'bg-base':     palette.slate[950],
    'bg-surface':  palette.slate[900],
    'bg-elevated': palette.slate[850],
    'bg-subtle':   palette.slate[800],
    'bg-input':    palette.slate[750],

    // Texte
    'text-primary':   palette.slate[100],
    'text-secondary': palette.slate[400],
    'text-tertiary':  palette.slate[500],
    'text-inverted':  palette.slate[950],
    'text-brand':     palette.amber[500],

    // Bordures
    'border-default': 'rgba(255,255,255,0.07)',
    'border-subtle':  'rgba(255,255,255,0.04)',
    'border-strong':  'rgba(255,255,255,0.14)',
    'border-brand':   'rgba(245,166,35,0.35)',

    // Brand
    'brand-primary':   palette.amber[500],
    'brand-secondary': palette.amber[600],
    'brand-accent':    '#FFD166',
    'brand-glow':      'rgba(245,166,35,0.15)',

    // Statuts
    'success':        palette.green[500],
    'success-bg':     'rgba(34,197,94,0.10)',
    'success-border': 'rgba(34,197,94,0.25)',
    'warning':        palette.amber2[500],
    'warning-bg':     'rgba(245,158,11,0.10)',
    'warning-border': 'rgba(245,158,11,0.25)',
    'error':          palette.red[500],
    'error-bg':       'rgba(239,68,68,0.10)',
    'error-border':   'rgba(239,68,68,0.25)',
    'info':           palette.blue[500],
    'info-bg':        'rgba(59,130,246,0.10)',
    'info-border':    'rgba(59,130,246,0.25)',

    // Ombres
    'shadow-sm': '0 1px 3px rgba(0,0,0,0.4)',
    'shadow-md': '0 4px 12px rgba(0,0,0,0.5)',
    'shadow-lg': '0 8px 24px rgba(0,0,0,0.6)',
    'shadow-brand': '0 4px 20px rgba(245,166,35,0.25)',
  },

  light: {
    // Backgrounds
    'bg-base':     palette.gray[50],
    'bg-surface':  '#FFFFFF',
    'bg-elevated': palette.gray[100],
    'bg-subtle':   palette.gray[150],
    'bg-input':    '#FFFFFF',

    // Texte
    'text-primary':   palette.gray[900],
    'text-secondary': palette.gray[500],
    'text-tertiary':  palette.gray[400],
    'text-inverted':  '#FFFFFF',
    'text-brand':     palette.amber[600],

    // Bordures
    'border-default': 'rgba(0,0,0,0.08)',
    'border-subtle':  'rgba(0,0,0,0.05)',
    'border-strong':  'rgba(0,0,0,0.15)',
    'border-brand':   'rgba(232,147,26,0.40)',

    // Brand
    'brand-primary':   palette.amber[600],
    'brand-secondary': palette.amber[700],
    'brand-accent':    palette.amber[500],
    'brand-glow':      'rgba(232,147,26,0.12)',

    // Statuts
    'success':        palette.green[600],
    'success-bg':     'rgba(22,163,74,0.08)',
    'success-border': 'rgba(22,163,74,0.20)',
    'warning':        palette.amber2[600],
    'warning-bg':     'rgba(217,119,6,0.08)',
    'warning-border': 'rgba(217,119,6,0.20)',
    'error':          palette.red[600],
    'error-bg':       'rgba(220,38,38,0.08)',
    'error-border':   'rgba(220,38,38,0.20)',
    'info':           palette.blue[600],
    'info-bg':        'rgba(37,99,235,0.08)',
    'info-border':    'rgba(37,99,235,0.20)',

    // Ombres
    'shadow-sm': '0 1px 3px rgba(0,0,0,0.08)',
    'shadow-md': '0 4px 12px rgba(0,0,0,0.10)',
    'shadow-lg': '0 8px 24px rgba(0,0,0,0.14)',
    'shadow-brand': '0 4px 20px rgba(232,147,26,0.20)',
  },
} as const;

export type ThemeTokenKey = keyof typeof themeTokens.dark;

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Retourne la valeur CSS d'un token pour un thème donné */
export function getToken(key: ThemeTokenKey, theme: Theme): string {
  return themeTokens[theme][key];
}

/** Génère les variables CSS à injecter dans :root */
export function buildCSSVariables(theme: Theme): string {
  return Object.entries(themeTokens[theme])
    .map(([key, value]) => `  --${key}: ${value};`)
    .join('\n');
}