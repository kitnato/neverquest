import { atom, selector } from "recoil";

import { ATTRIBUTES } from "@neverquest/data/attributes";
import { attributes } from "@neverquest/state/attributes";
import { handleLocalStorage } from "@neverquest/state/effects/handleLocalStorage";
import { armor, shield, weapon } from "@neverquest/state/inventory";
import { AttributeType, StorageKey } from "@neverquest/types/enums";

// SELECTORS

export const canAttackOrParry = selector({
  get: ({ get }) => get(currentStamina) >= get(weapon).staminaCost,
  key: "canAttackOrParry",
});

export const canBlock = selector({
  get: ({ get }) => get(currentStamina) >= get(shield).staminaCost,
  key: "canBlock",
});

export const canDodge = selector({
  get: ({ get }) => get(currentStamina) >= (get(armor).staminaCost || 0),
  key: "canDodge",
});

export const isHealthLow = selector({
  get: ({ get }) => get(currentHealth) <= Math.ceil(get(maximumHealth) * 0.33),
  key: "isHealthLow",
});

export const isHealthAtMaximum = selector({
  get: ({ get }) => get(currentHealth) >= get(maximumHealth),
  key: "isHealthAtMaximum",
});

export const isStaminaAtMaximum = selector({
  get: ({ get }) => get(currentStamina) >= get(maximumStamina),
  key: "isStaminaAtMaximum",
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

// ATOMS

export const currentHealth = atom({
  default: maximumHealth,
  effects: [handleLocalStorage<number>(StorageKey.CurrentHealth)],
  key: StorageKey.CurrentHealth,
});

export const currentStamina = atom({
  default: maximumStamina,
  effects: [handleLocalStorage<number>(StorageKey.CurrentStamina)],
  key: StorageKey.CurrentStamina,
});
