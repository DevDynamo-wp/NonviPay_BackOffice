import type { Metadata } from 'next';
import { Syne, Instrument_Sans } from 'next/font/google';
import './globals.css';

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500', '600'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'NonviPay — Backoffice',
    template: '%s | NonviPay Admin',
  },
  description: 'Tableau de bord administration — Plateforme de paiement NonviPay',
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${syne.variable} ${instrumentSans.variable}`}>
      <body className="min-h-screen bg-[#0D0E12] text-[#F0F0F5] font-body antialiased">
        {children}
      </body>
    </html>
  );
}
