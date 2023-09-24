import { app } from "@/services/firebase";
import { getFirestore, doc, getDoc } from "firebase/firestore";

export const db = getFirestore(app);

export const getDocument = function (collection: string, documnet: string) {
  const docRef = doc(db, collection, documnet);
  return getDoc(docRef);
};
