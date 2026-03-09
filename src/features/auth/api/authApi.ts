import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth } from '../../../shared/lib/config/firebase/auth';

export const registerUser = (email: string, password: string) =>
  createUserWithEmailAndPassword(auth, email, password);

export const loginUser = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password);

export const logoutUser = () => signOut(auth);
