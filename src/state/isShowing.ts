import { atomFamily } from "recoil";

import localStorage from "@neverquest/state/effects/localStorage";
import { ShowingType, StorageKey } from "@neverquest/types/enums";

export const isShowing = atomFamily<boolean, ShowingType>({
  default: false,
  effects: (parameter) => [localStorage<boolean>(`${StorageKey.IsShowing}-${parameter}`)],
  key: StorageKey.IsShowing,
});
