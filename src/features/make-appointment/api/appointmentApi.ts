import type { Appointment } from '../model/types/appointment';

export const createAppointment = async (
  userId: string,
  appointmentData: Appointment
) => {
  if (!userId) throw new Error('User ID is required');

  const [{ addDoc, collection, getFirestore, serverTimestamp }, { app }] =
    await Promise.all([
      import('firebase/firestore'),
      import('@shared/lib/config/firebase/config'),
    ]);
  const db = getFirestore(app);
  const appointmentsRef = collection(db, 'users', userId, 'appointments');

  return await addDoc(appointmentsRef, {
    ...appointmentData,
    userId,
    createdAt: serverTimestamp(),
  });
};
