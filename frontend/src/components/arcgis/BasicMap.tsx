import { useFormStore } from "@/stores/form.store";
import { useLocationsStore } from "@/stores/locations.store";
import { useEffect, useRef, useState } from "react";
import FloatingForm from "../Forms/FloatingForm";
import LocationsList from "./features/LocationsList";
import { locationsFeatureLayer } from "./utils/features";
import { Graphic, graphicsLayer, Point } from "./utils/graphics";
import { initialize, onMapClick } from "./utils/map";

export default function BasicMap() {
  const { locations } = useLocationsStore();
  const { setCoordinates } = useFormStore();

  const elementRef = useRef<any>();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!elementRef.current) return;
    initialize(elementRef.current);
  }, []);

  useEffect(() => {
    if (!elementRef.current) return;
    if (!locations.length) return;
    const points: any = [];
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
          title: "Point Graphic",
        },
      });

      // graphicsLayer.add(pointGraphic);
      points.push(pointGraphic);
    });

    locationsFeatureLayer.source = points;
  }, [locations]);

  useEffect(() => {
    onMapClick((event) => {
      console.log("Event opens popup");
      setCoordinates(event.mapPoint.latitude, event.mapPoint.longitude);
      setIsOpen(true);
    });
  }, []);

  return (
    <div>
      <div className="flex">
        <div className="flex-grow max-w-80 h-[92vh]">
          <LocationsList />
        </div>
        <div ref={elementRef} id="mapView" className="flex-grow h-[92vh]"></div>
      </div>
      <FloatingForm isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}
