import { atom, atomFamily } from "recoil";

import { DEFAULT_DELTA_DISPLAY } from "@neverquest/constants";
import localStorage from "@neverquest/state/effects/localStorage";
import { DeltaType, StorageKey } from "@neverquest/types/enums";
import { DeltaDisplay, FloatingText } from "@neverquest/types/ui";

// ATOMS

export const deltas = atomFamily<DeltaDisplay, DeltaType>({
  default: DEFAULT_DELTA_DISPLAY,
  effects: (parameter) => [localStorage<DeltaDisplay>(`${StorageKey.Deltas}-${parameter}`)],
  key: StorageKey.Deltas,
});

export const floatingTextQueues = atomFamily<FloatingText[], DeltaType>({
  default: [],
  effects: (parameter) => [
    localStorage<FloatingText[]>(`${StorageKey.FloatingTextQueues}-${parameter}`),
  ],
  key: StorageKey.FloatingTextQueues,
});

export const monsterBleedingDelta = atom({
  default: 0,
  effects: [localStorage<number>(StorageKey.MonsterBleedingDelta)],
  key: StorageKey.MonsterBleedingDelta,
});

export const poisonedDelta = atom({
  default: 0,
  effects: [localStorage<number>(StorageKey.PoisonedDelta)],
  key: StorageKey.PoisonedDelta,
});
