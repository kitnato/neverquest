import { atom } from "recoil";

import { handleLocalStorage } from "@neverquest/state/effects/handleLocalStorage";

// ATOMS

export const autoEquip = atom({
  default: true,
  effects: [handleLocalStorage<boolean>({ isSetting: true, key: "autoEquip" })],
  key: "autoEquip",
});

export const confirmControlWarnings = atom({
  default: true,
  effects: [handleLocalStorage<boolean>({ isSetting: true, key: "confirmControlWarnings" })],
  key: "confirmControlWarnings",
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

export const isShowingGearLevel = atom({
  default: false,
  effects: [handleLocalStorage<boolean>({ isSetting: true, key: "isShowingGearLevel" })],
  key: "isShowingGearLevel",
});

export const lowHealthWarning = atom({
  default: true,
  effects: [handleLocalStorage<boolean>({ isSetting: true, key: "lowHealthWarning" })],
  key: "lowHealthWarning",
});
