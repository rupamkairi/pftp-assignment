import { useState } from "react";
import { getGeocodeLocations } from "./utils/geocode";
import { showLocationsInMap } from "./utils/graphics";

export default function Geocode() {
  const [address, setAddress] = useState("");

  return (
    <div>
      <input
        type="text"
        value={address}
        onChange={(e) => {
          setAddress(e.target.value);
        }}
      />
      <button
        onClick={async () => {
          const results = await getGeocodeLocations(address);
          showLocationsInMap(results);
        }}
      >
        Geocode
      </button>
    </div>
  );
}
