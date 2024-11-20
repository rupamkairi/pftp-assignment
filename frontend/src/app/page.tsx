"use client";

import { AGBasicMap, OAuth } from "@/components/arcgis";

export default function Home() {
  // useEffect(() => {
  //   ky.get(apiUrl).json().then(console.log);
  // }, []);

  return (
    <div className="container mx-auto max-h-screen">
      <OAuth />
      {/* <Geocode /> */}
      <AGBasicMap />
    </div>
  );
}
