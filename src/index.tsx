import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { App } from "@neverquest/App";

import "@neverquest/styles/index.scss";

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
