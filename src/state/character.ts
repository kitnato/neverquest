import { atom, selector } from "recoil";

import { LABEL_UNKNOWN } from "@neverquest/constants";
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
  effects: [localStorage<number>(StorageKey.AttackDuration)],
  key: StorageKey.AttackDuration,
});

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

export const healthRegenerationDuration = atom({
  default: 0,
  effects: [localStorage<number>(StorageKey.HealthRegenerationDuration)],
  key: StorageKey.HealthRegenerationDuration,
});

export const lootingDuration = atom({
  default: 0,
  effects: [localStorage<number>(StorageKey.LootingDuration)],
  key: StorageKey.LootingDuration,
});

export const lootingRate = atom({
  default: 2500,
  effects: [localStorage<number>(StorageKey.LootingRate)],
  key: StorageKey.LootingRate,
});

export const name = atom({
  default: LABEL_UNKNOWN,
  effects: [localStorage<string>(StorageKey.Name)],
  key: StorageKey.Name,
});

export const poisonDuration = atom({
  default: 0,
  effects: [localStorage<number>(StorageKey.PoisonDuration)],
  key: StorageKey.PoisonDuration,
});

export const recoveryDuration = atom({
  default: 0,
  effects: [localStorage<number>(StorageKey.RecoveryDuration)],
  key: StorageKey.RecoveryDuration,
});

export const staminaRegenerationDuration = atom({
  default: 0,
  effects: [localStorage<number>(StorageKey.StaminaRegenerationDuration)],
  key: StorageKey.StaminaRegenerationDuration,
});

export const statusElement = atom<HTMLDivElement | null>({
  default: null,
  effects: [localStorage<HTMLDivElement | null>(StorageKey.StatusElement)],
  key: StorageKey.StatusElement,
});
