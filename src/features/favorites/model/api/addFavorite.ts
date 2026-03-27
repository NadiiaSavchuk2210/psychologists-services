import { doc, setDoc } from 'firebase/firestore';

import type { Psychologist } from '@entities/psychologist';
import { db } from '@shared/lib/config/firebase/firestore';

export const addFavorite = async (userId: string, item: Psychologist) => {
  await setDoc(doc(db, 'users', userId, 'favorites', item.id), item);
};
