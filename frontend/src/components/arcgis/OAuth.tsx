import React, { useEffect } from "react";
import { signIn } from "./utils/oauth";

export default function OAuth() {
  useEffect(() => {
    signIn();
  }, []);

  return (
    <div className="hidden">
      <button onClick={signIn}>Sign In</button>
    </div>
  );
}
