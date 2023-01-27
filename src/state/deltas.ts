import { atom, atomFamily } from "recoil";

import { DEFAULT_DELTA_DISPLAY } from "@neverquest/constants";
import { handleLocalStorage } from "@neverquest/state/effects/handleLocalStorage";
import { DeltaType, StorageKey } from "@neverquest/types/enums";
import { DeltaDisplay, FloatingText } from "@neverquest/types/ui";

// ATOMS

export const deltas = atomFamily<DeltaDisplay, DeltaType>({
  default: DEFAULT_DELTA_DISPLAY,
  effects: (parameter) => [handleLocalStorage<DeltaDisplay>(`${StorageKey.Deltas}-${parameter}`)],
  key: StorageKey.Deltas,
});

export const floatingTextQueues = atomFamily<FloatingText[], DeltaType>({
  default: [],
  effects: (parameter) => [
    handleLocalStorage<FloatingText[]>(`${StorageKey.FloatingTextQueues}-${parameter}`),
  ],
  key: StorageKey.FloatingTextQueues,
});

export const monsterBleedingDelta = atom({
  default: 0,
  effects: [handleLocalStorage<number>(StorageKey.MonsterBleedingDelta)],
  key: StorageKey.MonsterBleedingDelta,
});

export const poisonedDelta = atom({
  default: 0,
  effects: [handleLocalStorage<number>(StorageKey.PoisonedDelta)],
  key: StorageKey.PoisonedDelta,
});
