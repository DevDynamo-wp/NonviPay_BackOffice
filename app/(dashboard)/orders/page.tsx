import { Header } from '@/components/layout/Header';
export const metadata = { title: 'Commandes — Escrow' };
export default function OrdersPage() {
  return (
    <div className="flex flex-col flex-1">
      <Header title="Commandes" subtitle="Transactions escrow et achat de biens" />
      <main className="flex-1 p-6">
        <div className="flex gap-2 mb-4 flex-wrap">
          {['Tous', 'En attente', 'Validées', 'En livraison', 'Livrées', 'Terminées', 'Annulées', 'Litige'].map((f, i) => (
            <button key={f} className={`px-3 py-1.5 text-xs font-semibold font-display rounded-lg border transition-colors ${i === 0 ? 'bg-[#F5A623]/10 text-[#F5A623] border-[#F5A623]/25' : 'bg-transparent text-[#9A9DB8] border-white/[0.07] hover:text-white hover:border-white/[0.14]'}`}>
              {f}
            </button>
          ))}
        </div>
        <div className="bg-[#13151C] border border-white/[0.07] rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.07] bg-[#1A1D27]">
                {['Référence', 'Vendeur', 'Acheteur', 'Montant', 'Statut', 'Séquestre', 'Date'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-[10px] font-semibold font-display uppercase tracking-widest text-[#5C6080]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 6 }).map((_, i) => (
                <tr key={i} className="border-b border-white/[0.04] last:border-0 hover:bg-[#1A1D27] cursor-pointer transition-colors">
                  {[70, 60, 60, 45, 50, 40, 55].map((w, j) => (
                    <td key={j} className="px-4 py-3.5"><div className="h-4 bg-white/[0.04] rounded animate-pulse" style={{ width: `${w}%` }} /></td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-[#5C6080] text-center mt-4">Endpoint : <code className="font-mono text-[#F5A623]">GET /api/v1/admin/commandes/</code></p>
      </main>
    </div>
  );
}
