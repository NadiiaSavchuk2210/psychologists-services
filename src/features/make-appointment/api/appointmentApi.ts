import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import type { Appointment } from '../model/types/appointment';
import { db } from '@shared/lib/config/firebase';

export const createAppointment = async (
  userId: string,
  appointmentData: Appointment
) => {
  if (!userId) throw new Error('User ID is required');

  const appointmentsRef = collection(db, 'users', userId, 'appointments');

  return await addDoc(appointmentsRef, {
    ...appointmentData,
    userId,
    createdAt: serverTimestamp(),
  });
};
