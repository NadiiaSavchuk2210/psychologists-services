import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { LoginFormData, RegisterFormData } from '@features/auth/types/types';
import type { AppointmentFormData } from '@features/make-appointment/model/types/appointment';

type FormDraftStore = {
  login: LoginFormData;
  register: RegisterFormData;
  appointment: AppointmentFormData;
  setLogin: (value: LoginFormData) => void;
  resetLogin: () => void;
  setRegister: (value: RegisterFormData) => void;
  resetRegister: () => void;
  setAppointment: (value: AppointmentFormData) => void;
  resetAppointment: () => void;
};

export const LOGIN_DEFAULT_VALUES: LoginFormData = {
  email: '',
  password: '',
};

export const REGISTER_DEFAULT_VALUES: RegisterFormData = {
  name: '',
  email: '',
  password: '',
};

export const APPOINTMENT_DEFAULT_VALUES: AppointmentFormData = {
  name: '',
  phoneNumber: '',
  meetingTime: '',
  email: '',
  comment: '',
};

export const useFormDraftStore = create<FormDraftStore>()(
  persist(
    set => ({
      login: LOGIN_DEFAULT_VALUES,
      register: REGISTER_DEFAULT_VALUES,
      appointment: APPOINTMENT_DEFAULT_VALUES,

      setLogin: value => set({ login: value }),
      resetLogin: () => set({ login: LOGIN_DEFAULT_VALUES }),

      setRegister: value => set({ register: value }),
      resetRegister: () => set({ register: REGISTER_DEFAULT_VALUES }),

      setAppointment: value => set({ appointment: value }),
      resetAppointment: () => set({ appointment: APPOINTMENT_DEFAULT_VALUES }),
    }),
    {
      name: 'form-drafts',
      partialize: state => ({
        login: state.login,
        register: state.register,
        appointment: state.appointment,
      }),
    }
  )
);
