'use client';

import { useRef } from 'react';

interface SearchInputProps {
  value:       string;
  onChange:    (v: string) => void;
  placeholder?: string;
  className?:  string;
}

export function SearchInput({ value, onChange, placeholder = 'Rechercher…', className = '' }: SearchInputProps) {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <div className={`relative ${className}`}>
      <svg
        className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#5C6080] pointer-events-none"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input
        ref={ref}
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-9 pr-3 py-2 text-sm bg-[#191C28] border border-white/[0.07] rounded-lg text-white placeholder-[#5C6080] focus:outline-none focus:border-[#F5A623]/50 focus:ring-1 focus:ring-[#F5A623]/20 transition-colors"
      />
      {value && (
        <button
          onClick={() => { onChange(''); ref.current?.focus(); }}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#5C6080] hover:text-[#9A9DB8]"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}
