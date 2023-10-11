import { app } from "@/services/firebase";
import {
  getFirestore,
  doc,
  getDoc,
  deleteDoc,
  DocumentSnapshot,
  setDoc,
} from "firebase/firestore";

export const db = getFirestore(app);

export const getDocument = function (collection: string, document: string) {
  const docRef = doc(db, collection, document);
  return getDoc(docRef);
};

// for database test update
// eslint-disable-next-line
const fd = function (data: object, result = {} as Record<string, any>) {
  for (const key in data) {
    const target = data[key as keyof typeof data];
    if (typeof target === typeof {}) {
      result[key] = Object.assign({}, target);
      fd(data[key as keyof typeof data], result[key]);
    }
  }
  return result;
};

export const setDocument = function (
  collection: string,
  document: string,
  data: object
) {
  const docRef = doc(db, collection, document);
  // use this on data before use in tihs function Object.assign({}, data)
  return setDoc(docRef, fd(data));
};
export const deleteDocument = function (collection: string, document: string) {
  const docRef = doc(db, collection, document);
  return deleteDoc(docRef);
};

export { DocumentSnapshot };
