import type { Psychologist } from '@entities/psychologist';
import { normalizePsychologist } from '@entities/psychologist/utils/normalizePsychologist';

export const fetchFavorites = async (
  userId: string
): Promise<Psychologist[]> => {
  const [{ collection, getDocs, getFirestore }, { app }] = await Promise.all([
    import('firebase/firestore'),
    import('@shared/lib/config/firebase/config'),
  ]);
  const db = getFirestore(app);
  const favCol = collection(db, 'users', userId, 'favorites');
  const snapshot = await getDocs(favCol);

  return snapshot.docs
    .map(doc => normalizePsychologist(doc.data(), doc.id))
    .filter((item): item is Psychologist => item !== null);
};
