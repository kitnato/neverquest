import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { Core } from "@neverquest/components/Core";

import "@neverquest/styles/index.scss";

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <StrictMode>
    <Core />
  </StrictMode>
);
