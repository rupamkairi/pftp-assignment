import { create } from "zustand";

export type Location = {
  id?: number;
  createdAt?: string;
  updatedAt?: string;
  name: string;
  description?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
};

interface LocationsStore {
  locations: Location[];
  selectedLocation: Location | null;
  setLocations: (locations: Location[]) => void;
  setSelectedLocation: (location: Location | null) => void;
}

export const useLocationsStore = create<LocationsStore>()((set) => ({
  locations: [],

  selectedLocation: null,

  setLocations: (locations: Location[]) => set({ locations }),

  setSelectedLocation: (location: Location | null) =>
    set({ selectedLocation: location }),
}));
