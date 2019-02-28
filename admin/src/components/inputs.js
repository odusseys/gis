import React from "react";

export const TextInput = p => (
  <input {...p} className={"bp3-input " + p.className || ""} />
);
