import ls from "localstorage-slim";
import { addPluralRule, addUncountableRule } from "pluralize";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { Core } from "@neverquest/components/Core";

import "@neverquest/styles/index.scss";

ls.config.encrypt = true;

addPluralRule(/ix$/i, "ices");
addPluralRule(/us$/i, "i");
addUncountableRule("topaz");

createRoot(document.querySelector("#root") as Element).render(
  <StrictMode>
    <Core />
  </StrictMode>,
);
