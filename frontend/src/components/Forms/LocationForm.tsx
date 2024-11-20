import { apis } from "@/config";
import { useFormStore } from "@/stores/form.store";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import ky from "ky";
import { fetchLocations } from "../arcgis/locations";

type Props = {
  id?: number;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
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

  async function createLocation() {
    try {
      const res = await ky.post(apis.locations, {
        json: { name, description, address, latitude, longitude },
      });
      console.log(await res.json());
      fetchLocations();
    } catch (error) {
      console.log("createLocation error", error);
    }
  }

  async function editLocation() {
    try {
      const res = await ky.patch(apis.locationById(id!), {
        json: { name, description },
      });
      console.log(await res.json());
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
        <DialogPanel className="w-96 space-y-4 border shadow bg-white p-8">
          <DialogTitle className="text-xl font-black">Location</DialogTitle>
          <Description>
            <p className="text-sm">{address}</p>
            <p className="text-xs">
              {latitude}, {longitude}
            </p>
          </Description>
          <div>
            <div>
              {/* <label htmlFor="name">Name</label> */}
              <input
                className="w-full"
                type="text"
                id="name"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
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
                className="text-blue-500"
                onClick={() => {
                  editLocation();
                  setIsOpen(false);
                }}
              >
                Edit
              </button>
            ) : (
              <button
                className="text-blue-500"
                onClick={() => {
                  createLocation();
                  setIsOpen(false);
                }}
              >
                Create
              </button>
            )}
            <button
              className="text-gray-500"
              onClick={() => {
                resetForm();
                setIsOpen(false);
              }}
            >
              Cancel
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
