import { useState } from "react";
import { getGeocodeAddress, getGeocodeLocations } from "./utils/geocode";
import { showLocationsInMap } from "./utils/graphics";

export default function Geocode() {
  const [address, setAddress] = useState("");

  return (
    <div>
      <input
        type="text"
        className="w-80"
        value={address}
        onChange={(e) => {
          setAddress(e.target.value);
        }}
      />
      <button
        onClick={async () => {
          // const result = await getGeocodeAddress();
          // console.log(result.address);
          const results = await getGeocodeLocations(address);
          const data = results.map((result) => result.location);
          // showLocationsInMap(results);
          console.log(data);
        }}
      >
        Geocode
      </button>
    </div>
  );
}
