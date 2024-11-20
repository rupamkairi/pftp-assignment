import { useFormStore } from "@/stores/form.store";
import { Location, useLocationsStore } from "@/stores/locations.store";
import { useEffect, useRef, useState } from "react";
import DeleteConfirmation from "../Forms/DeleteConfirmation";
import LocationForm from "../Forms/LocationForm";
import LocationsList from "./features/LocationsList";
import { addPointGraphicFromLocations } from "./utils/graphics";
import { initialize, onMapClick } from "./utils/map";
import { getGeocodeAddress } from "./utils/geocode";

export default function BasicMap() {
  const { locations } = useLocationsStore();
  const { setCoordinates, setAddress, setForm } = useFormStore();

  const elementRef = useRef<HTMLDivElement>();
  const [isOpen, setIsOpen] = useState(false);
  const [toEdit, setToEdit] = useState({
    id: 0,
  });
  const [toDelete, setToDelete] = useState({
    open: false,
    id: 0,
    title: "",
  });

  useEffect(() => {
    if (!elementRef.current) return;
    initialize(elementRef.current);
  }, []);

  useEffect(() => {
    if (!elementRef.current) return;
    if (!locations.length) return;
    addPointGraphicFromLocations(locations);
  }, [locations]);

  useEffect(() => {
    onMapClick(async (event) => {
      console.log("Event opens popup");
      const result = await getGeocodeAddress(
        event.mapPoint.latitude,
        event.mapPoint.longitude
      );
      setAddress(result.address);
      setCoordinates(event.mapPoint.latitude, event.mapPoint.longitude);
      setIsOpen(true);
    });
  }, []);

  function onEdit(location: Location) {
    console.log("Editing", location);
    setIsOpen(true);
    setForm(location);
    setToEdit({
      id: location.id!,
    });
  }

  function onDelete(location: Location) {
    console.log("Deleting", location);
    setToDelete({
      open: true,
      id: location.id!,
      title: `You are going to delete "${location.name}".`,
    });
  }

  return (
    <div>
      <div className="flex gap-2">
        <div className="flex-grow max-w-80 h-[92vh]">
          <LocationsList onEdit={onEdit} onDelete={onDelete} />
        </div>
        <div ref={elementRef} id="mapView" className="flex-grow h-[92vh]"></div>
      </div>
      <LocationForm id={toEdit.id} isOpen={isOpen} setIsOpen={setIsOpen} />
      <DeleteConfirmation
        id={toDelete.id}
        title={toDelete.title}
        isOpen={toDelete.open}
        setIsOpen={(value: boolean) => {
          setToDelete({ ...toDelete, open: value });
        }}
      />
    </div>
  );
}
