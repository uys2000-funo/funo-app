import { FunoUser } from "@/types/user";
import { getDocument } from "../firebase/firestore";
import {
  configurePrefences,
  getKeysPrefence,
  getPrefence,
  setPrefance,
} from "../capacitor/preferences";

/**
 * Returns user data from last user session.
 * @constructor
 * @param {string} uID uID of the user
 * @param {FunoUser} funoUser funoUser data of the user
 * @returns {FunoUser} funoUser or undefined.
 */
export const setLocalUserData = async function (
  uID: string,
  funoUser: FunoUser
) {
  await configurePrefences.pLogger("CapacitorStorage");
  await setPrefance.pLogger("uID", uID);
  await configurePrefences.pLogger(uID);
  return setPrefance.pLogger("UserData", JSON.stringify(funoUser));
};

/**
 * Returns user data from last user session.
 * @constructor
 * @returns {(FunoUser)} FunoUser or undefined.
 */
export const getLocalUserData = async function () {
  const { keys } = await getKeysPrefence.pLogger();
  if (keys.includes("uID")) {
    const uID = await getPrefence.pLogger("uID");
    if (uID) await configurePrefences.pLogger(uID);
  }
  const userDataString = await getPrefence.pLogger("UserData");
  if (!userDataString) return undefined;
  const userData = JSON.parse(userDataString) as FunoUser;
  return userData;
};

/**
 * Requests the user data from the firebase server
 * @constructor
 * @param {string} uID uID of the user
 * @return {FunoUser} funoUser | undefined
 */
export const getUserData = function (uID: string) {
  return getDocument.pLogger("-Users", uID).then((documentSnapshot) => {
    if (documentSnapshot.exists()) {
      const userData = documentSnapshot.data() as FunoUser;
      setTimeout(() => setLocalUserData.pLogger(uID, userData));
      return userData;
    } else return undefined;
  });
};
// #endregion
