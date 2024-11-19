import { useEffect } from "react";
import { fetchLocations } from "../utils/features";
import { Location, useLocationsStore } from "@/stores/locations.store";

export default function LocationsList() {
  const { locations, setLocations, setSelectedLocation } = useLocationsStore();

  useEffect(() => {
    (async () => {
      const _locations = await fetchLocations();
      setLocations(_locations as Location[]);
    })();
  }, []);

  return (
    <div className="h-[92vh] overflow-hidden">
      <p>Locations</p>
      <div className="h-full overflow-y-scroll">
        {locations?.map((l) => (
          <div
            key={l.id}
            className="border p-4 m-1 cursor-pointer"
            onClick={() => {
              setSelectedLocation(l);
            }}
          >
            <p>{l.name}</p>
            <p className="text-xs">{l.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
