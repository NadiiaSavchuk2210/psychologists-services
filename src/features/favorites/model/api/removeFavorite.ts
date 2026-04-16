export const removeFavorite = async (userId: string, itemId: string) => {
  const [{ deleteDoc, doc, getFirestore }, { app }] = await Promise.all([
    import('firebase/firestore'),
    import('@shared/lib/config/firebase/config'),
  ]);
  const db = getFirestore(app);

  await deleteDoc(doc(db, 'users', userId, 'favorites', String(itemId)));
};
