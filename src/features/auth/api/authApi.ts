import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  type UserCredential,
} from 'firebase/auth';
import { auth } from '../../../shared/lib/config/firebase/auth';

export const registerUser = async (
  email: string,
  password: string,
  name: string
): Promise<UserCredential> => {
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
): Promise<UserCredential> => signInWithEmailAndPassword(auth, email, password);

export const logoutUser = () => signOut(auth);
