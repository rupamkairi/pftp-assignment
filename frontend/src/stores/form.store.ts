import { create } from "zustand";

interface FormStore {
  disableForm: boolean;

  name: string;
  description?: string;
  address?: string;
  latitude?: number;
  longitude?: number;

  setDisableForm: (disableForm: boolean) => void;

  setName: (name: string) => void;
  setDescription: (description: string) => void;
  setAddress: (address: string) => void;
  setCoordinates: (latitude: number, longitude: number) => void;
}

export const useFormStore = create<FormStore>()((set) => ({
  disableForm: false,

  name: "",
  description: "",
  address: "",
  latitude: 0,
  longitude: 0,

  setDisableForm: (disableForm: boolean) => set({ disableForm }),

  setName: (name: string) => set({ name }),
  setDescription: (description: string) => set({ description }),
  setAddress: (address: string) => set({ address }),
  setCoordinates: (latitude: number, longitude: number) =>
    set({ latitude, longitude }),

  resetForm: () =>
    set({ name: "", description: "", address: "", latitude: 0, longitude: 0 }),
}));
