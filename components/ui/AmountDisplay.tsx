/**
 * AmountDisplay — Affichage monétaire critique (fintech)
 * Utilise font-mono pour aligner les chiffres
 * IMPORTANT : les montants viennent du backend en string (Decimal)
 */

interface AmountDisplayProps {
  value:     string | number;
  currency?: string;
  variant?:  'positive' | 'negative' | 'neutral' | 'brand';
  size?:     'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl';
  showSign?: boolean;
}

const SIZE_CLASSES = {
  xs:   'text-xs',
  sm:   'text-sm',
  base: 'text-base',
  lg:   'text-lg',
  xl:   'text-xl',
  '2xl': 'text-2xl',
};

const VARIANT_CLASSES = {
  positive: 'text-green-400',
  negative: 'text-red-400',
  neutral:  'text-[#F0F0F5]',
  brand:    'text-[#F5A623]',
};

export function AmountDisplay({
  value,
  currency = 'XOF',
  variant = 'neutral',
  size = 'base',
  showSign = false,
}: AmountDisplayProps) {
  const num = typeof value === 'string' ? parseFloat(value) : value;

  const formatted = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(Math.abs(num));

  const sign = showSign ? (num >= 0 ? '+' : '−') : '';

  return (
    <span className={`font-mono font-medium tracking-tight ${SIZE_CLASSES[size]} ${VARIANT_CLASSES[variant]}`}>
      {sign}{formatted}
    </span>
  );
}

/**
 * Formate un montant en string (pour usage hors JSX)
 * Toujours utiliser cette fonction pour l'affichage — jamais parseFloat direct
 */
export function formatAmount(
  value: string | number,
  currency = 'XOF',
): string {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(num);
}
