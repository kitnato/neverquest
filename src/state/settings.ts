import { atom } from "recoil";

import { handleLocalStorage, withStateKey } from "@neverquest/state";

// ATOMS

export const allowNSFW = withStateKey("allowNSFW", (key) =>
  atom({
    default: false,
    effects: [handleLocalStorage<boolean>({ isSetting: true, key })],
    key,
  }),
);

export const autoEquip = withStateKey("autoEquip", (key) =>
  atom({
    default: true,
    effects: [handleLocalStorage<boolean>({ isSetting: true, key })],
    key,
  }),
);

export const confirmationWarnings = withStateKey("confirmationWarnings", (key) =>
  atom({
    default: true,
    effects: [handleLocalStorage<boolean>({ isSetting: true, key })],
    key,
  }),
);

export const lowHealthWarning = withStateKey("lowHealthWarning", (key) =>
  atom({
    default: true,
    effects: [handleLocalStorage<boolean>({ isSetting: true, key })],
    key,
  }),
);

export const showDamagePerSecond = withStateKey("showDamagePerSecond", (key) =>
  atom({
    default: false,
    effects: [handleLocalStorage<boolean>({ isSetting: true, key })],
    key,
  }),
);

export const showGearComparison = withStateKey("showGearComparison", (key) =>
  atom({
    default: true,
    effects: [handleLocalStorage<boolean>({ isSetting: true, key })],
    key,
  }),
);

export const showGearLevel = withStateKey("showGearLevel", (key) =>
  atom({
    default: false,
    effects: [handleLocalStorage<boolean>({ isSetting: true, key })],
    key,
  }),
);
