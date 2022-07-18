import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "@neverquest/App";

import "animate.css";
import "bootstrap/dist/css/bootstrap.min.css";

import "@neverquest/index.css";

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
