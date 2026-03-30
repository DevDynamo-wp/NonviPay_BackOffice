interface PaginationProps {
  currentPage:  number;
  totalPages:   number;
  totalCount:   number;
  pageSize:     number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, totalCount, pageSize, onPageChange }: PaginationProps) {
  const from = (currentPage - 1) * pageSize + 1;
  const to   = Math.min(currentPage * pageSize, totalCount);

  return (
    <div className="flex items-center justify-between px-1 py-3">
      <p className="text-xs text-[#5C6080]">
        {from}–{to} sur <span className="text-[#9A9DB8]">{totalCount}</span>
      </p>

      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="w-8 h-8 flex items-center justify-center rounded-lg border border-white/[0.07] text-[#9A9DB8] hover:text-white hover:bg-white/[0.04] disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-sm"
        >
          ←
        </button>

        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
          const page = i + 1;
          const isActive = page === currentPage;
          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-semibold font-display transition-colors ${
                isActive
                  ? 'bg-[#F5A623]/10 text-[#F5A623] border border-[#F5A623]/25'
                  : 'border border-white/[0.07] text-[#9A9DB8] hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              {page}
            </button>
          );
        })}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="w-8 h-8 flex items-center justify-center rounded-lg border border-white/[0.07] text-[#9A9DB8] hover:text-white hover:bg-white/[0.04] disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-sm"
        >
          →
        </button>
      </div>
    </div>
  );
}
