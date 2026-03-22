import type { PsychologistUI } from '@entities/psychologist';
import { create } from 'zustand';

type ModalState = {
  isLoginOpen: boolean;
  openLogin: () => void;
  closeLogin: () => void;
  isRegisterOpen: boolean;
  openRegister: () => void;
  closeRegister: () => void;

  isAppointmentOpen: boolean;
  appointmentPsychologist: PsychologistUI | null;
  openAppointment: (psychologist: PsychologistUI) => void;
  closeAppointment: () => void;
};

export const useModalStore = create<ModalState>()(set => ({
  isLoginOpen: false,
  openLogin: () => set({ isLoginOpen: true }),
  closeLogin: () => set({ isLoginOpen: false }),

  isRegisterOpen: false,
  openRegister: () => set({ isRegisterOpen: true }),
  closeRegister: () => set({ isRegisterOpen: false }),

  isAppointmentOpen: false,
  appointmentPsychologist: null,
  openAppointment: (psychologist: PsychologistUI) =>
    set({ isAppointmentOpen: true, appointmentPsychologist: psychologist }),
  closeAppointment: () =>
    set({ isAppointmentOpen: false, appointmentPsychologist: null }),
}));
