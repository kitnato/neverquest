import { atom, selector } from "recoil";

import { health, stamina } from "neverquest/state/attributes";
import { shield, weapon } from "neverquest/state/inventory";

// SELECTORS

export const canAttack = selector({
  key: "canAttack",
  get: ({ get }) => {
    const currentStaminaValue = get(currentStamina);
    const { staminaCost } = get(weapon);

    return currentStaminaValue >= staminaCost;
  },
});

export const canBlock = selector({
  key: "canBlock",
  get: ({ get }) => {
    const currentStaminaValue = get(currentStamina);
    const { staminaCost } = get(shield);

    return currentStaminaValue >= staminaCost;
  },
});

export const isHealthMaxedOut = selector({
  key: "isHealthMaxedOut",
  get: ({ get }) => {
    const currentHealthValue = get(currentHealth);
    const maximumHealthValue = get(maximumHealth);

    return currentHealthValue >= maximumHealthValue;
  },
});

export const isStaminaMaxedOut = selector({
  key: "isStaminaMaxedOut",
  get: ({ get }) => {
    const currentStaminaValue = get(currentStamina);
    const maximumStaminaValue = get(maximumStamina);

    return currentStaminaValue >= maximumStaminaValue;
  },
});

export const maximumHealth = selector({
  key: "maximumHealth",
  get: ({ get }) => {
    const healthValue = get(health);

    const { base, increment, points } = healthValue;

    return base + increment * points;
  },
});

export const maximumStamina = selector({
  key: "maximumStamina",
  get: ({ get }) => {
    const staminaValue = get(stamina);

    const { base, increment, points } = staminaValue;

    return base + increment * points;
  },
});

// ATOMS

export const currentHealth = atom({
  key: "currentHealth",
  default: maximumHealth,
});

export const currentStamina = atom({
  key: "currentStamina",
  default: maximumStamina,
});
