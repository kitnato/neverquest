import { atom, selector } from "recoil";

import { ATTRIBUTES } from "@neverquest/constants/attributes";
import { attributes } from "@neverquest/state/attributes";
import { localStorageEffect } from "@neverquest/state/effects";
import { shield, weapon } from "@neverquest/state/inventory";
import { AttributeType, StorageKey } from "@neverquest/types/enums";

// ATOMS

export const currentHealth = atom({
  default: 0,
  effects: [localStorageEffect<number>(StorageKey.CurrentHealth)],
  key: StorageKey.CurrentHealth,
});

export const currentStamina = atom({
  default: 0,
  effects: [localStorageEffect<number>(StorageKey.CurrentStamina)],
  key: StorageKey.CurrentStamina,
});

// SELECTORS

export const canAttack = selector({
  key: "canAttack",
  get: ({ get }) => get(currentStamina) >= get(weapon).staminaCost,
});

export const canBlock = selector({
  key: "canBlock",
  get: ({ get }) => get(currentStamina) >= get(shield).staminaCost,
});

export const isHealthLow = selector({
  key: "isHealthLow",
  get: ({ get }) => get(currentHealth) <= Math.ceil(get(maximumHealth) * 0.33),
});

export const isHealthMaxedOut = selector({
  key: "isHealthMaxedOut",
  get: ({ get }) => get(currentHealth) >= get(maximumHealth),
});

export const isStaminaMaxedOut = selector({
  key: "isStaminaMaxedOut",
  get: ({ get }) => get(currentStamina) >= get(maximumStamina),
});

export const maximumHealth = selector({
  key: "maximumHealth",
  get: ({ get }) => {
    const { points } = get(attributes(AttributeType.Health));

    const { base, increment } = ATTRIBUTES[AttributeType.Health];

    return base + increment * points;
  },
});

export const maximumStamina = selector({
  key: "maximumStamina",
  get: ({ get }) => {
    const { points } = get(attributes(AttributeType.Stamina));

    const { base, increment } = ATTRIBUTES[AttributeType.Stamina];

    return base + increment * points;
  },
});
