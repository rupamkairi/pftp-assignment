import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import { Graphic, graphicsLayer, simpleMarkerSymbol } from "./graphics";

export const map = new Map({
  basemap: "topo",
});

export const mapView = new MapView({
  map: map,
  center: [0, 0],
  zoom: 3,
});

export function initialize(container: HTMLDivElement) {
  mapView.container = container;
  mapView.when().then(() => {
    console.log("MapView Ready");
    map.add(graphicsLayer);
  });

  mapView.on("click", (event) => {
    console.log(event);

    const pointGraphic = new Graphic({
      geometry: event.mapPoint,
      symbol: simpleMarkerSymbol,
    });

    graphicsLayer.add(pointGraphic);
  });

  return () => {
    mapView.destroy();
  };
}
