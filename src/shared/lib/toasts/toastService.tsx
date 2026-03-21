import toast from 'react-hot-toast';
import { TIME } from '@shared/constants/time';

export type ToastType = 'success' | 'error' | 'info';

export interface ToastOptions {
  duration?: number;
  icon?: string;
}

const debounceMap = new Map<string, ReturnType<typeof setTimeout>>();

export const toastService = {
  show: (
    key: string,
    message: string,
    type: ToastType = 'success',
    options?: ToastOptions,
    debounceTime = TIME.MILLISECOND * 3
  ) => {
    if (debounceMap.has(key)) clearTimeout(debounceMap.get(key));

    debounceMap.set(
      key,
      setTimeout(() => {
        const config = {
          duration: options?.duration ?? TIME.SECOND * 4,
          icon: options?.icon,
        };

        switch (type) {
          case 'success':
            toast.success(message, config);
            break;
          case 'error':
            toast.error(message, config);
            break;
          case 'info':
            toast(message, config);
            break;
        }

        debounceMap.delete(key);
      }, debounceTime)
    );
  },

  loginSuccess: (t: (key: string) => string) =>
    toastService.show('loginSuccess', t('toastLoginSuccess'), 'success', {
      icon: '🔓',
    }),

  registerSuccess: (t: (key: string) => string) =>
    toastService.show('registerSuccess', t('toastRegisterSuccess'), 'success', {
      icon: '✅',
    }),

  logoutSuccess: (t: (key: string) => string) =>
    toastService.show('logoutSuccess', t('toastLogoutSuccess'), 'success', {
      icon: '👋',
    }),

  favoriteAdded: (t: (key: string) => string) =>
    toastService.show('favoriteAdded', t('toastFavoriteAdded'), 'success', {
      icon: '❤️',
    }),

  favoriteRemoved: (t: (key: string) => string) =>
    toastService.show('favoriteRemoved', t('toastFavoriteRemoved'), 'success', {
      icon: '🖤',
    }),

  favoriteError: (t: (key: string) => string) =>
    toastService.show('favoriteError', t('toastFavoriteError'), 'error', {
      icon: '💔',
    }),

  authRequired: (openLogin: () => void, t: (key: string) => string) => {
    toast.custom(tost => (
      <div
        style={{
          background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
          color: 'white',
          padding: '16px',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
        }}
      >
        <span>{t('toastAuthRequired')}</span>
        <button
          onClick={() => {
            openLogin();
            toast.dismiss(tost.id);
          }}
          style={{
            background: 'rgba(255,255,255,0.2)',
            border: 'none',
            borderRadius: '8px',
            padding: '6px 12px',
            color: 'white',
            cursor: 'pointer',
            fontWeight: 600,
          }}
        >
          {t('toastAuthAction')}
        </button>
      </div>
    ));
  },

  error: (message: string) => toastService.show('error', message, 'error'),
};
