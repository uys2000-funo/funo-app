import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithCredential,
  GoogleAuthProvider,
  OAuthProvider,
} from "firebase/auth";

import { app } from "@/services/firebase";

export const auth = getAuth(app);

export const signInFirebaseWithEmailAndPassword = function (
  email: string,
  password: string
) {
  return signInWithEmailAndPassword(auth, email, password);
};

export const signInWithGoogleCredential = function (idToken: string) {
  const credential = GoogleAuthProvider.credential(idToken);
  return signInWithCredential(auth, credential);
};

export const signInWithAppleCredential = function (
  idToken: string,
  rawNonce: string
) {
  const provider = new OAuthProvider("apple.com");
  const credential = provider.credential({ idToken, rawNonce });
  return signInWithCredential(auth, credential);
};
