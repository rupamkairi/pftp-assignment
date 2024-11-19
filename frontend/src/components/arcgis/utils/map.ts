import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import * as reactiveUtils from "@arcgis/core/core/reactiveUtils";
import { locationsFeatureLayer } from "./features";
import { graphicsLayer } from "./graphics";
import { useFormStore } from "@/stores/form.store";

export const map = new Map({
  basemap: "topo",
});

const INDIA_CENTER = [78.96, 20.59];
export const mapView = new MapView({
  map: map,
  container: undefined,
  center: INDIA_CENTER,
  zoom: 5,
});

export function initialize(container: HTMLDivElement) {
  if (!container) return;
  mapView.container = container;

  mapView.when().then(() => {
    console.log("MapView Ready");
    map.add(graphicsLayer);
    map.add(locationsFeatureLayer);
  });

  return () => {
    mapView.destroy();
  };
}

// This is not a very good way of handling stuff
// wanna revisit this again
reactiveUtils.when(
  () => mapView.popup.visible,
  () => {
    // console.log("Popup Visible");
    useFormStore.getState().setDisableForm(true);
  }
);
reactiveUtils.when(
  () => !mapView.popup.visible,
  () => {
    // console.log("Popup Closed");
    useFormStore.getState().setDisableForm(false);
  }
);

export function onMapClick(callback: (event: __esri.ViewClickEvent) => void) {
  if (!mapView) return;

  reactiveUtils.on(
    () => mapView,
    "click",
    (event) => {
      setTimeout(() => {
        // console.log("Click");
        if (useFormStore.getState().disableForm) return;
        callback(event);
      }, 250);
    }
  );
}
