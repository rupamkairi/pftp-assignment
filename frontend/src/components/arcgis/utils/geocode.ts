import { Location } from "@/stores/locations.store";
import esriConfig from "@arcgis/core/config";
import {
  addressToLocations,
  locationToAddress,
} from "@arcgis/core/rest/locator";
import { Point } from "./graphics";

export async function getGeocodeLocations(address?: string) {
  const token = localStorage.getItem("token");
  esriConfig.apiKey = token!;

  const geocodingServiceUrl =
    "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer";

  const results = await addressToLocations(geocodingServiceUrl, {
    address: {
      address,
    },
  });

  return results;
}

export async function getGeocodeAddress(latitude: number, longitude: number) {
  const token = localStorage.getItem("token");
  esriConfig.apiKey = token!;

  const geocodingServiceUrl =
    "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer";

  const point = new Point({
    latitude: latitude,
    longitude: longitude,
  });

  const results = await locationToAddress(geocodingServiceUrl, {
    location: point,
  });

  return results;
}
