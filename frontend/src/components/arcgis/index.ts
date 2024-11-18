// import { setAssetPath as setCalciteComponentsAssetPath } from "@esri/calcite-components/dist/components";
// setCalciteComponentsAssetPath(
//   "https://js.arcgis.com/calcite-components/2.13.2/assets"
// );

import "./arcgis.css";
import dynamic from "next/dynamic";

const AGBasicMap = dynamic(() => import("./BasicMap"), { ssr: false });

export { AGBasicMap };
