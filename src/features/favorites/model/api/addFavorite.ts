import type { Psychologist } from '@entities/psychologist';

export const addFavorite = async (userId: string, item: Psychologist) => {
  const [{ doc, getFirestore, setDoc }, { app }] = await Promise.all([
    import('firebase/firestore'),
    import('@shared/lib/config/firebase/config'),
  ]);
  const db = getFirestore(app);
  const itemId = String(item.id);

  await setDoc(doc(db, 'users', userId, 'favorites', itemId), {
    ...item,
    id: itemId,
  });
};
