/**
 * NONVIPAY BACKOFFICE — useFetch Hook
 * Hook générique pour les appels API avec état loading/error
 */

'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import type { ApiResponse } from '@/types';

interface FetchState<T> {
  data:      T | null;
  isLoading: boolean;
  error:     string | null;
}

export function useFetch<T>(
  fetcher: () => Promise<ApiResponse<T>>,
  deps: unknown[] = [],
) {
  const [state, setState] = useState<FetchState<T>>({
    data:      null,
    isLoading: true,
    error:     null,
  });

  const fetcherRef = useRef(fetcher);
  fetcherRef.current = fetcher;

  const execute = useCallback(async () => {
    setState((s) => ({ ...s, isLoading: true, error: null }));
    const res = await fetcherRef.current();
    if (res.data !== undefined) {
      setState({ data: res.data, isLoading: false, error: null });
    } else {
      setState((s) => ({
        ...s,
        isLoading: false,
        error: res.error?.message ?? 'Erreur inconnue',
      }));
    }
  }, []);

  useEffect(() => {
    execute();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { ...state, refetch: execute };
}

// ──────────────────────────────────────────────

/**
 * useDebounce — Retarde la mise à jour d'une valeur
 * Utile pour les champs de recherche
 */
export function useDebounce<T>(value: T, delayMs = 300): T {
  const [debounced, setDebounced] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(timer);
  }, [value, delayMs]);

  return debounced;
}

// ──────────────────────────────────────────────

/**
 * usePagination — Gestion de l'état de pagination
 */
export function usePagination(initialPage = 1, initialPageSize = 20) {
  const [page, setPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const goToPage = useCallback((p: number) => setPage(p), []);
  const nextPage  = useCallback(() => setPage((p) => p + 1), []);
  const prevPage  = useCallback(() => setPage((p) => Math.max(1, p - 1)), []);
  const reset     = useCallback(() => setPage(1), []);

  return { page, pageSize, setPage: goToPage, setPageSize, nextPage, prevPage, reset };
}
