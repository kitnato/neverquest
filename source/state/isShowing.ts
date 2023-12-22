import { atomFamily, selector } from "recoil";
import { handleLocalStorage } from "@neverquest/state/effects/handleLocalStorage";

import { SHOWING_TYPES, type Showing } from "@neverquest/types/unions";
import { withStateKey } from "@neverquest/utilities/helpers";

export const isShowing = withStateKey("isShowing", (key) =>
  atomFamily<boolean, Showing>({
    default: false,
    effects: (showing) => [handleLocalStorage({ key, parameter: showing })],
    key,
  }),
);

export const isShowingEverything = withStateKey("isShowingEverything", (key) =>
  selector({
    get: ({ get }) => Object.values(SHOWING_TYPES).every((showing) => get(isShowing(showing))),
    key,
  }),
);
