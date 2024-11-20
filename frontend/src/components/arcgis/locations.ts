import { apis } from "@/config";
import ky from "ky";
import { Location, useLocationsStore } from "@/stores/locations.store";

export async function fetchLocations() {
  try {
    const res = await ky.get(apis.locations);
    const locations = await res.json();
    useLocationsStore.setState({ locations: locations as Location[] });
    return locations;
  } catch (error) {
    console.log("getLocations error", error);
  }
}
