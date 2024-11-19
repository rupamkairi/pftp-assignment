// import "./arcgis.css";
import dynamic from "next/dynamic";

const AGBasicMap = dynamic(() => import("./BasicMap"), { ssr: false });

const OAuth = dynamic(() => import("./OAuth"), { ssr: false });
const Geocode = dynamic(() => import("./Geocode"), { ssr: false });

export { AGBasicMap, OAuth, Geocode };
