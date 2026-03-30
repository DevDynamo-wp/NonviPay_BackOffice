import { Header } from '@/components/layout/Header';

export const metadata = { title: 'Utilisateurs' };

export default function UsersPage() {
  return (
    <div className="flex flex-col flex-1">
      <Header
        title="Utilisateurs"
        subtitle="Gestion des comptes et profils"
        actions={
          <div className="flex items-center gap-2">
            <input
              type="search"
              placeholder="Rechercher…"
              className="px-3 py-1.5 text-sm bg-[#191C28] border border-white/[0.07] rounded-lg text-white placeholder-[#5C6080] focus:outline-none focus:border-[#F5A623]/50 w-52"
            />
          </div>
        }
      />

      <main className="flex-1 p-6">
        {/* Filtres */}
        <div className="flex items-center gap-2 mb-4">
          {['Tous', 'Actifs', 'Bloqués', 'KYC en attente'].map((f) => (
            <button
              key={f}
              className={`px-3 py-1.5 text-xs font-semibold font-display rounded-lg border transition-colors ${
                f === 'Tous'
                  ? 'bg-[#F5A623]/10 text-[#F5A623] border-[#F5A623]/25'
                  : 'bg-transparent text-[#9A9DB8] border-white/[0.07] hover:border-white/[0.14] hover:text-white'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="bg-[#13151C] border border-white/[0.07] rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.07] bg-[#1A1D27]">
                {['Utilisateur', 'Téléphone', 'Statut', 'KYC', 'Wallet', 'Inscrit le', 'Actions'].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[10px] font-semibold font-display uppercase tracking-widest text-[#5C6080]">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="border-b border-white/[0.04] last:border-0">
                  {Array.from({ length: 7 }).map((_, j) => (
                    <td key={j} className="px-4 py-3.5">
                      <div className="h-4 bg-white/[0.04] rounded animate-pulse" style={{ width: j === 0 ? '80%' : '60%' }} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-xs text-[#5C6080] text-center mt-6">
          Connectez le backend Django — endpoint : <code className="font-mono text-[#F5A623]">GET /api/v1/admin/utilisateurs/</code>
        </p>
      </main>
    </div>
  );
}
