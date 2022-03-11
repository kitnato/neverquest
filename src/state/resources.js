import { atom, selector } from "recoil";

import { health, stamina } from "state/attributes";

// SELECTORS

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

export const deltaHealth = atom({
  key: "deltaHealth",
  default: null,
});

export const deltaStamina = atom({
  key: "deltaStamina",
  default: null,
});
