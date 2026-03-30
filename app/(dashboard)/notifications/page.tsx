import { Header } from '@/components/layout/Header';

export const metadata = { title: 'Notifications' };

const NOTIF_TYPES = [
  { label: 'SMS', icon: '📱', color: 'text-green-400 bg-green-500/10 border-green-500/25' },
  { label: 'Email', icon: '✉️', color: 'text-blue-400 bg-blue-500/10 border-blue-500/25' },
  { label: 'Push', icon: '🔔', color: 'text-purple-400 bg-purple-500/10 border-purple-500/25' },
  { label: 'Livraison', icon: '📦', color: 'text-amber-400 bg-amber-500/10 border-amber-500/25' },
];

export default function NotificationsPage() {
  return (
    <div className="flex flex-col flex-1">
      <Header
        title="Notifications"
        subtitle="Historique et gestion des envois"
        actions={
          <button className="px-4 py-2 text-xs font-bold font-display bg-[#F5A623] hover:bg-[#E8931A] text-[#0D0E12] rounded-lg transition-colors">
            + Envoyer notification
          </button>
        }
      />

      <main className="flex-1 p-6 space-y-6">
        {/* Stats par type */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {NOTIF_TYPES.map((t) => (
            <div key={t.label} className={`rounded-xl p-4 border ${t.color} border`}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-base">{t.icon}</span>
                <p className="text-xs font-bold font-display uppercase tracking-wider">{t.label}</p>
              </div>
              <p className="text-xl font-bold font-display">—</p>
              <p className="text-[10px] opacity-60 mt-0.5">envoyés</p>
            </div>
          ))}
        </div>

        {/* Log notifications */}
        <div className="bg-[#13151C] border border-white/[0.07] rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-white/[0.07] flex items-center justify-between">
            <h2 className="text-sm font-bold font-display text-white">Journal des envois</h2>
            <div className="flex gap-2">
              {['Tous', 'SMS', 'Email', 'Push'].map((f, i) => (
                <button key={f} className={`px-2.5 py-1 text-xs font-semibold font-display rounded-lg border transition-colors ${i === 0 ? 'bg-[#F5A623]/10 text-[#F5A623] border-[#F5A623]/25' : 'bg-transparent text-[#9A9DB8] border-white/[0.07] hover:text-white'}`}>
                  {f}
                </button>
              ))}
            </div>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.07] bg-[#1A1D27]">
                {['Destinataire', 'Type', 'Message', 'Statut', 'Date'].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[10px] font-semibold font-display uppercase tracking-widest text-[#5C6080]">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 6 }).map((_, i) => (
                <tr key={i} className="border-b border-white/[0.04] last:border-0">
                  {[60, 30, 80, 40, 50].map((w, j) => (
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
          Module 8 — SMS · Email · Push mobile · Notifications livraison
        </p>
      </main>
    </div>
  );
}
