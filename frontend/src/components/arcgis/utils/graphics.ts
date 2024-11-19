import Graphic from "@arcgis/core/Graphic";
import { Point } from "@arcgis/core/geometry";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";

export const graphicsLayer = new GraphicsLayer();

export { Graphic, GraphicsLayer, Point };

let points = [];

export const simpleMarkerSymbol = {
  type: "simple-marker",
  color: [0, 0, 0],
  outline: {
    color: [255, 255, 255],
    width: 1,
  },
};

export function clearGraphics() {
  points = [];
  graphicsLayer.removeAll();
}

export function addPointGraphic(point: __esri.Point) {
  try {
    // console.log("addPointGraphic", point);
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
    console.log(result.location);
    const pointGraphic = new Graphic({
      geometry: result.location,
      symbol: simpleMarkerSymbol,
    });
    graphicsLayer.add(pointGraphic);
  });
}
