import { apis } from "@/config";
import { useFormStore } from "@/stores/form.store";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import ky from "ky";

export default function FloatingForm({ isOpen, setIsOpen }) {
  const {
    name,
    description,
    address,
    latitude,
    longitude,
    setName,
    setDescription,
  } = useFormStore();

  async function saveFormData() {
    try {
      const res = await ky.post(apis.locations, {
        json: { name, description, address, latitude, longitude },
      });
      console.log(await res.json());
    } catch (error) {
      console.log("saveFormData error", error);
    }
  }

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
          <DialogTitle className="font-bold">Add Location</DialogTitle>
          <Description>A new location will be added.</Description>
          <div>
            <pre>
              {JSON.stringify(
                { name, description, address, latitude, longitude },
                null,
                2
              )}
            </pre>
            <div>
              {/* <label htmlFor="name">Name</label> */}
              <input
                type="text"
                id="name"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <br />
            <div>
              {/* <label htmlFor="description">Description</label> */}
              <input
                type="text"
                id="description"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
          <br />

          <div className="flex gap-4">
            <button
              onClick={() => {
                saveFormData();
                setIsOpen(false);
              }}
            >
              Save
            </button>
            <button onClick={() => setIsOpen(false)}>Cancel</button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
