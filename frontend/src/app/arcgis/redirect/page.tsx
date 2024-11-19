"use client";

import { useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = Object.fromEntries(useSearchParams());

  return (
    <div className="container mx-auto">
      <pre>{JSON.stringify(searchParams, null, 2)}</pre>
    </div>
  );
}
