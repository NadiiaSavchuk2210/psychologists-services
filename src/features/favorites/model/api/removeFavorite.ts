import { db } from '@shared/lib/config/firebase/firestore';
import { doc, deleteDoc } from 'firebase/firestore';

export const removeFavorite = async (userId: string, itemId: string) => {
  await deleteDoc(doc(db, 'users', userId, 'favorites', itemId));
};
