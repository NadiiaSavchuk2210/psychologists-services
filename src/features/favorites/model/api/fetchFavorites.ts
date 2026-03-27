import { collection, getDocs } from 'firebase/firestore';

import type { Psychologist } from '@entities/psychologist';
import { db } from '@shared/lib/config/firebase/firestore';

export const fetchFavorites = async (
  userId: string
): Promise<Psychologist[]> => {
  const favCol = collection(db, 'users', userId, 'favorites');
  const snapshot = await getDocs(favCol);

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...(doc.data() as Omit<Psychologist, 'id'>),
  }));
};
