import { atom, selector } from "recoil";

import { health, stamina } from "state/attributes";

// SELECTORS

export const maxHealth = selector({
  key: "maxHealth",
  get: ({ get }) => {
    const healthValue = get(health);

    const { base, increment, points } = healthValue;

    return base + increment * points;
  },
});

export const maxStamina = selector({
  key: "maxStamina",
  get: ({ get }) => {
    const staminaValue = get(stamina);

    const { base, increment, points } = staminaValue;

    return base + increment * points;
  },
});

// ATOMS

export const currentHealth = atom({
  key: "currentHealth",
  default: maxHealth,
});

export const currentStamina = atom({
  key: "currentStamina",
  default: maxStamina,
});
