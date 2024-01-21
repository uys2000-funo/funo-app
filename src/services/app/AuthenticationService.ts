import { sendPasswordResetEmailAuthentication } from "../firebase/authentication";

export const sendPasswordResetEmail = function (email: string) {
  return sendPasswordResetEmailAuthentication.pLogger(email);
};
