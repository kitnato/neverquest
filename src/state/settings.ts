import { atom } from "recoil";

import { handleLocalStorage } from "@neverquest/state/effects/handleLocalStorage";

// ATOMS

export const autoEquip = atom({
  default: true,
  effects: [handleLocalStorage<boolean>({ isSetting: true, key: "autoEquip" })],
  key: "autoEquip",
});

// TODO - move.
export const isGameOver = atom({
  default: false,
  effects: [handleLocalStorage<boolean>({ key: "isGameOver" })],
  key: "isGameOver",
});

export const isNSFW = atom({
  default: true,
  effects: [handleLocalStorage<boolean>({ isSetting: true, key: "isNSFW" })],
  key: "isNSFW",
});

export const isShowingDamagePerSecond = atom({
  default: false,
  effects: [handleLocalStorage<boolean>({ isSetting: true, key: "isShowingDamagePerSecond" })],
  key: "isShowingDamagePerSecond",
});

export const lowHealthWarning = atom({
  default: true,
  effects: [handleLocalStorage<boolean>({ isSetting: true, key: "lowHealthWarning" })],
  key: "lowHealthWarning",
});
