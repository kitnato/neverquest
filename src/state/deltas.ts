import { atomFamily } from "recoil";

import { handleLocalStorage } from "@neverquest/state/effects/handleLocalStorage";
import type { DeltaDisplay } from "@neverquest/types/ui";
import type { Delta } from "@neverquest/types/unions";
import { withStateKey } from "@neverquest/utilities/helpers";

// ATOMS

export const deltas = withStateKey("deltas", (key) =>
  atomFamily<DeltaDisplay | null, Delta>({
    default: null,
    effects: (parameter) => [handleLocalStorage({ key, parameter })],
    key,
  }),
);
