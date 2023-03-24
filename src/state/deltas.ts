import { atom, atomFamily } from "recoil";

import { DEFAULT_DELTA_DISPLAY } from "@neverquest/constants";
import { handleLocalStorage } from "@neverquest/state/effects/handleLocalStorage";
import { DeltaType } from "@neverquest/types/enums";
import { DeltaDisplay, FloatingText } from "@neverquest/types/ui";

// ATOMS

export const deltas = atomFamily<DeltaDisplay, DeltaType>({
  default: DEFAULT_DELTA_DISPLAY,
  effects: (parameter) => [handleLocalStorage<DeltaDisplay>({ key: "deltas", parameter })],
  key: "deltas",
});

export const floatingTextQueues = atomFamily<FloatingText[], DeltaType>({
  default: [],
  effects: (parameter) => [
    handleLocalStorage<FloatingText[]>({ key: "floatingTextQueues", parameter }),
  ],
  key: "floatingTextQueues",
});

export const monsterBleedingDelta = atom({
  default: 0,
  effects: [handleLocalStorage<number>({ key: "monsterBleedingDelta" })],
  key: "monsterBleedingDelta",
});

export const poisonedDelta = atom({
  default: 0,
  effects: [handleLocalStorage<number>({ key: "poisonedDelta" })],
  key: "poisonedDelta",
});
