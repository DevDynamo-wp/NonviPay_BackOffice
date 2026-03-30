interface Column<T> {
  key:      string;
  label:    string;
  render?:  (row: T) => React.ReactNode;
  width?:   string;
}

interface DataTableProps<T> {
  columns:    Column<T>[];
  data:       T[];
  isLoading?: boolean;
  emptyText?: string;
  onRowClick?: (row: T) => void;
}

export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  isLoading,
  emptyText = 'Aucune donnée',
  onRowClick,
}: DataTableProps<T>) {
  return (
    <div className="rounded-xl border border-white/[0.07] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          {/* Head */}
          <thead>
            <tr className="border-b border-white/[0.07] bg-[#1A1D27]">
              {columns.map((col) => (
                <th
                  key={col.key}
                  style={{ width: col.width }}
                  className="px-4 py-3 text-left text-[10px] font-semibold font-display uppercase tracking-widest text-[#5C6080] whitespace-nowrap"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="border-b border-white/[0.04]">
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-3.5">
                      <div className="h-4 bg-white/[0.05] rounded animate-pulse" style={{ width: '60%' }} />
                    </td>
                  ))}
                </tr>
              ))
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-12 text-center text-[#5C6080] text-sm">
                  {emptyText}
                </td>
              </tr>
            ) : (
              data.map((row, i) => (
                <tr
                  key={i}
                  onClick={() => onRowClick?.(row)}
                  className={`
                    border-b border-white/[0.04] last:border-0 bg-[#13151C]
                    ${onRowClick ? 'hover:bg-[#1A1D27] cursor-pointer' : ''}
                    transition-colors
                  `}
                >
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-3.5 text-[#9A9DB8] whitespace-nowrap">
                      {col.render ? col.render(row) : String(row[col.key] ?? '—')}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
