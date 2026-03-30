import { Header } from '@/components/layout/Header';
export const metadata = { title: 'Wallets' };
export default function WalletsPage() {
  return (
    <div className="flex flex-col flex-1">
      <Header title="Wallets" subtitle="Portefeuilles numériques et soldes" />
      <main className="flex-1 p-6">
        <div className="bg-[#13151C] border border-white/[0.07] rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.07] bg-[#1A1D27]">
                {['Wallet ID', 'Propriétaire', 'Solde', 'Devise', 'Statut', 'Dernière activité'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-[10px] font-semibold font-display uppercase tracking-widest text-[#5C6080]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 8 }).map((_, i) => (
                <tr key={i} className="border-b border-white/[0.04] last:border-0 hover:bg-[#1A1D27] cursor-pointer transition-colors">
                  {[80, 65, 50, 30, 45, 55].map((w, j) => (
                    <td key={j} className="px-4 py-3.5"><div className="h-4 bg-white/[0.04] rounded animate-pulse" style={{ width: `${w}%` }} /></td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-[#5C6080] text-center mt-4">Endpoint : <code className="font-mono text-[#F5A623]">GET /api/v1/admin/utilisateurs/:id/wallet/</code></p>
      </main>
    </div>
  );
}
