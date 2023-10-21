import { atomFamily } from "recoil";

import { DEFAULT_DELTA_DISPLAY } from "@neverquest/data/general";
import { handleLocalStorage, withStateKey } from "@neverquest/state";
import type { DeltaDisplay } from "@neverquest/types/ui";
import type { Delta } from "@neverquest/types/unions";

// ATOMS

export const deltas = withStateKey("deltas", (key) =>
  atomFamily<DeltaDisplay, Delta>({
    default: DEFAULT_DELTA_DISPLAY,
    effects: (parameter) => [handleLocalStorage({ key, parameter })],
    key,
  }),
);
