"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/auth.service";
import { tokenStorage } from "@/services/api";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError]       = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await authService.login({ email, password });

      if (res.data?.success && res.data?.access) {
        // Stocker le token dans un cookie pour le proxy Next.js
        document.cookie = `nonvipay_access_token=${res.data.access}; path=/; SameSite=Strict`;

        // Stocker dans localStorage pour les appels API client-side
        tokenStorage.setTokens({
          access:  res.data.access,
          refresh: res.data.refresh,
        });

        router.push("/dashboard");
        return;
      }

      // Gérer les erreurs retournées par Django
      setError(
        res.error?.message ??
        (res.data && !res.data.success ? "Identifiants incorrects." : "Erreur inconnue.")
      );

    } catch {
      setError(
        "Impossible de contacter le serveur. Vérifiez que le backend Django tourne sur le port 8000."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0D0E12] flex items-center justify-center px-4">
      {/* Fond ambiant */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#F5A623]/5 blur-[120px]" />
      </div>

      <div className="relative w-full max-w-[400px]">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-xl bg-[#F5A623] flex items-center justify-center">
              <span className="text-[#0D0E12] font-bold text-sm font-display">N</span>
            </div>
            <span className="text-xl font-bold font-display tracking-tight text-white">
              NonviPay
            </span>
          </div>
          <p className="text-[#9A9DB8] text-sm">Back-office Administration</p>
        </div>

        {/* Card */}
        <div className="bg-[#13151C] border border-white/[0.07] rounded-2xl p-8">
          <h1 className="text-xl font-bold font-display text-white mb-1">Connexion</h1>
          <p className="text-[#9A9DB8] text-sm mb-6">Accès réservé aux administrateurs</p>

          {error && (
            <div className="mb-5 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/25 text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold font-display text-[#9A9DB8] uppercase tracking-wider mb-1.5">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                placeholder="admin@nonvipay.com"
                className="w-full px-4 py-2.5 bg-[#191C28] border border-white/[0.07] rounded-lg text-white placeholder-[#5C6080] text-sm focus:outline-none focus:border-[#F5A623]/50 focus:ring-1 focus:ring-[#F5A623]/30 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold font-display text-[#9A9DB8] uppercase tracking-wider mb-1.5">
                Mot de passe
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                placeholder="••••••••"
                className="w-full px-4 py-2.5 bg-[#191C28] border border-white/[0.07] rounded-lg text-white placeholder-[#5C6080] text-sm focus:outline-none focus:border-[#F5A623]/50 focus:ring-1 focus:ring-[#F5A623]/30 transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 bg-[#F5A623] hover:bg-[#E8931A] disabled:opacity-50 disabled:cursor-not-allowed text-[#0D0E12] font-bold font-display text-sm rounded-lg transition-colors mt-2"
            >
              {isLoading ? "Connexion en cours…" : "Se connecter"}
            </button>
          </form>
        </div>

        <p className="text-center text-[#5C6080] text-xs mt-6">
          NonviPay © {new Date().getFullYear()} — Accès sécurisé
        </p>
      </div>
    </div>
  );
}