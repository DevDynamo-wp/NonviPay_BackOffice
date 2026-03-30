import { Header } from '@/components/layout/Header';

export const metadata = { title: 'Litiges' };

export default function DisputesPage() {
  return (
    <div className="flex flex-col flex-1">
      <Header title="Litiges" subtitle="Gestion et résolution des conflits escrow" />
      <main className="flex-1 p-6 space-y-4">
        <div className="grid gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-[#13151C] border border-white/[0.07] rounded-xl p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="space-y-1.5">
                  <div className="h-4 w-28 bg-white/[0.05] rounded animate-pulse" />
                  <div className="h-3 w-48 bg-white/[0.04] rounded animate-pulse" />
                </div>
                <span className="px-2 py-0.5 text-[10px] font-bold font-display uppercase tracking-wider rounded-full bg-red-500/10 text-red-400 border border-red-500/25">
                  Ouvert
                </span>
              </div>
              <div className="flex gap-2 mt-4">
                <button className="px-3 py-1.5 text-xs font-semibold font-display bg-blue-500/10 text-blue-400 border border-blue-500/25 rounded-lg hover:bg-blue-500/20 transition-colors">
                  Examiner
                </button>
                <button className="px-3 py-1.5 text-xs font-semibold font-display bg-green-500/10 text-green-400 border border-green-500/25 rounded-lg hover:bg-green-500/20 transition-colors">
                  Résoudre → Acheteur
                </button>
                <button className="px-3 py-1.5 text-xs font-semibold font-display bg-[#F5A623]/10 text-[#F5A623] border border-[#F5A623]/25 rounded-lg hover:bg-[#F5A623]/20 transition-colors">
                  Résoudre → Vendeur
                </button>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-[#5C6080] text-center pt-2">
          Endpoint : <code className="font-mono text-[#F5A623]">GET /api/v1/admin/litiges/</code>
        </p>
      </main>
    </div>
  );
}
