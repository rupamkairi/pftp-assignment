import esriConfig from "@arcgis/core/config";
import { addressToLocations } from "@arcgis/core/rest/locator";

export async function getGeocodeLocations(address?: string) {
  const token = localStorage.getItem("token");
  esriConfig.apiKey = token!;

  const geocodingServiceUrl =
    "https://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer";

  const params = {
    address: {
      address: address,
    },
  };

  const results = await addressToLocations(geocodingServiceUrl, params);

  return results;
}
