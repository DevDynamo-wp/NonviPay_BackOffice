'use client';

interface HeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export function Header({ title, subtitle, actions }: HeaderProps) {
  return (
    <header className="h-[60px] flex items-center justify-between px-6 border-b border-white/[0.07] bg-[#13151C] shrink-0">
      <div>
        <h1 className="text-base font-bold font-display text-white leading-none">{title}</h1>
        {subtitle && (
          <p className="text-xs text-[#5C6080] mt-0.5">{subtitle}</p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </header>
  );
}
