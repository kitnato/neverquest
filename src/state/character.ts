import { atom, selector } from "recoil";

import { UNKNOWN } from "@neverquest/constants";
import { localStorageEffect } from "@neverquest/state/effects";
import { StorageKey } from "@neverquest/types/enums";
import { getTriangularNumber } from "@neverquest/utilities/helpers";

// ATOMS

export const characterLevel = atom({
  default: 0,
  effects: [localStorageEffect<number>(StorageKey.CharacterLevel)],
  key: StorageKey.CharacterLevel,
});

export const hasKnapsack = atom({
  default: false,
  effects: [localStorageEffect<boolean>(StorageKey.HasKnapsack)],
  key: StorageKey.HasKnapsack,
});

export const isAttacking = atom({
  default: false,
  effects: [localStorageEffect<boolean>(StorageKey.IsAttacking)],
  key: StorageKey.IsAttacking,
});

export const isLooting = atom({
  default: false,
  effects: [localStorageEffect<boolean>(StorageKey.IsLooting)],
  key: StorageKey.IsLooting,
});

export const isRecovering = atom({
  default: false,
  effects: [localStorageEffect<boolean>(StorageKey.IsRecovering)],
  key: StorageKey.IsRecovering,
});

export const lootingRate = atom({
  default: 2500,
  effects: [localStorageEffect<number>(StorageKey.LootingRate)],
  key: StorageKey.LootingRate,
});

export const name = atom({
  default: UNKNOWN,
  effects: [localStorageEffect<string>(StorageKey.Name)],
  key: StorageKey.Name,
});

export const statusElement = atom<HTMLDivElement | null>({
  default: null,
  effects: [localStorageEffect<HTMLDivElement | null>(StorageKey.StatusElement)],
  key: StorageKey.StatusElement,
});

// SELECTORS

export const essenceAbsorbed = selector({
  key: "essenceAbsorbed",
  get: ({ get }) => {
    let total = 0;

    for (let i = 0; i <= get(characterLevel); i++) {
      total += getTriangularNumber(i);
    }

    return total;
  },
});
