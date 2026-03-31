"use client";

import { useEffect, useState, useCallback } from "react";
import { Header } from "@/components/layout/Header";

// ─── Types ────────────────────────────────────────────────────────────────────

interface DashboardStats {
  utilisateurs: {
    total: number;
    nouveaux_ce_mois: number;
    bloques: number;
    kyc_en_attente: number;
  };
  transactions: {
    total: number;
    succes: number;
    echec: number;
    aujourd_hui: number;
    volume_mois_xof: string;
  };
  litiges: {
    ouverts: number;
    en_examen: number;
    total_actifs: number;
  };
  genere_le: string;
}

interface RecentTransaction {
  id: string;
  reference: string;
  type: string;
  statut: string;
  montant: string;
  frais: string;
  devise: { code: string };
  description: string;
  created_at: string;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("nonvipay_access_token");
}

async function apiFetch<T>(endpoint: string): Promise<T> {
  const token = getToken();
  const res = await fetch(`http://localhost:8000/api/v1${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

function formatAmount(value: string | number): string {
  const num = typeof value === "string" ? parseFloat(value) : value;
  if (isNaN(num)) return "—";
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "XOF",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num);
}

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}

const TX_TYPE_LABELS: Record<string, string> = {
  P2P: "Transfert P2P",
  MOBILE_MONEY: "Mobile Money",
  SEQUESTRE: "Séquestre",
  ESCROW_HOLD: "Blocage Escrow",
  ESCROW_RELEASE_SELLER: "Libération Vendeur",
  ESCROW_RELEASE_DELIVERY: "Paiement Livreur",
  ESCROW_REFUND: "Remboursement",
  MARCHAND: "Paiement marchand",
};

const TX_STATUS_CONFIG: Record<string, { label: string; cls: string }> = {
  SUCCES: {
    label: "Succès",
    cls: "bg-green-500/10 text-green-400 border-green-500/25",
  },
  ECHEC: {
    label: "Échoué",
    cls: "bg-red-500/10 text-red-400 border-red-500/25",
  },
  EN_ATTENTE: {
    label: "En attente",
    cls: "bg-amber-500/10 text-amber-400 border-amber-500/25",
  },
  INITIE: {
    label: "Initié",
    cls: "bg-blue-500/10 text-blue-400 border-blue-500/25",
  },
  ANNULE: {
    label: "Annulé",
    cls: "bg-white/5 text-[#9A9DB8] border-white/10",
  },
};

// ─── Sub-components ──────────────────────────────────────────────────────────

function KpiCard({
  title,
  value,
  sub,
  icon,
  accent,
  loading,
}: {
  title: string;
  value: string | number;
  sub?: string;
  icon: React.ReactNode;
  accent: "brand" | "green" | "amber" | "red" | "blue";
  loading?: boolean;
}) {
  const accentMap = {
    brand: {
      icon: "bg-[#F5A623]/10 text-[#F5A623]",
      value: "text-[#F5A623]",
    },
    green: { icon: "bg-green-500/10 text-green-400", value: "text-green-400" },
    amber: { icon: "bg-amber-500/10 text-amber-400", value: "text-amber-400" },
    red: { icon: "bg-red-500/10 text-red-400", value: "text-red-400" },
    blue: { icon: "bg-blue-500/10 text-blue-400", value: "text-blue-400" },
  };
  const a = accentMap[accent];

  return (
    <div className="bg-[#13151C] border border-white/[0.07] rounded-xl p-5 flex flex-col gap-3 hover:border-white/[0.12] transition-colors">
      <div className="flex items-start justify-between">
        <p className="text-[10px] font-semibold font-display uppercase tracking-widest text-[#5C6080]">
          {title}
        </p>
        <div
          className={`w-8 h-8 rounded-lg flex items-center justify-center ${a.icon}`}
        >
          {icon}
        </div>
      </div>
      {loading ? (
        <div className="h-8 w-28 bg-white/[0.06] rounded-lg animate-pulse" />
      ) : (
        <div>
          <p className={`text-2xl font-bold font-display ${a.value}`}>
            {value}
          </p>
          {sub && <p className="text-xs text-[#5C6080] mt-0.5">{sub}</p>}
        </div>
      )}
    </div>
  );
}

function AlertBanner({
  kycPending,
  litigesActifs,
}: {
  kycPending: number;
  litigesActifs: number;
}) {
  if (kycPending === 0 && litigesActifs === 0) return null;
  return (
    <div className="flex flex-wrap gap-3">
      {kycPending > 0 && (
        <div className="flex items-center gap-2.5 px-4 py-2.5 bg-amber-500/10 border border-amber-500/25 rounded-xl text-sm text-amber-400 font-display font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          {kycPending} document{kycPending > 1 ? "s" : ""} KYC en attente de
          validation
        </div>
      )}
      {litigesActifs > 0 && (
        <div className="flex items-center gap-2.5 px-4 py-2.5 bg-red-500/10 border border-red-500/25 rounded-xl text-sm text-red-400 font-display font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
          {litigesActifs} litige{litigesActifs > 1 ? "s" : ""} actif
          {litigesActifs > 1 ? "s" : ""} à traiter
        </div>
      )}
    </div>
  );
}

function DonutChart({
  succes,
  echec,
  enAttente,
}: {
  succes: number;
  echec: number;
  enAttente: number;
}) {
  const total = succes + echec + enAttente || 1;
  const pct = (v: number) => Math.round((v / total) * 100);

  // SVG donut simple
  const radius = 56;
  const circumference = 2 * Math.PI * radius;
  const sPct = succes / total;
  const ePct = echec / total;
  const wPct = enAttente / total;

  const segments = [
    { pct: sPct, color: "#22C55E", offset: 0 },
    { pct: ePct, color: "#EF4444", offset: sPct },
    { pct: wPct, color: "#F5A623", offset: sPct + ePct },
  ];

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-36 h-36">
        <svg
          viewBox="0 0 140 140"
          className="w-full h-full -rotate-90"
          style={{ filter: "drop-shadow(0 0 8px rgba(34,197,94,0.15))" }}
        >
          <circle
            cx="70"
            cy="70"
            r={radius}
            fill="none"
            stroke="#1A1D27"
            strokeWidth="18"
          />
          {segments.map((seg, i) =>
            seg.pct > 0 ? (
              <circle
                key={i}
                cx="70"
                cy="70"
                r={radius}
                fill="none"
                stroke={seg.color}
                strokeWidth="18"
                strokeDasharray={`${seg.pct * circumference} ${circumference}`}
                strokeDashoffset={`${-seg.offset * circumference}`}
                strokeLinecap="butt"
              />
            ) : null
          )}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-xs text-[#5C6080] font-display">total</p>
          <p className="text-xl font-bold font-display text-white">
            {total === 1 && succes + echec + enAttente === 0 ? "0" : total}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2 w-full">
        {[
          { label: "Succès", val: succes, pct: pct(succes), color: "bg-green-400" },
          { label: "Échecs", val: echec, pct: pct(echec), color: "bg-red-400" },
          {
            label: "En attente",
            val: enAttente,
            pct: pct(enAttente),
            color: "bg-[#F5A623]",
          },
        ].map((row) => (
          <div key={row.label} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${row.color}`} />
              <span className="text-xs text-[#9A9DB8] font-display">
                {row.label}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-white">{row.val.toLocaleString("fr-FR")}</span>
              <span className="text-[10px] text-[#5C6080]">{row.pct}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function VolumeBar({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  const pct = max > 0 ? (value / max) * 100 : 0;
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-xs">
        <span className="text-[#9A9DB8] font-display">{label}</span>
        <span className="font-mono text-white">{value.toLocaleString("fr-FR")}</span>
      </div>
      <div className="h-1.5 bg-[#1A1D27] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [transactions, setTransactions] = useState<RecentTransaction[]>([]);
  const [loadingStats, setLoadingStats] = useState(true);
  const [loadingTx, setLoadingTx] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());

  const fetchStats = useCallback(async () => {
    try {
      setLoadingStats(true);
      const res = await apiFetch<{ success: boolean; data: DashboardStats }>(
        "/admin/dashboard/"
      );
      if (res.success) setStats(res.data);
      else setError("Réponse inattendue du serveur.");
    } catch (e) {
      setError(
        "Impossible de contacter le backend Django. Vérifiez qu'il tourne sur le port 8000."
      );
    } finally {
      setLoadingStats(false);
      setLastRefresh(new Date());
    }
  }, []);

  const fetchTransactions = useCallback(async () => {
    try {
      setLoadingTx(true);
      // Endpoint transactions admin — si non disponible, on gère silencieusement
      const res = await apiFetch<{ results?: RecentTransaction[]; transactions?: RecentTransaction[] }>(
        "/admin/transactions/?page=1&page_size=8&ordering=-created_at"
      );
      const txList = res.results ?? res.transactions ?? [];
      setTransactions(txList.slice(0, 8));
    } catch {
      // Endpoint pas encore implémenté — on affiche simplement vide
      setTransactions([]);
    } finally {
      setLoadingTx(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
    fetchTransactions();
  }, [fetchStats, fetchTransactions]);

  const taux_succes =
    stats && stats.transactions.total > 0
      ? Math.round((stats.transactions.succes / stats.transactions.total) * 100)
      : 0;

  const max_bar = stats
    ? Math.max(
        stats.transactions.succes,
        stats.transactions.echec,
        stats.transactions.aujourd_hui,
        1
      )
    : 1;

  return (
    <div className="flex flex-col flex-1">
      <Header
        title="Vue générale"
        subtitle="Tableau de bord administration"
        actions={
          <div className="flex items-center gap-3">
            {lastRefresh && (
              <span className="text-[10px] text-[#5C6080] font-display">
                Mis à jour à{" "}
                {lastRefresh.toLocaleTimeString("fr-FR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            )}
            <button
              onClick={() => { fetchStats(); fetchTransactions(); }}
              className="px-3 py-1.5 text-xs font-semibold font-display bg-[#1A1D27] hover:bg-[#21253A] text-[#9A9DB8] hover:text-white border border-white/[0.07] rounded-lg transition-colors flex items-center gap-1.5"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Actualiser
            </button>
          </div>
        }
      />

      <main className="flex-1 p-6 space-y-6 overflow-auto">
        {/* ── Erreur de connexion ── */}
        {error && (
          <div className="flex items-start gap-3 px-4 py-3.5 bg-red-500/10 border border-red-500/25 rounded-xl text-red-400 text-sm font-display">
            <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            </svg>
            <div>
              <p className="font-semibold">Erreur de connexion</p>
              <p className="text-red-400/70 text-xs mt-0.5">{error}</p>
            </div>
          </div>
        )}

        {/* ── Alertes actives ── */}
        {stats && (
          <AlertBanner
            kycPending={stats.utilisateurs.kyc_en_attente}
            litigesActifs={stats.litiges.total_actifs}
          />
        )}

        {/* ── KPI Row 1 ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard
            title="Utilisateurs"
            value={stats ? stats.utilisateurs.total.toLocaleString("fr-FR") : "—"}
            sub={`+${stats?.utilisateurs.nouveaux_ce_mois ?? "—"} ce mois`}
            accent="brand"
            loading={loadingStats}
            icon={
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            }
          />
          <KpiCard
            title="Transactions aujourd'hui"
            value={stats ? stats.transactions.aujourd_hui.toLocaleString("fr-FR") : "—"}
            sub={`${stats?.transactions.total.toLocaleString("fr-FR") ?? "—"} au total`}
            accent="green"
            loading={loadingStats}
            icon={
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            }
          />
          <KpiCard
            title="KYC en attente"
            value={stats ? stats.utilisateurs.kyc_en_attente : "—"}
            sub="documents à valider"
            accent="amber"
            loading={loadingStats}
            icon={
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            }
          />
          <KpiCard
            title="Litiges ouverts"
            value={stats ? stats.litiges.total_actifs : "—"}
            sub={`${stats?.litiges.en_examen ?? "—"} en examen`}
            accent="red"
            loading={loadingStats}
            icon={
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            }
          />
        </div>

        {/* ── KPI Row 2 ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard
            title="Volume ce mois"
            value={stats ? formatAmount(stats.transactions.volume_mois_xof) : "—"}
            sub="FCFA en circulation"
            accent="blue"
            loading={loadingStats}
            icon={
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
          <KpiCard
            title="Taux de succès"
            value={loadingStats ? "—" : `${taux_succes}%`}
            sub={`${stats?.transactions.echec ?? "—"} échecs`}
            accent={taux_succes >= 90 ? "green" : taux_succes >= 70 ? "amber" : "red"}
            loading={loadingStats}
            icon={
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            }
          />
          <KpiCard
            title="Comptes bloqués"
            value={stats ? stats.utilisateurs.bloques : "—"}
            sub="utilisateurs suspendus"
            accent="red"
            loading={loadingStats}
            icon={
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
              </svg>
            }
          />
          <KpiCard
            title="Litiges en examen"
            value={stats ? stats.litiges.en_examen : "—"}
            sub="en cours de traitement"
            accent="amber"
            loading={loadingStats}
            icon={
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            }
          />
        </div>

        {/* ── Graphiques ── */}
        <div className="grid lg:grid-cols-3 gap-4">
          {/* Donut chart transactions */}
          <div className="bg-[#13151C] border border-white/[0.07] rounded-xl p-5">
            <h2 className="text-sm font-bold font-display text-white mb-5">
              Répartition des transactions
            </h2>
            {loadingStats ? (
              <div className="flex items-center justify-center h-40">
                <div className="w-24 h-24 rounded-full border-4 border-[#1A1D27] border-t-[#F5A623] animate-spin" />
              </div>
            ) : stats ? (
              <DonutChart
                succes={stats.transactions.succes}
                echec={stats.transactions.echec}
                enAttente={
                  stats.transactions.total -
                  stats.transactions.succes -
                  stats.transactions.echec
                }
              />
            ) : null}
          </div>

          {/* Barres volumes */}
          <div className="bg-[#13151C] border border-white/[0.07] rounded-xl p-5">
            <h2 className="text-sm font-bold font-display text-white mb-5">
              Activité transactions
            </h2>
            {loadingStats ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-8 bg-white/[0.04] rounded animate-pulse" />
                ))}
              </div>
            ) : stats ? (
              <div className="space-y-5 mt-2">
                <VolumeBar
                  label="Transactions réussies"
                  value={stats.transactions.succes}
                  max={max_bar}
                  color="#22C55E"
                />
                <VolumeBar
                  label="Transactions échouées"
                  value={stats.transactions.echec}
                  max={max_bar}
                  color="#EF4444"
                />
                <VolumeBar
                  label="Aujourd'hui"
                  value={stats.transactions.aujourd_hui}
                  max={max_bar}
                  color="#F5A623"
                />
                <div className="pt-3 border-t border-white/[0.07]">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-[#5C6080] font-display">
                      Volume total ce mois
                    </span>
                    <span className="text-sm font-mono font-semibold text-[#F5A623]">
                      {formatAmount(stats.transactions.volume_mois_xof)}
                    </span>
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          {/* Recap utilisateurs */}
          <div className="bg-[#13151C] border border-white/[0.07] rounded-xl p-5">
            <h2 className="text-sm font-bold font-display text-white mb-5">
              Utilisateurs
            </h2>
            {loadingStats ? (
              <div className="space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-10 bg-white/[0.04] rounded animate-pulse" />
                ))}
              </div>
            ) : stats ? (
              <div className="space-y-3">
                {[
                  {
                    label: "Total inscrits",
                    value: stats.utilisateurs.total.toLocaleString("fr-FR"),
                    color: "text-white",
                    bg: "bg-[#1A1D27]",
                  },
                  {
                    label: "Nouveaux ce mois",
                    value: `+${stats.utilisateurs.nouveaux_ce_mois}`,
                    color: "text-green-400",
                    bg: "bg-green-500/5",
                  },
                  {
                    label: "KYC en attente",
                    value: stats.utilisateurs.kyc_en_attente.toString(),
                    color: "text-amber-400",
                    bg: "bg-amber-500/5",
                  },
                  {
                    label: "Comptes bloqués",
                    value: stats.utilisateurs.bloques.toString(),
                    color: "text-red-400",
                    bg: "bg-red-500/5",
                  },
                ].map((row) => (
                  <div
                    key={row.label}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-lg ${row.bg}`}
                  >
                    <span className="text-xs text-[#9A9DB8] font-display">
                      {row.label}
                    </span>
                    <span
                      className={`text-sm font-bold font-mono ${row.color}`}
                    >
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        {/* ── Transactions récentes ── */}
        <div className="bg-[#13151C] border border-white/[0.07] rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-white/[0.07] flex items-center justify-between">
            <h2 className="text-sm font-bold font-display text-white">
              Transactions récentes
            </h2>
            <a
              href="/transactions"
              className="text-xs font-semibold font-display text-[#F5A623] hover:text-[#FFD166] transition-colors"
            >
              Voir tout →
            </a>
          </div>

          {loadingTx ? (
            <div className="p-4 space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-12 bg-white/[0.04] rounded-lg animate-pulse" />
              ))}
            </div>
          ) : transactions.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-[#5C6080] text-sm font-display">
                Aucune transaction récente
              </p>
              <p className="text-[#3C3F55] text-xs mt-1">
                L&apos;endpoint{" "}
                <code className="font-mono text-[#F5A623]">
                  GET /api/v1/admin/transactions/
                </code>{" "}
                n&apos;est pas encore implémenté côté Django.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/[0.07] bg-[#1A1D27]">
                    {[
                      "Référence",
                      "Type",
                      "Montant",
                      "Frais",
                      "Statut",
                      "Date",
                    ].map((h) => (
                      <th
                        key={h}
                        className="px-4 py-3 text-left text-[10px] font-semibold font-display uppercase tracking-widest text-[#5C6080] whitespace-nowrap"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((tx) => {
                    const status =
                      TX_STATUS_CONFIG[tx.statut] ?? TX_STATUS_CONFIG["INITIE"];
                    return (
                      <tr
                        key={tx.id}
                        className="border-b border-white/[0.04] last:border-0 hover:bg-[#1A1D27] transition-colors"
                      >
                        <td className="px-4 py-3.5">
                          <span className="font-mono text-xs text-[#9A9DB8]">
                            {tx.reference?.slice(0, 16) ?? tx.id.slice(0, 8)}…
                          </span>
                        </td>
                        <td className="px-4 py-3.5 whitespace-nowrap">
                          <span className="text-xs text-[#F0F0F5] font-display">
                            {TX_TYPE_LABELS[tx.type] ?? tx.type}
                          </span>
                        </td>
                        <td className="px-4 py-3.5 whitespace-nowrap">
                          <span className="font-mono text-sm text-white font-medium">
                            {formatAmount(tx.montant)}
                          </span>
                        </td>
                        <td className="px-4 py-3.5">
                          <span className="font-mono text-xs text-[#5C6080]">
                            {formatAmount(tx.frais)}
                          </span>
                        </td>
                        <td className="px-4 py-3.5">
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold font-display uppercase tracking-wider border ${status.cls}`}
                          >
                            <span className="w-1 h-1 rounded-full bg-current" />
                            {status.label}
                          </span>
                        </td>
                        <td className="px-4 py-3.5 whitespace-nowrap">
                          <span className="text-xs text-[#5C6080]">
                            {formatDate(tx.created_at)}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* ── Footer info ── */}
        {stats?.genere_le && (
          <p className="text-center text-[10px] text-[#3C3F55] font-display pb-2">
            Données générées le{" "}
            {new Date(stats.genere_le).toLocaleString("fr-FR")}
          </p>
        )}
      </main>
    </div>
  );
}