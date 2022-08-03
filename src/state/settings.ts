import { atom } from "recoil";

import { localStorageEffect } from "@neverquest/state/effects";
import { StorageKey } from "@neverquest/types/enums";

// ATOMS

export const autoEquip = atom({
  default: true,
  effects: [localStorageEffect<boolean>(StorageKey.AutoEquip, true)],
  key: StorageKey.AutoEquip,
});

// TODO - move?
export const isGameOver = atom({
  default: false,
  effects: [localStorageEffect<boolean>(StorageKey.IsGameOver)],
  key: StorageKey.IsGameOver,
});

export const isNSFW = atom({
  default: true,
  effects: [localStorageEffect<boolean>(StorageKey.NSFW, true)],
  key: StorageKey.NSFW,
});

export const isShowingDamagePerSecond = atom({
  default: false,
  effects: [localStorageEffect<boolean>(StorageKey.IsShowingDamagePerSecond, true)],
  key: StorageKey.IsShowingDamagePerSecond,
});

export const lowHealthWarning = atom({
  default: true,
  effects: [localStorageEffect<boolean>(StorageKey.LowHealthWarning, true)],
  key: StorageKey.LowHealthWarning,
});
