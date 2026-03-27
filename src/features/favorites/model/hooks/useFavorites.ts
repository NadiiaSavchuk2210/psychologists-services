import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRef, useState } from 'react';

import type { Psychologist } from '@entities/psychologist';
import { useAppointmentTranslation, useAuthTranslation } from '@shared/hooks';
import { useAuthStore } from '@shared/lib/store/authStore';
import { useModalStore } from '@shared/lib/store/modalStore';
import { toastService } from '@shared/lib/toasts/toastService';

import { addFavorite } from '../api/addFavorite';
import { fetchFavorites } from '../api/fetchFavorites';
import { removeFavorite } from '../api/removeFavorite';

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
    queryFn: () => fetchFavorites(user!.uid),
    enabled: !!user,
  });

  const toggleFavorite = async (item: Psychologist) => {
    if (!user) {
      toastService.authRequired(openLogin, t, tApp, true);
      return;
    }

    if (pendingIdsRef.current.has(item.id)) {
      return;
    }

    await queryClient.cancelQueries({ queryKey, exact: true });

    const current = queryClient.getQueryData<Psychologist[]>(queryKey) || [];
    const isFavorite = current.some(f => f.id === item.id);
    const previous = current;

    pendingIdsRef.current.add(item.id);
    setPendingIds(prev => [...prev, item.id]);

    queryClient.setQueryData<Psychologist[]>(queryKey, old => {
      if (!old) return [item];

      return isFavorite ? old.filter(f => f.id !== item.id) : [...old, item];
    });

    try {
      if (isFavorite) {
        await removeFavorite(user.uid, item.id);
        toastService.favoriteRemoved(t);
      } else {
        await addFavorite(user.uid, item);
        toastService.favoriteAdded(t);
      }
    } catch {
      queryClient.setQueryData(queryKey, previous);
      toastService.favoriteError(t);
    } finally {
      pendingIdsRef.current.delete(item.id);
      setPendingIds(prev => prev.filter(id => id !== item.id));
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
