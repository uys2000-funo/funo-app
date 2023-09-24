import { UserData } from "@/types/user";
import { getDocument } from "../firebase/firestore";
import {
  configurePrefences,
  getKeysPrefence,
  getPrefence,
  setPrefance,
} from "../capacitor/preferences";

// #region Local Store
export const setLocalUserData = async function (
  uID: string,
  userData: UserData
) {
  await configurePrefences.pLogger("CapacitorStorage");
  await setPrefance.pLogger("uID", uID);
  await configurePrefences.pLogger(uID);
  return setPrefance.pLogger("UserData", JSON.stringify(userData));
};

export const getLocalUserData = async function () {
  const { keys } = await getKeysPrefence.pLogger();
  if (keys.includes("uID")) {
    const uID = await getPrefence.pLogger("uID");
    if (uID) await configurePrefences.pLogger(uID);
  }
  const userDataString = await getPrefence.pLogger("UserData");
  if (!userDataString) return undefined;
  const userData = JSON.parse(userDataString) as UserData;
  return userData;
};
// #endregion

// #region Remote Store
export const getUserData = function (uID: string) {
  return getDocument.pLogger("_Users", uID).then((documentSnapshot) => {
    if (documentSnapshot.exists()) {
      const userData = documentSnapshot.data() as UserData;
      setTimeout(() => setLocalUserData(uID, userData));
      return userData;
    } else return undefined;
  });
};
// #endregion
