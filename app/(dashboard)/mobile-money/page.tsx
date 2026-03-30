import { Header } from '@/components/layout/Header';

export const metadata = { title: 'Mobile Money' };

export default function MobileMoneyPage() {
  return (
    <div className="flex flex-col flex-1">
      <Header
        title="Mobile Money"
        subtitle="Dépôts et retraits via opérateurs locaux"
        actions={
          <div className="flex gap-2">
            <select className="px-3 py-1.5 text-xs bg-[#191C28] border border-white/[0.07] rounded-lg text-[#9A9DB8] focus:outline-none focus:border-[#F5A623]/50">
              <option value="">Tous opérateurs</option>
              <option value="MTN">MTN</option>
              <option value="MOOV">MOOV</option>
              <option value="ORANGE">Orange</option>
              <option value="WAVE">Wave</option>
            </select>
            <select className="px-3 py-1.5 text-xs bg-[#191C28] border border-white/[0.07] rounded-lg text-[#9A9DB8] focus:outline-none focus:border-[#F5A623]/50">
              <option value="">Tous types</option>
              <option value="DEPOSIT">Dépôt</option>
              <option value="WITHDRAWAL">Retrait</option>
            </select>
          </div>
        }
      />

      <main className="flex-1 p-6 space-y-6">
        {/* Stats opérateurs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'MTN', color: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/25' },
            { label: 'MOOV', color: 'bg-blue-500/10 text-blue-400 border-blue-500/25' },
            { label: 'Orange', color: 'bg-orange-500/10 text-orange-400 border-orange-500/25' },
            { label: 'Wave', color: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/25' },
          ].map((op) => (
            <div key={op.label} className={`rounded-xl p-4 border ${op.color}`}>
              <p className="text-xs font-bold font-display uppercase tracking-wider mb-2">{op.label}</p>
              <p className="text-xl font-bold font-display">—</p>
              <p className="text-[10px] opacity-70 mt-0.5">transactions</p>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="bg-[#13151C] border border-white/[0.07] rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.07] bg-[#1A1D27]">
                {['ID', 'Utilisateur', 'Téléphone', 'Opérateur', 'Type', 'Montant', 'Statut', 'Réf. externe', 'Date'].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[10px] font-semibold font-display uppercase tracking-widest text-[#5C6080] whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 7 }).map((_, i) => (
                <tr key={i} className="border-b border-white/[0.04] last:border-0 hover:bg-[#1A1D27] cursor-pointer transition-colors">
                  {[55, 65, 55, 40, 35, 45, 50, 60, 55].map((w, j) => (
                    <td key={j} className="px-4 py-3.5">
                      <div className="h-4 bg-white/[0.04] rounded animate-pulse" style={{ width: `${w}%` }} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-xs text-[#5C6080] text-center">
          Endpoints :&nbsp;
          <code className="font-mono text-[#F5A623]">GET /api/v1/admin/mobile-money/</code>
          &nbsp;·&nbsp;
          <code className="font-mono text-[#F5A623]">POST /mobilemoney/deposit</code>
        </p>
      </main>
    </div>
  );
}
