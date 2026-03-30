/**
 * NONVIPAY — Badge de statut
 */

type BadgeVariant = 'success' | 'warning' | 'error' | 'info' | 'neutral' | 'purple' | 'orange';

const VARIANT_CLASSES: Record<BadgeVariant, string> = {
  success: 'bg-green-500/10 text-green-400 border-green-500/25',
  warning: 'bg-amber-500/10 text-amber-400 border-amber-500/25',
  error:   'bg-red-500/10 text-red-400 border-red-500/25',
  info:    'bg-blue-500/10 text-blue-400 border-blue-500/25',
  neutral: 'bg-white/5 text-[#9A9DB8] border-white/10',
  purple:  'bg-purple-500/10 text-purple-400 border-purple-500/25',
  orange:  'bg-orange-500/10 text-orange-400 border-orange-500/25',
};

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  dot?: boolean;
}

export function Badge({ variant = 'neutral', children, dot }: BadgeProps) {
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold font-display uppercase tracking-wider border ${VARIANT_CLASSES[variant]}`}>
      {dot && <span className={`w-1 h-1 rounded-full ${variant === 'success' ? 'bg-green-400' : variant === 'error' ? 'bg-red-400' : variant === 'warning' ? 'bg-amber-400' : 'bg-current'}`} />}
      {children}
    </span>
  );
}

// ── Helpers pour statuts métier ── //

export function TransactionStatusBadge({ status }: { status: string }) {
  const map: Record<string, { variant: BadgeVariant; label: string }> = {
    PENDING:    { variant: 'warning', label: 'En attente' },
    SUCCESS:    { variant: 'success', label: 'Succès' },
    FAILED:     { variant: 'error',   label: 'Échoué' },
    CANCELLED:  { variant: 'neutral', label: 'Annulé' },
    PROCESSING: { variant: 'info',    label: 'En cours' },
  };
  const conf = map[status] ?? { variant: 'neutral' as BadgeVariant, label: status };
  return <Badge variant={conf.variant} dot>{conf.label}</Badge>;
}

export function KycStatusBadge({ status }: { status: string }) {
  const map: Record<string, { variant: BadgeVariant; label: string }> = {
    NOT_SUBMITTED: { variant: 'neutral', label: 'Non soumis' },
    PENDING:       { variant: 'warning', label: 'En attente' },
    APPROVED:      { variant: 'success', label: 'Approuvé' },
    REJECTED:      { variant: 'error',   label: 'Rejeté' },
  };
  const conf = map[status] ?? { variant: 'neutral' as BadgeVariant, label: status };
  return <Badge variant={conf.variant} dot>{conf.label}</Badge>;
}

export function OrderStatusBadge({ status }: { status: string }) {
  const map: Record<string, { variant: BadgeVariant; label: string }> = {
    EN_ATTENTE:   { variant: 'neutral', label: 'En attente' },
    VALIDEE:      { variant: 'info',    label: 'Validée' },
    EN_LIVRAISON: { variant: 'warning', label: 'En livraison' },
    LIVREE:       { variant: 'purple',  label: 'Livrée' },
    TERMINEE:     { variant: 'success', label: 'Terminée' },
    ANNULEE:      { variant: 'neutral', label: 'Annulée' },
    LITIGE:       { variant: 'error',   label: 'Litige' },
  };
  const conf = map[status] ?? { variant: 'neutral' as BadgeVariant, label: status };
  return <Badge variant={conf.variant} dot>{conf.label}</Badge>;
}

export function UserStatusBadge({ status }: { status: string }) {
  const map: Record<string, { variant: BadgeVariant; label: string }> = {
    ACTIVE:    { variant: 'success', label: 'Actif' },
    INACTIVE:  { variant: 'neutral', label: 'Inactif' },
    BLOCKED:   { variant: 'error',   label: 'Bloqué' },
    SUSPENDED: { variant: 'warning', label: 'Suspendu' },
  };
  const conf = map[status] ?? { variant: 'neutral' as BadgeVariant, label: status };
  return <Badge variant={conf.variant} dot>{conf.label}</Badge>;
}

export function DisputeStatusBadge({ status }: { status: string }) {
  const map: Record<string, { variant: BadgeVariant; label: string }> = {
    OPEN:              { variant: 'error',   label: 'Ouvert' },
    UNDER_REVIEW:      { variant: 'warning', label: 'En examen' },
    RESOLVED_BUYER:    { variant: 'success', label: 'Résolu acheteur' },
    RESOLVED_SELLER:   { variant: 'success', label: 'Résolu vendeur' },
    CLOSED:            { variant: 'neutral', label: 'Fermé' },
  };
  const conf = map[status] ?? { variant: 'neutral' as BadgeVariant, label: status };
  return <Badge variant={conf.variant} dot>{conf.label}</Badge>;
}
