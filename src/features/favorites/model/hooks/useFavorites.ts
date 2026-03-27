import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRef } from 'react';

import type { Psychologist } from '@entities/psychologist';
import { TIME } from '@shared/constants/time';
import { useAppointmentTranslation, useAuthTranslation } from '@shared/hooks';
import { useAuthStore } from '@shared/lib/store/authStore';
import { useModalStore } from '@shared/lib/store/modalStore';
import { toastService } from '@shared/lib/toasts/toastService';

import { addFavorite } from '../api/addFavorite';
import { fetchFavorites } from '../api/fetchFavorites';
import { removeFavorite } from '../api/removeFavorite';


export const useFavorites = (debounceTime = TIME.MILLISECOND * 3) => {
  const { user } = useAuthStore();
  const { t } = useAuthTranslation();
  const { t: tApp } = useAppointmentTranslation();
  const queryClient = useQueryClient();
  const { openLogin } = useModalStore();

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const queryKey = ['favorites', user?.uid];

  const {
    data: favorites = [],
    isLoading,
    error,
  } = useQuery<Psychologist[]>({
    queryKey,
    queryFn: () => fetchFavorites(user!.uid),
    enabled: !!user,
  });

  const toggleFavorite = (item: Psychologist) => {
    if (!user) {
      toastService.authRequired(openLogin, t, tApp, true);
      return;
    }

    const current = queryClient.getQueryData<Psychologist[]>(queryKey) || [];

    const isFavorite = current.some(f => f.id === item.id);
    const previous = current;

    queryClient.setQueryData<Psychologist[]>(queryKey, old => {
      if (!old) return [item];

      return isFavorite ? old.filter(f => f.id !== item.id) : [...old, item];
    });

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(async () => {
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
        queryClient.invalidateQueries({ queryKey, exact: true });
      }
    }, debounceTime);
  };

  return {
    favorites,
    isLoading,
    error,
    toggleFavorite,
  };
};
