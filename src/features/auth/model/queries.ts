import { useAuthTranslation, useFirebaseError } from '@shared/hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { LoginFormData, RegisterFormData } from '../types/types';
import { loginUser, logoutUser, registerUser } from '../api/authApi';
import { useAuthStore } from '@shared/lib/store/authStore';
import { toastService } from '@shared/lib/toasts/toastService';

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

      toastService.registerSuccess(tA);
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: (error: unknown) => {
      const message = getErrorMessage(error);
      toastService.error(message);
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
      setUser(data.user);

      toastService.loginSuccess(tA);
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: (error: unknown) => {
      const message = getErrorMessage(error);
      toastService.error(message);
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

      toastService.logoutSuccess(tA);
      queryClient.clear();
    },
    onError: (error: unknown) => {
      const message = getErrorMessage(error);
      toastService.error(message);
    },
  });
};
