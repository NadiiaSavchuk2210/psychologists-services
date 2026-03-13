import { useAuthTranslation, useFirebaseError } from '@shared/hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { LoginFormData, RegisterFormData } from '../types/types';
import { loginUser, logoutUser, registerUser } from '../api/authApi';
import toast from 'react-hot-toast';
import { useAuthStore } from '@shared/lib/store/authStore';
import { TIME } from '@shared/constants/time';

export const useRegisterMutation = () => {
  const { t: tA } = useAuthTranslation();
  const { getErrorMessage } = useFirebaseError();
  const { setUser } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ name, email, password }: RegisterFormData) =>
      registerUser(email, password, name),
    onSuccess: data => {
      setUser(data.user);
      toast.success(tA('toastRegisterSuccess'), {
        icon: '✅',
        duration: TIME.SECOND * 4,
      });
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: (error: unknown) => {
      const message = getErrorMessage(error);
      toast.error(message);
    },
  });
};

export const useLoginMutation = () => {
  const { t: tA } = useAuthTranslation();
  const { getErrorMessage } = useFirebaseError();
  const { setUser } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ email, password }: LoginFormData) =>
      loginUser(email, password),
    onSuccess: data => {
      console.log('Login success, setting user:', data.user);

      setUser(data.user);
      toast.success(tA('toastLoginSuccess'), {
        icon: '🔓',
        duration: TIME.SECOND * 4,
      });
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: (error: unknown) => {
      const message = getErrorMessage(error);
      toast.error(message);
    },
  });
};

export const useLogoutMutation = () => {
  const { t: tA } = useAuthTranslation();
  const { getErrorMessage } = useFirebaseError();
  const { clearAuth } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      clearAuth();
      toast.success(tA('toastLogoutSuccess'), {
        icon: '👋',
        duration: TIME.SECOND * 4,
      });
      queryClient.clear();
    },
    onError: (error: unknown) => {
      const message = getErrorMessage(error);
      toast.error(message);
    },
  });
};
