import type { PermissionStatus } from "../capacitor/geolocation";
import {
  checkLocationPermissions,
  requestLocationPermissions,
  getCurrentLocationPosition,
} from "../capacitor/geolocation";
import { getAdressFromCoordinatesApi } from "../api/GeolocationApiService";
import {
  Address,
  Coordinates,
  GeolocationApiResponse,
  LastPositions,
} from "@/types/location";
import { geohashForLocation } from "geofire-common";

import { getLastPrefences, setLastPrefences } from "./PrefencesService";
/**
 * Reads result of checkLocationPermissions and returns the permissions status as boolean
 * @constructor
 * @returns {boolean} boolean or undefined.
 */
export const checkLocationPermissionsResult = function (
  permissionStatus: PermissionStatus
) {
  const p = permissionStatus;
  const isLAvailable = p.location && p.location != "denied";
  const isCLAvailable = p.coarseLocation && p.coarseLocation != "denied";
  if (isLAvailable || isCLAvailable) return true;
  return false;
};

/**
 * Gets user positions from localstorage
 * @constructor
 * @returns {FunoUser} Position or undefined.
 */
export const getLastPositions = async function () {
  const lastPosition = await getLastPrefences("position");
  return {
    lastPosition: lastPosition?.last,
    latestPosition: lastPosition?.latest,
  } as LastPositions;
};

/**
 * Gets user current position if available,
 * its also saves the current position to localstorage
 * as a last current postion
 * @constructor
 * @returns {Position} Position or undefined.
 */
export const getCurrentPosition = function () {
  const _getCurrentLocationPosition = () => {
    return getCurrentLocationPosition.pLogger().then((p) => {
      setTimeout(() => setLastPrefences("position", p));
      return p;
    });
  };
  return checkLocationPermissions
    .pLogger()
    .then(checkLocationPermissionsResult)
    .then((hasAccess) => {
      if (hasAccess) return _getCurrentLocationPosition();
      return requestLocationPermissions
        .pLogger(true, true)
        .then(checkLocationPermissionsResult)
        .then((hasAccess) => {
          if (hasAccess) return _getCurrentLocationPosition();
          else return undefined;
        });
    });
};

export const getAdressFromCoordinates = function (coordinates: Coordinates) {
  return getAdressFromCoordinatesApi(coordinates).then((result) => {
    setTimeout(() => setLastPrefences("address", result?.address));
    return result;
  });
};

export const getUsableAddress = function (
  apiAddress: GeolocationApiResponse,
  coordinates?: Coordinates
) {
  return new Address(
    apiAddress.display_name,
    apiAddress.address.amenity,
    apiAddress.address.suburb,
    apiAddress.address.village ?? apiAddress.address.town,
    apiAddress.address.city,
    apiAddress.address.country,
    coordinates
      ? coordinates
      : new Coordinates(parseInt(apiAddress.lat), parseInt(apiAddress.lon))
  );
};

export const geteGeoHash = function (latitude: number, longitude: number) {
  return geohashForLocation([latitude, longitude]);
};
