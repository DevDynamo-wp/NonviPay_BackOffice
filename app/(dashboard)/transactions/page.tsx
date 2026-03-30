import { Header } from '@/components/layout/Header';

export const metadata = { title: 'Transactions' };

export default function TransactionsPage() {
  return (
    <div className="flex flex-col flex-1">
      <Header
        title="Transactions"
        subtitle="Historique et monitoring des paiements"
        actions={
          <div className="flex gap-2">
            <input type="date" className="px-3 py-1.5 text-xs bg-[#191C28] border border-white/[0.07] rounded-lg text-[#9A9DB8] focus:outline-none focus:border-[#F5A623]/50" />
            <input type="date" className="px-3 py-1.5 text-xs bg-[#191C28] border border-white/[0.07] rounded-lg text-[#9A9DB8] focus:outline-none focus:border-[#F5A623]/50" />
            <select className="px-3 py-1.5 text-xs bg-[#191C28] border border-white/[0.07] rounded-lg text-[#9A9DB8] focus:outline-none focus:border-[#F5A623]/50">
              <option value="">Tous les types</option>
              <option value="TRANSFER_P2P">Transfert P2P</option>
              <option value="DEPOSIT_MOBILE_MONEY">Dépôt Mobile Money</option>
              <option value="WITHDRAWAL_MOBILE_MONEY">Retrait Mobile Money</option>
              <option value="PAYMENT_MERCHANT">Paiement marchand</option>
              <option value="ESCROW_LOCK">Séquestre</option>
            </select>
            <select className="px-3 py-1.5 text-xs bg-[#191C28] border border-white/[0.07] rounded-lg text-[#9A9DB8] focus:outline-none focus:border-[#F5A623]/50">
              <option value="">Tous statuts</option>
              <option value="PENDING">En attente</option>
              <option value="SUCCESS">Succès</option>
              <option value="FAILED">Échoué</option>
            </select>
          </div>
        }
      />

      <main className="flex-1 p-6">
        <div className="bg-[#13151C] border border-white/[0.07] rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.07] bg-[#1A1D27]">
                {['Référence', 'Type', 'Expéditeur', 'Destinataire', 'Montant', 'Frais', 'Statut', 'Date'].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[10px] font-semibold font-display uppercase tracking-widest text-[#5C6080] whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 8 }).map((_, i) => (
                <tr key={i} className="border-b border-white/[0.04] last:border-0 hover:bg-[#1A1D27] cursor-pointer transition-colors">
                  {[80, 60, 70, 70, 50, 40, 55, 60].map((w, j) => (
                    <td key={j} className="px-4 py-3.5">
                      <div className="h-4 bg-white/[0.04] rounded animate-pulse" style={{ width: `${w}%` }} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-[#5C6080] text-center mt-4">
          Endpoint : <code className="font-mono text-[#F5A623]">GET /api/v1/admin/transactions/</code>
        </p>
      </main>
    </div>
  );
}
