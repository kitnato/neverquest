import { atomFamily } from "recoil";

import { DELTA_DEFAULT } from "@neverquest/constants";
import { localStorageEffect } from "@neverquest/state/effects";
import { DeltaType, StorageKey } from "@neverquest/types/enums";
import { DeltaDisplay } from "@neverquest/types/ui";

export const deltas = atomFamily<DeltaDisplay, DeltaType>({
  default: DELTA_DEFAULT,
  effects: (parameter) => [localStorageEffect<DeltaDisplay>(`${StorageKey.Deltas}-${parameter}`)],
  key: StorageKey.Deltas,
});
