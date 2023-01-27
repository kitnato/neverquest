import { atom, selector } from "recoil";

import { LABEL_UNKNOWN } from "@neverquest/constants";
import { handleLocalStorage } from "@neverquest/state/effects/handleLocalStorage";
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
  effects: [handleLocalStorage<number>(StorageKey.AttackDuration)],
  key: StorageKey.AttackDuration,
});

export const characterLevel = atom({
  default: 0,
  effects: [handleLocalStorage<number>(StorageKey.CharacterLevel)],
  key: StorageKey.CharacterLevel,
});

export const isAttacking = atom({
  default: false,
  effects: [handleLocalStorage<boolean>(StorageKey.IsAttacking)],
  key: StorageKey.IsAttacking,
});

export const healthRegenerationDuration = atom({
  default: 0,
  effects: [handleLocalStorage<number>(StorageKey.HealthRegenerationDuration)],
  key: StorageKey.HealthRegenerationDuration,
});

export const lootingDuration = atom({
  default: 0,
  effects: [handleLocalStorage<number>(StorageKey.LootingDuration)],
  key: StorageKey.LootingDuration,
});

export const lootingRate = atom({
  default: 2500,
  effects: [handleLocalStorage<number>(StorageKey.LootingRate)],
  key: StorageKey.LootingRate,
});

export const name = atom({
  default: LABEL_UNKNOWN,
  effects: [handleLocalStorage<string>(StorageKey.Name)],
  key: StorageKey.Name,
});

export const poisonDuration = atom({
  default: 0,
  effects: [handleLocalStorage<number>(StorageKey.PoisonDuration)],
  key: StorageKey.PoisonDuration,
});

export const recoveryDuration = atom({
  default: 0,
  effects: [handleLocalStorage<number>(StorageKey.RecoveryDuration)],
  key: StorageKey.RecoveryDuration,
});

export const staminaRegenerationDuration = atom({
  default: 0,
  effects: [handleLocalStorage<number>(StorageKey.StaminaRegenerationDuration)],
  key: StorageKey.StaminaRegenerationDuration,
});

export const statusElement = atom<HTMLDivElement | null>({
  default: null,
  effects: [handleLocalStorage<HTMLDivElement | null>(StorageKey.StatusElement)],
  key: StorageKey.StatusElement,
});
