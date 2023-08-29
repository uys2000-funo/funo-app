import { FirebaseAuthentication } from "@capacitor-firebase/authentication";

export const signInWithEmailAndPassword = function (
  email: string,
  password: string
) {
  return FirebaseAuthentication.signInWithEmailAndPassword({ email, password });
};
export const signInWithApple = async function () {
  const signInResult = await FirebaseAuthentication.signInWithApple();
  console.log(signInResult);
  return signInResult;
};

export const signInWithGoogle = async function () {
  const signInResult = await FirebaseAuthentication.signInWithGoogle();
  console.log(signInResult);
  return signInResult;
};
