import { Header } from '@/components/layout/Header';

export const metadata = { title: 'KYC — Validation identité' };

export default function KycPage() {
  return (
    <div className="flex flex-col flex-1">
      <Header
        title="KYC"
        subtitle="Validation des pièces d'identité"
        actions={
          <span className="px-2.5 py-1 text-xs font-bold font-display rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/25">
            — en attente
          </span>
        }
      />

      <main className="flex-1 p-6 space-y-4">
        <div className="flex gap-2">
          {['Tous', 'En attente', 'Approuvés', 'Rejetés'].map((f, i) => (
            <button
              key={f}
              className={`px-3 py-1.5 text-xs font-semibold font-display rounded-lg border transition-colors ${
                i === 1
                  ? 'bg-amber-500/10 text-amber-400 border-amber-500/25'
                  : 'bg-transparent text-[#9A9DB8] border-white/[0.07] hover:text-white hover:border-white/[0.14]'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-[#13151C] border border-white/[0.07] rounded-xl p-5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#1A1D27] animate-pulse" />
                <div className="space-y-1.5">
                  <div className="h-3.5 w-32 bg-white/[0.05] rounded animate-pulse" />
                  <div className="h-3 w-24 bg-white/[0.04] rounded animate-pulse" />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-5 w-16 bg-amber-500/10 rounded-full animate-pulse" />
                <button className="px-3 py-1.5 text-xs font-semibold font-display bg-green-500/10 text-green-400 border border-green-500/25 rounded-lg hover:bg-green-500/20 transition-colors">
                  Approuver
                </button>
                <button className="px-3 py-1.5 text-xs font-semibold font-display bg-red-500/10 text-red-400 border border-red-500/25 rounded-lg hover:bg-red-500/20 transition-colors">
                  Rejeter
                </button>
              </div>
            </div>
          ))}
        </div>

        <p className="text-xs text-[#5C6080] text-center pt-4">
          Endpoint : <code className="font-mono text-[#F5A623]">GET /api/v1/admin/kyc/?status=PENDING</code>
        </p>
      </main>
    </div>
  );
}
