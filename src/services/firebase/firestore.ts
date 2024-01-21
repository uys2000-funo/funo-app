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

/**
 * Gets Data From Firestore.
 * @constructor
 * @param {string} collection
 * @param {string} document
 * @returns {DocumentSnapshot} DocumentSnapshot
 */
export const getDocument = function (collection: string, document: string) {
  const docRef = doc(db, collection, document);
  return getDoc(docRef);
};

/**
 * Turns object into vanilla JS object. Removes any type declarations from the object. \nThis is needed by Firebase
 * @constructor
 * @param {object} data Any type of object
 * @returns {object} object
 */
const fd = function (data: object, result = {} as object) {
  for (const key in data) {
    const target = data[key as keyof typeof data];
    if (typeof target === typeof {}) {
      result[key as keyof typeof result] = Object.assign({}, target);
      fd(data[key as keyof typeof data], result[key as keyof typeof result]);
    }
  }
  return result;
};

/**
 * Sets document in Firestore
 * @constructor
 * @param {string} collection
 * @param {string} document
 * @param {object} data
 */
export const setDocument = function (
  collection: string,
  document: string,
  data: object
) {
  const docRef = doc(db, collection, document);
  return setDoc(docRef, fd(data));
};

/**
 * Deletes document in Firestore
 * @constructor
 * @param {string} collection
 * @param {string} document
 * @param {object} data
 */
export const deleteDocument = function (collection: string, document: string) {
  const docRef = doc(db, collection, document);
  return deleteDoc(docRef);
};

export { DocumentSnapshot };
