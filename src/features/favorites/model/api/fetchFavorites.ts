import { collection, getDocs } from 'firebase/firestore';

import type { Psychologist } from '@entities/psychologist';
import { normalizePsychologist } from '@entities/psychologist/utils/normalizePsychologist';
import { db } from '@shared/lib/config/firebase/firestore';

export const fetchFavorites = async (
  userId: string
): Promise<Psychologist[]> => {
  const favCol = collection(db, 'users', userId, 'favorites');
  const snapshot = await getDocs(favCol);

  return snapshot.docs
    .map(doc => normalizePsychologist(doc.data(), doc.id))
    .filter((item): item is Psychologist => item !== null);
};
