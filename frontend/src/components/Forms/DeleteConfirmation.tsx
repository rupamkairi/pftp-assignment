import { apis } from "@/config";
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
  title?: string;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

export default function DeleteConfirmation({
  id,
  title,
  isOpen,
  setIsOpen,
}: Props) {
  async function deleteLocation() {
    try {
      const res = await ky.delete(apis.locationById(id!));
      console.log(await res.json());
      fetchLocations();
    } catch (error) {
      console.log("deleteLocation error", error);
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
          <DialogTitle className="font-bold">{title}</DialogTitle>
          <Description></Description>

          <div className="flex justify-between">
            <button
              className="font-semibold text-red-500"
              onClick={() => {
                console.log("Delete", id);
                deleteLocation();
                setIsOpen(false);
              }}
            >
              Delete
            </button>
            <button
              className=" text-gray-500"
              onClick={() => {
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
