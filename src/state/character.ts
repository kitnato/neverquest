import { atom, selector } from "recoil";

import { LABEL_UNKNOWN } from "@neverquest/data/constants";
import { handleLocalStorage } from "@neverquest/state/effects/handleLocalStorage";
import { maximumStamina, staminaDebuff } from "@neverquest/state/reserves";

// SELECTORS

export const isBlighted = selector({
  get: ({ get }) => get(maximumStamina) === get(staminaDebuff),
  key: "isBlighted",
});

export const isLooting = selector({
  get: ({ get }) => get(lootingDuration) > 0,
  key: "isLooting",
});

export const isRecovering = selector({
  get: ({ get }) => get(recoveryDuration) > 0,
  key: "isRecovering",
});

// ATOMS

export const attackDuration = atom({
  default: 0,
  effects: [handleLocalStorage<number>({ key: "attackDuration" })],
  key: "attackDuration",
});

export const isAttacking = atom({
  default: false,
  effects: [handleLocalStorage<boolean>({ key: "isAttacking" })],
  key: "isAttacking",
});

export const isGameOver = atom({
  default: false,
  effects: [handleLocalStorage<boolean>({ key: "isGameOver" })],
  key: "isGameOver",
});

export const healthRegenerationDuration = atom({
  default: 0,
  effects: [handleLocalStorage<number>({ key: "healthRegenerationDuration" })],
  key: "healthRegenerationDuration",
});

export const lootingDuration = atom({
  default: 0,
  effects: [handleLocalStorage<number>({ key: "lootingDuration" })],
  key: "lootingDuration",
});

export const lootingRate = atom({
  default: 2500,
  effects: [handleLocalStorage<number>({ key: "lootingRate" })],
  key: "lootingRate",
});

export const name = atom({
  default: LABEL_UNKNOWN,
  effects: [handleLocalStorage<string>({ key: "name" })],
  key: "name",
});

export const poisonDuration = atom({
  default: 0,
  effects: [handleLocalStorage<number>({ key: "poisonDuration" })],
  key: "poisonDuration",
});

export const recoveryDuration = atom({
  default: 0,
  effects: [handleLocalStorage<number>({ key: "recoveryDuration" })],
  key: "recoveryDuration",
});

export const staminaRegenerationDuration = atom({
  default: 0,
  effects: [handleLocalStorage<number>({ key: "staminaRegenerationDuration" })],
  key: "staminaRegenerationDuration",
});

export const statusElement = atom<HTMLDivElement | null>({
  default: null,
  effects: [handleLocalStorage<HTMLDivElement | null>({ key: "statusElement" })],
  key: "statusElement",
});
