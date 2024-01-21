import type { PermissionState } from "@capacitor/core";
import type {
  PermissionStatus,
  GeolocationPermissionType,
} from "@capacitor/geolocation";
import { Geolocation, WatchPositionCallback } from "@capacitor/geolocation";
import { setLastPrefences } from "../app/PrefencesService";

export const getCurrentLocationPosition = async function (
  enableHighAccuracy = false
) {
  const position = await Geolocation.getCurrentPosition({ enableHighAccuracy });
  setTimeout(() => setLastPrefences("position", position));
  return position;
};

export const watchCurrentLocationPosition = function (
  enableHighAccuracy = false,
  callback: WatchPositionCallback
) {
  return Geolocation.watchPosition({ enableHighAccuracy }, callback);
};

export const clearLocationPositionWatch = function (id: string) {
  return Geolocation.clearWatch({ id });
};

export const checkLocationPermissions = function () {
  return Geolocation.checkPermissions();
};

export const requestLocationPermissions = function (
  location?: boolean,
  coarseLocation?: boolean
) {
  const permissions: GeolocationPermissionType[] = [];
  if (location) permissions.push("location");
  if (coarseLocation) permissions.push("coarseLocation");
  return Geolocation.requestPermissions({ permissions }).catch(async (err) => {
    if (err.code != "UNIMPLEMENTED") throw err;
    const result = await navigator.permissions.query({ name: "geolocation" });
    return { location: result.state } as PermissionStatus;
  });
};
export type { PermissionState, PermissionStatus, GeolocationPermissionType };
