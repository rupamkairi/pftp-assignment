import Graphic from "@arcgis/core/Graphic";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";

export const graphicsLayer = new GraphicsLayer();

export { Graphic, GraphicsLayer };

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
