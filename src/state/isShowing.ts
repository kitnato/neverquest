import { atomFamily, selector } from "recoil";

import { handleLocalStorage, withStateKey } from "@neverquest/state";
import { SHOWING_TYPES, type Showing } from "@neverquest/types/unions";

export const isShowing = withStateKey("isShowing", (key) =>
  atomFamily<boolean, Showing>({
    default: false,
    effects: (parameter) => [handleLocalStorage({ key, parameter })],
    key,
  }),
);

export const isShowingEverything = withStateKey("isShowingEverything", (key) =>
  selector({
    get: ({ get }) => Object.values(SHOWING_TYPES).every((showing) => get(isShowing(showing))),
    key,
  }),
);
