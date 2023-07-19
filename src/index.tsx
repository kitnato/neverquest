import ls from "localstorage-slim";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { Core } from "@neverquest/components/Core";

import "@neverquest/styles/index.scss";

ls.config.encrypt = true;

createRoot(document.getElementById("root") as Element).render(
  <StrictMode>
    <Core />
  </StrictMode>
);
