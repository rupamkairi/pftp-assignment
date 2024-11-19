import { apis } from "@/config";
import ky from "ky";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";

export const locationsFeatureLayer = new FeatureLayer({
  source: [],
  objectIdField: "id",
  fields: [
    {
      name: "id",
      type: "integer",
    },
    {
      name: "name",
      type: "string",
    },
    {
      name: "description",
      type: "string",
    },
  ],
  popupEnabled: true,
  popupTemplate: {
    title: "{name}",
    content: "{description}",
  },
});

export async function fetchLocations() {
  try {
    const res = await ky.get(apis.locations);
    const locations = await res.json();
    return locations;
  } catch (error) {
    console.log("getLocations error", error);
  }
}
