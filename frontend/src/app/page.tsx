"use client";

import { AGBasicMap, Geocode, OAuth } from "@/components/arcgis";

export default function Home() {
  // useEffect(() => {
  //   ky.get(apiUrl).json().then(console.log);
  // }, []);

  return (
    <div>
      <OAuth />
      <Geocode />
      <AGBasicMap />
    </div>
  );
}
