import { atom } from "recoil";
import { handleLocalStorage } from "@neverquest/state/effects/handleLocalStorage";

import { withStateKey } from "@neverquest/utilities/helpers";

// ATOMS

export const allowNSFW = withStateKey("allowNSFW", (key) =>
  atom({
    default: true,
    effects: [handleLocalStorage({ isSetting: true, key })],
    key,
  }),
);

export const autoEquip = withStateKey("autoEquip", (key) =>
  atom({
    default: true,
    effects: [handleLocalStorage({ isSetting: true, key })],
    key,
  }),
);

export const lowHealthWarning = withStateKey("lowHealthWarning", (key) =>
  atom({
    default: true,
    effects: [handleLocalStorage({ isSetting: true, key })],
    key,
  }),
);

export const showDamagePerSecond = withStateKey("showDamagePerSecond", (key) =>
  atom({
    default: false,
    effects: [handleLocalStorage({ isSetting: true, key })],
    key,
  }),
);

export const showEssenceRequired = withStateKey("showEssenceRequired", (key) =>
  atom({
    default: false,
    effects: [handleLocalStorage({ isSetting: true, key })],
    key,
  }),
);

export const showGearComparison = withStateKey("showGearComparison", (key) =>
  atom({
    default: true,
    effects: [handleLocalStorage({ isSetting: true, key })],
    key,
  }),
);

export const showGearLevel = withStateKey("showGearLevel", (key) =>
  atom({
    default: false,
    effects: [handleLocalStorage({ isSetting: true, key })],
    key,
  }),
);
