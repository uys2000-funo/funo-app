import { Position } from "@capacitor/geolocation";
import { geohashForLocation } from "geofire-common";

export class Coordinates {
  longitude!: number;
  latitude!: number;
  geoHash!: string;

  static defaultArray: [32.866287, 39.925533];
  static defaultLongitude: 32.866287;
  static defaultLatitude: 39.925533;
  getArray: () => [number, number];
  constructor(longitude = 32.866287, latitude = 39.925533) {
    this.longitude = longitude;
    this.latitude = latitude;
    this.geoHash = geohashForLocation([this.latitude, this.longitude]);
    this.getArray = () => {
      return [this.longitude, this.latitude];
    };
  }
}

export class Address {
  description!: string;
  location!: [
    place: string,
    district: string,
    city: string,
    state: string,
    country: string
  ];
  coordinates!: Coordinates;
  constructor(
    description = "",
    place = "",
    suburb = "",
    city = "",
    state = "",
    country = "",
    coordinates = new Coordinates()
  ) {
    this.description = description;
    this.location = [place, suburb, city, state, country];
    this.coordinates = coordinates;
  }
}

export class Application {
  description!: string;
  location!: [app: string, url: string];
  constructor(description = "", app = "", url = "") {
    this.description = description;
    this.location = [app, url];
  }
}

export class GeolocationApiResponseAddress {
  country_code?: string;
  country?: string;
  state?: string;

  region?: string;
  city?: string;
  county?: string;

  town?: string;
  borough?: string;

  village?: string;
  suburb?: string;

  road?: string;
  postcode?: string;

  house_number?: string;
  amenity?: string;
}

export class GeolocationApiResponse {
  licence!: string;

  place_id!: number;
  place_rank!: number;

  osm_id!: number;
  osm_type!: string;

  lat!: string;
  lon!: string;

  type!: string;
  category!: string;
  importance!: number;
  addresstype!: string;

  display_name!: string;
  name!: string | null;
  address!: GeolocationApiResponseAddress;

  boundingbox!: [string, string, string, string];
}

export type LastPositions = {
  lastPosition: Position;
  latestPosition: Position;
};
