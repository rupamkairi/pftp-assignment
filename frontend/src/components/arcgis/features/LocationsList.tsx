import { Location, useLocationsStore } from "@/stores/locations.store";
import { useEffect } from "react";
import { fetchLocations } from "../locations";

type Props = {
  onEdit: (location: Location) => void;
  onDelete: (location: Location) => void;
};

export default function LocationsList({ onEdit, onDelete }: Props) {
  const { locations } = useLocationsStore();

  useEffect(() => {
    fetchLocations();
  }, []);

  return (
    <div className="h-[92vh] overflow-hidden">
      <p>Locations</p>
      <div className="h-full flex flex-col gap-1 overflow-y-scroll">
        {locations?.map((l) => (
          <div key={l.id} className="border shadow p-4 cursor-pointer">
            <div className="flex justify-between">
              <div>
                <p>{l.name}</p>
                <p className="text-xs">{l.description}</p>
              </div>
              <div className="text-sm flex flex-col gap-2">
                <button
                  className="block hover:underline text-blue-500"
                  onClick={() => {
                    onEdit(l);
                  }}
                >
                  Edit
                </button>
                <button
                  className="block hover:underline text-red-500"
                  onClick={() => {
                    onDelete(l);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
