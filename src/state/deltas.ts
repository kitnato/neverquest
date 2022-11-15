import { atomFamily } from "recoil";

import { DEFAULT_DELTA_DISPLAY } from "@neverquest/constants";
import localStorage from "@neverquest/state/effects/localStorage";
import { DeltaType, StorageKey } from "@neverquest/types/enums";
import { DeltaDisplay } from "@neverquest/types/ui";

export const deltas = atomFamily<DeltaDisplay, DeltaType>({
  default: DEFAULT_DELTA_DISPLAY,
  effects: (parameter) => [localStorage<DeltaDisplay>(`${StorageKey.Deltas}-${parameter}`)],
  key: StorageKey.Deltas,
});
