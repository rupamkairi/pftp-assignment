"use client";

import { config } from "@/config";
import ky from "ky";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    ky.get(config.apiUrl).json().then(console.log);
  }, []);

  return <div>App</div>;
}
