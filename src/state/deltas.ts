import { atomFamily } from "recoil";

import { DEFAULT_DELTA_DISPLAY } from "@neverquest/constants";
import { localStorageEffect } from "@neverquest/state/effects";
import { DeltaType, StorageKey } from "@neverquest/types/enums";
import { DeltaDisplay } from "@neverquest/types/ui";

export const deltas = atomFamily<DeltaDisplay, DeltaType>({
  default: DEFAULT_DELTA_DISPLAY,
  effects: (parameter) => [localStorageEffect<DeltaDisplay>(`${StorageKey.Deltas}-${parameter}`)],
  key: StorageKey.Deltas,
});
