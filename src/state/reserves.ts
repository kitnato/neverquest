import { atom, selector } from "recoil";

import { ATTRIBUTES } from "@neverquest/constants/attributes";
import { attributes } from "@neverquest/state/attributes";
import localStorage from "@neverquest/state/effects/localStorage";
import { shield, weapon } from "@neverquest/state/inventory";
import { AttributeType, StorageKey } from "@neverquest/types/enums";

// ATOMS

export const currentHealth = atom({
  default: 0,
  effects: [localStorage<number>(StorageKey.CurrentHealth)],
  key: StorageKey.CurrentHealth,
});

export const currentStamina = atom({
  default: 0,
  effects: [localStorage<number>(StorageKey.CurrentStamina)],
  key: StorageKey.CurrentStamina,
});

// SELECTORS

export const canAttackOrParry = selector({
  get: ({ get }) => get(currentStamina) >= get(weapon).staminaCost,
  key: "canAttackOrParry",
});

export const canBlock = selector({
  get: ({ get }) => get(currentStamina) >= get(shield).staminaCost,
  key: "canBlock",
});

export const isHealthLow = selector({
  get: ({ get }) => get(currentHealth) <= Math.ceil(get(maximumHealth) * 0.33),
  key: "isHealthLow",
});

export const isHealthMaxedOut = selector({
  get: ({ get }) => get(currentHealth) >= get(maximumHealth),
  key: "isHealthMaxedOut",
});

export const isStaminaMaxedOut = selector({
  get: ({ get }) => get(currentStamina) >= get(maximumStamina),
  key: "isStaminaMaxedOut",
});

export const maximumHealth = selector({
  get: ({ get }) => {
    const { points } = get(attributes(AttributeType.Health));

    const { base, increment } = ATTRIBUTES[AttributeType.Health];

    return base + increment * points;
  },
  key: "maximumHealth",
});

export const maximumStamina = selector({
  get: ({ get }) => {
    const { points } = get(attributes(AttributeType.Stamina));

    const { base, increment } = ATTRIBUTES[AttributeType.Stamina];

    return base + increment * points;
  },
  key: "maximumStamina",
});
