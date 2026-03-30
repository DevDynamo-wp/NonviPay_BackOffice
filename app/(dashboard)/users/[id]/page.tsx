import { Header } from '@/components/layout/Header';
import Link from 'next/link';

export const metadata = { title: 'Détail utilisateur' };

export default function UserDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="flex flex-col flex-1">
      <Header
        title="Profil utilisateur"
        subtitle={`ID : ${params.id}`}
        actions={
          <div className="flex gap-2">
            <Link
              href="/users"
              className="px-3 py-1.5 text-xs font-semibold font-display bg-[#1A1D27] hover:bg-[#21253A] text-[#9A9DB8] hover:text-white border border-white/[0.07] rounded-lg transition-colors"
            >
              ← Retour
            </Link>
            <button className="px-3 py-1.5 text-xs font-semibold font-display bg-red-500/10 text-red-400 border border-red-500/25 rounded-lg hover:bg-red-500/20 transition-colors">
              Bloquer
            </button>
          </div>
        }
      />

      <main className="flex-1 p-6 space-y-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Infos profil */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-[#13151C] border border-white/[0.07] rounded-xl p-5">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 rounded-full bg-[#F5A623]/10 flex items-center justify-center">
                  <span className="text-[#F5A623] text-xl font-bold font-display">?</span>
                </div>
                <div>
                  <div className="h-4 w-32 bg-white/[0.05] rounded animate-pulse mb-1.5" />
                  <div className="h-3 w-24 bg-white/[0.04] rounded animate-pulse" />
                </div>
              </div>

              {[
                { label: 'Email' },
                { label: 'Téléphone' },
                { label: 'Statut' },
                { label: 'KYC' },
                { label: 'Inscrit le' },
                { label: 'Parrain' },
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between py-2.5 border-b border-white/[0.04] last:border-0">
                  <span className="text-xs font-semibold font-display text-[#5C6080] uppercase tracking-wider">{row.label}</span>
                  <div className="h-3.5 w-28 bg-white/[0.04] rounded animate-pulse" />
                </div>
              ))}
            </div>

            {/* Wallet */}
            <div className="bg-[#13151C] border border-white/[0.07] rounded-xl p-5">
              <h3 className="text-xs font-bold font-display uppercase tracking-widest text-[#5C6080] mb-4">Wallet</h3>
              <div className="bg-[#1A1D27] rounded-lg p-4">
                <p className="text-xs text-[#5C6080] mb-1">Solde disponible</p>
                <div className="h-6 w-36 bg-white/[0.05] rounded animate-pulse" />
                <div className="flex gap-2 mt-3">
                  <span className="px-2 py-0.5 text-[10px] font-bold font-display uppercase rounded-full bg-green-500/10 text-green-400 border border-green-500/25">Actif</span>
                  <span className="px-2 py-0.5 text-[10px] font-display text-[#5C6080]">XOF</span>
                </div>
              </div>
            </div>
          </div>

          {/* Transactions récentes */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-[#13151C] border border-white/[0.07] rounded-xl overflow-hidden">
              <div className="px-5 py-4 border-b border-white/[0.07]">
                <h3 className="text-sm font-bold font-display text-white">Transactions récentes</h3>
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/[0.07] bg-[#1A1D27]">
                    {['Référence', 'Type', 'Montant', 'Statut', 'Date'].map((h) => (
                      <th key={h} className="px-4 py-3 text-left text-[10px] font-semibold font-display uppercase tracking-widest text-[#5C6080]">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i} className="border-b border-white/[0.04] last:border-0">
                      {[70, 60, 45, 50, 55].map((w, j) => (
                        <td key={j} className="px-4 py-3.5">
                          <div className="h-4 bg-white/[0.04] rounded animate-pulse" style={{ width: `${w}%` }} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Documents KYC */}
            <div className="bg-[#13151C] border border-white/[0.07] rounded-xl p-5">
              <h3 className="text-sm font-bold font-display text-white mb-4">Documents KYC</h3>
              <div className="grid grid-cols-3 gap-3">
                {['Recto', 'Verso', 'Selfie'].map((doc) => (
                  <div key={doc} className="aspect-video bg-[#1A1D27] rounded-lg border border-white/[0.04] flex flex-col items-center justify-center gap-1.5">
                    <svg className="w-5 h-5 text-[#5C6080]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-[10px] text-[#5C6080] font-display">{doc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
