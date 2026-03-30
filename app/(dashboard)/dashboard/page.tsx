import { Header } from '@/components/layout/Header';
import { StatCard } from '@/components/ui/StatCard';

export const metadata = { title: 'Dashboard' };

export default function DashboardPage() {
  return (
    <div className="flex flex-col flex-1">
      <Header
        title="Vue générale"
        subtitle="Tableau de bord administration"
      />

      <main className="flex-1 p-6 space-y-6">
        {/* KPI Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Utilisateurs"
            value="—"
            subtitle="total inscrits"
            variant="brand"
            icon={
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            }
          />
          <StatCard
            title="Transactions (24h)"
            value="—"
            subtitle="volume du jour"
            variant="success"
            icon={
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            }
          />
          <StatCard
            title="KYC en attente"
            value="—"
            subtitle="à traiter"
            variant="warning"
            icon={
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            }
          />
          <StatCard
            title="Litiges ouverts"
            value="—"
            subtitle="à résoudre"
            variant="error"
            icon={
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            }
          />
        </div>

        {/* Second row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Volume total"     value="—" subtitle="FCFA en circulation" />
          <StatCard title="Séquestres actifs" value="—" subtitle="commandes en escrow" />
          <StatCard title="Commandes en cours" value="—" subtitle="en livraison" />
          <StatCard title="Nouveaux aujourd'hui" value="—" subtitle="inscriptions" />
        </div>

        {/* Activité récente */}
        <div className="bg-[#13151C] border border-white/[0.07] rounded-xl p-5">
          <h2 className="text-sm font-bold font-display text-white mb-4">Transactions récentes</h2>
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-12 bg-[#1A1D27] rounded-lg animate-pulse" />
            ))}
          </div>
          <p className="text-xs text-[#5C6080] text-center mt-4">
            Connectez le backend Django pour afficher les données réelles.
          </p>
        </div>
      </main>
    </div>
  );
}
