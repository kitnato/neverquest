import { atomFamily } from "recoil";

import { handleLocalStorage, withStateKey } from "@neverquest/state";
import type { Showing } from "@neverquest/types/unions";

export const isShowing = withStateKey("isShowing", (key) =>
  atomFamily<boolean, Showing>({
    default: false,
    effects: (parameter) => [handleLocalStorage<boolean>({ key, parameter })],
    key,
  })
);
