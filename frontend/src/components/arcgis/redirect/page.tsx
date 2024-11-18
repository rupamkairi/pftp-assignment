"use client";

import { useParams } from "next/navigation";

export default function Page() {
  const params = Object.entries(useParams());
  console.log(params);

  return <div>Hello world</div>;
}
