import { atom } from "recoil";

import { handleLocalStorage, withStateKey } from "@neverquest/state";

// ATOMS

export const allowNSFW = withStateKey("allowNSFW", (key) =>
  atom({
    default: true,
    effects: [handleLocalStorage<boolean>({ isSetting: true, key })],
    key,
  })
);

export const autoEquip = withStateKey("autoEquip", (key) =>
  atom({
    default: true,
    effects: [handleLocalStorage<boolean>({ isSetting: true, key })],
    key,
  })
);

export const confirmControlWarnings = withStateKey("confirmControlWarnings", (key) =>
  atom({
    default: true,
    effects: [handleLocalStorage<boolean>({ isSetting: true, key })],
    key,
  })
);

export const isShowingDamagePerSecond = withStateKey("isShowingDamagePerSecond", (key) =>
  atom({
    default: false,
    effects: [handleLocalStorage<boolean>({ isSetting: true, key })],
    key,
  })
);

export const isShowingGearComparisons = withStateKey("isShowingGearComparisons", (key) =>
  atom({
    default: true,
    effects: [handleLocalStorage<boolean>({ isSetting: true, key })],
    key,
  })
);

export const isShowingGearLevel = withStateKey("isShowingGearLevel", (key) =>
  atom({
    default: false,
    effects: [handleLocalStorage<boolean>({ isSetting: true, key })],
    key,
  })
);

export const lowHealthWarning = withStateKey("lowHealthWarning", (key) =>
  atom({
    default: true,
    effects: [handleLocalStorage<boolean>({ isSetting: true, key })],
    key,
  })
);
