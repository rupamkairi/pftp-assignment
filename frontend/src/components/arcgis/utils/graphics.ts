import { Location } from "@/stores/locations.store";
import Graphic from "@arcgis/core/Graphic";
import { Point } from "@arcgis/core/geometry";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";

export const graphicsLayer = new GraphicsLayer();

export { Graphic, GraphicsLayer, Point };

export const simpleMarkerSymbol = {
  type: "simple-marker",
  color: [0, 0, 0],
  outline: {
    color: [255, 255, 255],
    width: 1,
  },
};

export function clearGraphics() {
  graphicsLayer.removeAll();
}

export function addPointGraphic(point: __esri.Point) {
  try {
    const pointGraphic = new Graphic({
      geometry: point,
      symbol: simpleMarkerSymbol,
    });
    graphicsLayer.add(pointGraphic);
  } catch (error) {
    console.log("addPointGraphic error", error);
  }
}

export function showLocationsInMap(results: __esri.AddressCandidate[]) {
  clearGraphics();

  results.forEach((result) => {
    const pointGraphic = new Graphic({
      geometry: result.location,
      symbol: simpleMarkerSymbol,
    });
    graphicsLayer.add(pointGraphic);
  });
}

export function addPointGraphicFromLocations(locations: Location[]) {
  clearGraphics();

  locations?.forEach((location) => {
    const point = new Point({
      latitude: location.latitude,
      longitude: location.longitude,
    });

    const pointGraphic = new Graphic({
      geometry: point,
      attributes: {
        id: location.id,
        name: location.name,
        descrption: location.description,
      },
      popupTemplate: {
        title: location.name,
        content: location.description,
      },
    });

    graphicsLayer.add(pointGraphic);
  });
}
