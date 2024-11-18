import { map, mapView } from "./arcgis";
import Graphic from "@arcgis/core/Graphic";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";

export const graphicsLayer = new GraphicsLayer();

export { Graphic, GraphicsLayer };

let points = [];

export const simpleMarkerSymbol = {
  type: "simple-marker",
  color: [226, 119, 40],
  outline: {
    color: [255, 255, 255],
    width: 1,
  },
};
