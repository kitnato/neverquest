import { atomFamily } from "recoil";

import { handleStorage } from "@neverquest/state/effects/handleStorage";
import type { DeltaDisplay } from "@neverquest/types/ui";
import type { Delta } from "@neverquest/types/unions";
import { withStateKey } from "@neverquest/utilities/helpers";

// ATOMS

export const deltas = withStateKey("deltas", (key) =>
  atomFamily<{ display: DeltaDisplay[]; ID: string }[], Delta>({
    default: [],
    effects: (delta) => [handleStorage({ key, parameter: delta })],
    key,
  }),
);
