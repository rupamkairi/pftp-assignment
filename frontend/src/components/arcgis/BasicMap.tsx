import { initialize } from "./arcgis";
import { useEffect, useRef } from "react";

export default function BasicMap() {
  const elementRef = useRef<any>();

  useEffect(() => {
    console.log(elementRef.current);
    if (!elementRef.current) return;
    initialize(elementRef.current);
  }, []);

  return <div ref={elementRef} id="viewDiv"></div>;
}
