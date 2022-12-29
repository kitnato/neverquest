import { atom, selector } from "recoil";

import { UNKNOWN } from "@neverquest/constants";
import localStorage from "@neverquest/state/effects/localStorage";
import { StorageKey } from "@neverquest/types/enums";
import { getTriangularNumber } from "@neverquest/utilities/getters";

// SELECTORS

export const essenceAbsorbed = selector({
  get: ({ get }) => {
    let total = 0;

    for (let i = 0; i <= get(characterLevel); i++) {
      total += getTriangularNumber(i);
    }

    return total;
  },
  key: "essenceAbsorbed",
});

// ATOMS

export const characterLevel = atom({
  default: 0,
  effects: [localStorage<number>(StorageKey.CharacterLevel)],
  key: StorageKey.CharacterLevel,
});

export const isAttacking = atom({
  default: false,
  effects: [localStorage<boolean>(StorageKey.IsAttacking)],
  key: StorageKey.IsAttacking,
});

export const isLooting = atom({
  default: false,
  effects: [localStorage<boolean>(StorageKey.IsLooting)],
  key: StorageKey.IsLooting,
});

export const isRecovering = atom({
  default: false,
  effects: [localStorage<boolean>(StorageKey.IsRecovering)],
  key: StorageKey.IsRecovering,
});

export const lootingRate = atom({
  default: 2500,
  effects: [localStorage<number>(StorageKey.LootingRate)],
  key: StorageKey.LootingRate,
});

export const name = atom({
  default: UNKNOWN,
  effects: [localStorage<string>(StorageKey.Name)],
  key: StorageKey.Name,
});

export const statusElement = atom<HTMLDivElement | null>({
  default: null,
  effects: [localStorage<HTMLDivElement | null>(StorageKey.StatusElement)],
  key: StorageKey.StatusElement,
});
