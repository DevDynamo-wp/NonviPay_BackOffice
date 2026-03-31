'use client';

import { ThemeToggle } from '@/theme';

interface HeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export function Header({ title, subtitle, actions }: HeaderProps) {
  return (
    <header
      className="h-[60px] flex items-center justify-between px-6 shrink-0"
      style={{
        borderBottom: '1px solid var(--border-default)',
        backgroundColor: 'var(--bg-surface)',
      }}
    >
      <div>
        <h1
          className="text-base font-bold font-display leading-none"
          style={{ color: 'var(--text-primary)' }}
        >
          {title}
        </h1>
        {subtitle && (
          <p className="text-xs mt-0.5" style={{ color: 'var(--text-tertiary)' }}>
            {subtitle}
          </p>
        )}
      </div>

      <div className="flex items-center gap-2">
        {actions}
        {/* Toggle thème clair / sombre */}
        <ThemeToggle />
      </div>
    </header>
  );
}