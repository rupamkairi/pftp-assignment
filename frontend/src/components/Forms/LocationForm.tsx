import { apis } from "@/config";
import { useFormStore } from "@/stores/form.store";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import ky from "ky";
import { useState } from "react";
import { fetchLocations } from "../arcgis/locations";

type Props = {
  id?: number;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

const errorInitialState = {
  hasError: false,
  name: "",
  description: "",
};

export default function LocationForm({ id, isOpen, setIsOpen }: Props) {
  const {
    name,
    description,
    address,
    latitude,
    longitude,
    setName,
    setDescription,
    resetForm,
  } = useFormStore();
  const [error, setError] = useState({ ...errorInitialState });

  function validateForm() {
    const _error = error;
    if (!name) {
      _error.hasError = true;
      _error.name = "Name is required";
    } else {
      _error.hasError = false;
      _error.name = "";
    }

    if (_error.hasError) {
      setError({ ..._error });
    } else {
      setError({ ...errorInitialState });
    }

    return !_error.hasError;
  }

  async function createLocation() {
    try {
      if (!validateForm()) return;
      const res = await ky.post(apis.locations, {
        json: { name, description, address, latitude, longitude },
      });
      console.log(await res.json());
      setIsOpen(false);
      fetchLocations();
    } catch (error) {
      console.log("createLocation error", error);
    }
  }

  async function editLocation() {
    try {
      if (!validateForm()) return;
      const res = await ky.patch(apis.locationById(id!), {
        json: { name, description },
      });
      console.log(await res.json());
      setIsOpen(false);
      fetchLocations();
    } catch (error) {
      console.log("editLocation error", error);
    }
  }

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="w-96 space-y-4 border rounded shadow bg-white p-8">
          <DialogTitle className="text-xl font-black">Location</DialogTitle>
          <div>
            <p className="text-sm">Geocoder Address: {address}</p>
            <p className="text-xs">
              {latitude}, {longitude}
            </p>
          </div>
          <form onSubmit={(e) => e.preventDefault()}>
            <div>
              {/* <pre>{JSON.stringify(error, null, 2)}</pre> */}
              <div>
                {/* <label htmlFor="name">Name</label> */}
                <input
                  className="w-full"
                  type="text"
                  id="name"
                  required
                  placeholder="Name *"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <p className="text-xs text-red-500">{error.name}</p>
              </div>
              <div className="my-1"></div>
              <div>
                {/* <label htmlFor="description">Description</label> */}
                <input
                  className="w-full"
                  type="text"
                  id="description"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
            <br />
            <div className="flex justify-between ">
              {id ? (
                <button
                  type="button"
                  className="font-semibold text-blue-500"
                  onClick={() => {
                    editLocation();
                  }}
                >
                  ∏ Update
                </button>
              ) : (
                <button
                  type="button"
                  className="font-semibold text-blue-500"
                  onClick={() => {
                    createLocation();
                  }}
                >
                  Create
                </button>
              )}
              <button
                type="button"
                className="text-gray-500"
                onClick={() => {
                  resetForm();
                  setIsOpen(false);
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
