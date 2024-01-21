import { Coordinates, GeolocationApiResponse } from "@/types/location";
import { httpRequest } from ".";
export const geolocationApiServiceUrl = "http://nominatim.openstreetmap.org/";

export const getAdressFromCoordinatesApi = function (coordinates: Coordinates) {
  const lon = coordinates.longitude;
  const lat = coordinates.latitude;
  const params = `reverse?format=json&lon=${lon}&lat=${lat}`;
  return httpRequest(geolocationApiServiceUrl + params, "GET", {}).then(
    async (request) => (await request.json()) as GeolocationApiResponse
  );
};
