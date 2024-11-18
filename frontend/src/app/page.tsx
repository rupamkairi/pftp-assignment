"use client";

import { AGBasicMap } from "@/components/arcgis";

export default function Home() {
  // useEffect(() => {
  //   ky.get(apiUrl).json().then(console.log);
  // }, []);

  return (
    <div>
      <AGBasicMap />
    </div>
  );
}
