import { atomFamily } from "recoil";

import { localStorageEffect } from "@neverquest/state/effects";
import { ShowingType, StorageKey } from "@neverquest/types/enums";

export const isShowing = atomFamily<boolean, ShowingType>({
  default: false,
  effects: (parameter) => [localStorageEffect<boolean>(`${StorageKey.IsShowing}-${parameter}`)],
  key: StorageKey.IsShowing,
});
