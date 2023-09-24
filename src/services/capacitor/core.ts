import { Capacitor } from "@capacitor/core";

export const isNativePlatform = function () {
  return Capacitor.isNativePlatform();
};
