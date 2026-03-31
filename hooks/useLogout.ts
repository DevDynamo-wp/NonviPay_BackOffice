'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { authService } from '@/services/auth.service';
import { tokenStorage } from '@/services/api';

export function useLogout() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      await authService.logout();
    } catch {
      // Même en cas d'erreur réseau, on nettoie localement
    } finally {
      tokenStorage.clearTokens();
      // Supprimer le cookie du proxy Next.js
      document.cookie =
        'nonvipay_access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      setIsLoading(false);
      router.push('/login');
    }
  }, [router]);

  return { logout, isLoading };
}