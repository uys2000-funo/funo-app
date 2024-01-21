import { Preferences } from "@capacitor/preferences";

// set this to user id to store thing seperately for any user
export const configurePrefences = function (group: string) {
  return Preferences.configure({ group });
};

export const getPrefence = function (key: string) {
  return Preferences.get({ key }).then(({ value }) => value);
};

export const setPrefance = function (key: string, value: string) {
  return Preferences.set({ key, value }).then(() => value);
};

export const removePrefence = function (key: string) {
  return Preferences.remove({ key });
};
export const getKeysPrefence = function () {
  return Preferences.keys();
};

export const clearPrefence = function () {
  return Preferences.clear();
};
