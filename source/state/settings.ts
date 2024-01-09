import { atom, atomFamily } from "recoil";
import { SETTINGS } from "@neverquest/data/settings";
import { handleLocalStorage } from "@neverquest/state/effects/handleLocalStorage";

import type { Setting } from "@neverquest/types/unions";
import { withStateKey } from "@neverquest/utilities/helpers";

// ATOMS

export const expandedBuyback = withStateKey("expandedBuyback", (key) =>
  atom({
    default: true,
    effects: [handleLocalStorage({ key })],
    key,
  }),
);

export const expandedMasteries = withStateKey("expandedMasteries", (key) =>
  atom({
    default: true,
    effects: [handleLocalStorage({ key })],
    key,
  }),
);

export const isSettingActive = withStateKey("isSettingActive", (key) =>
  atomFamily<boolean, Setting>({
    default: (setting) => SETTINGS[setting].isActive,
    effects: (setting) => [handleLocalStorage({ isSetting: true, key, parameter: setting })],
    key,
  }),
);
