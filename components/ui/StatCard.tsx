interface StatCardProps {
  title:      string;
  value:      string | number;
  subtitle?:  string;
  trend?:     { value: number; label: string };
  variant?:   'default' | 'brand' | 'success' | 'warning' | 'error';
  icon?:      React.ReactNode;
}

const ACCENT: Record<string, string> = {
  default: 'text-[#9A9DB8]',
  brand:   'text-[#F5A623]',
  success: 'text-green-400',
  warning: 'text-amber-400',
  error:   'text-red-400',
};

const ICON_BG: Record<string, string> = {
  default: 'bg-white/[0.05]',
  brand:   'bg-[#F5A623]/10',
  success: 'bg-green-500/10',
  warning: 'bg-amber-500/10',
  error:   'bg-red-500/10',
};

export function StatCard({ title, value, subtitle, trend, variant = 'default', icon }: StatCardProps) {
  const isPositive = trend && trend.value >= 0;

  return (
    <div className="bg-[#13151C] border border-white/[0.07] rounded-xl p-5 flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <p className="text-xs font-semibold font-display uppercase tracking-wider text-[#5C6080]">
          {title}
        </p>
        {icon && (
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${ICON_BG[variant]} ${ACCENT[variant]}`}>
            {icon}
          </div>
        )}
      </div>

      <div>
        <p className={`text-2xl font-bold font-display ${ACCENT[variant]}`}>
          {value}
        </p>
        {subtitle && (
          <p className="text-xs text-[#5C6080] mt-0.5">{subtitle}</p>
        )}
      </div>

      {trend && (
        <div className={`flex items-center gap-1 text-xs font-display font-semibold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
          <span>{isPositive ? '↑' : '↓'}</span>
          <span>{Math.abs(trend.value)}%</span>
          <span className="text-[#5C6080] font-normal">{trend.label}</span>
        </div>
      )}
    </div>
  );
}
