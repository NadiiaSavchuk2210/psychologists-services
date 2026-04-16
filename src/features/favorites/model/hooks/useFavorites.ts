import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRef, useState } from 'react';

import type { Psychologist } from '@entities/psychologist';
import { useAppointmentTranslation, useAuthTranslation } from '@shared/hooks';
import { useAuthStore } from '@shared/lib/store/authStore';
import { useModalStore } from '@shared/lib/store/modalStore';
import { toastService } from '@shared/lib/toasts/toastService';

export const useFavorites = () => {
  const { user } = useAuthStore();
  const { t } = useAuthTranslation();
  const { t: tApp } = useAppointmentTranslation();
  const queryClient = useQueryClient();
  const { openLogin } = useModalStore();
  const [pendingIds, setPendingIds] = useState<string[]>([]);
  const pendingIdsRef = useRef<Set<string>>(new Set());

  const queryKey = ['favorites', user?.uid] as const;

  const {
    data: favorites = [],
    isLoading,
    error,
  } = useQuery<Psychologist[]>({
    queryKey,
    queryFn: async () => {
      const { fetchFavorites } = await import('../api/fetchFavorites');

      return fetchFavorites(user!.uid);
    },
    enabled: !!user,
  });

  const toggleFavorite = async (item: Psychologist) => {
    const itemId = String(item.id);
    const normalizedItem = {
      ...item,
      id: itemId,
    };

    if (!user) {
      toastService.authRequired(openLogin, t, tApp);
      return;
    }

    if (pendingIdsRef.current.has(itemId)) {
      return;
    }

    await queryClient.cancelQueries({ queryKey, exact: true });

    const current = queryClient.getQueryData<Psychologist[]>(queryKey) || [];
    const isFavorite = current.some(f => String(f.id) === itemId);
    const previous = current;

    pendingIdsRef.current.add(itemId);
    setPendingIds(prev => [...prev, itemId]);

    queryClient.setQueryData<Psychologist[]>(queryKey, old => {
      if (!old) return [normalizedItem];

      return isFavorite
        ? old.filter(f => String(f.id) !== itemId)
        : [...old, normalizedItem];
    });

    try {
      if (isFavorite) {
        const { removeFavorite } = await import('../api/removeFavorite');

        await removeFavorite(user.uid, itemId);
        toastService.favoriteRemoved(t);
      } else {
        const { addFavorite } = await import('../api/addFavorite');

        await addFavorite(user.uid, normalizedItem);
        toastService.favoriteAdded(t);
      }
    } catch {
      queryClient.setQueryData(queryKey, previous);
      toastService.favoriteError(t);
    } finally {
      pendingIdsRef.current.delete(itemId);
      setPendingIds(prev => prev.filter(id => id !== itemId));
      queryClient.invalidateQueries({ queryKey, exact: true });
    }
  };

  return {
    favorites,
    isLoading,
    error,
    isFavoritePending: (itemId: string) => pendingIds.includes(itemId),
    toggleFavorite,
  };
};
