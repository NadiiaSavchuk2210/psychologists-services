import type { UserCredential } from 'firebase/auth';

const getFirebaseAuthApi = async () => {
  const [
    {
      createUserWithEmailAndPassword,
      getAuth,
      signInWithEmailAndPassword,
      signOut,
      updateProfile,
    },
    { app },
  ] = await Promise.all([
    import('firebase/auth'),
    import('@shared/lib/config/firebase/config'),
  ]);

  return {
    auth: getAuth(app),
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
  };
};

export const registerUser = async (
  email: string,
  password: string,
  name: string
): Promise<UserCredential> => {
  const { auth, createUserWithEmailAndPassword, updateProfile } =
    await getFirebaseAuthApi();
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  await updateProfile(userCredential.user, { displayName: name });

  return userCredential;
};

export const loginUser = (
  email: string,
  password: string
): Promise<UserCredential> =>
  getFirebaseAuthApi().then(({ auth, signInWithEmailAndPassword }) =>
    signInWithEmailAndPassword(auth, email, password)
  );

export const logoutUser = () =>
  getFirebaseAuthApi().then(({ auth, signOut }) => signOut(auth));
