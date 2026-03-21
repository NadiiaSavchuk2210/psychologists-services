import { create } from 'zustand';

type ModalState = {
  isLoginOpen: boolean;
  openLogin: () => void;
  closeLogin: () => void;
  isRegisterOpen: boolean;
  openRegister: () => void;
  closeRegister: () => void;
};

export const useModalStore = create<ModalState>()(set => ({
  isLoginOpen: false,
  openLogin: () => set({ isLoginOpen: true }),
  closeLogin: () => set({ isLoginOpen: false }),

  isRegisterOpen: false,
  openRegister: () => set({ isRegisterOpen: true }),
  closeRegister: () => set({ isRegisterOpen: false }),
}));
