import { atom } from "jotai";
import { atomWithReset } from "jotai/utils";

import { health, stamina } from "neverquest/state/attributes";
import { shield, weapon } from "neverquest/state/inventory";

// PRIMITIVES

export const currentHealth = atomWithReset(0);

export const currentStamina = atomWithReset(0);

// READERS

export const canAttack = atom((get) => get(currentStamina) >= get(weapon).staminaCost);

export const canBlock = atom((get) => get(currentStamina) >= get(shield).staminaCost);

export const isHealthLow = atom(
  (get) => get(currentHealth) <= Math.ceil(get(maximumHealth) * 0.33)
);

export const isHealthMaxedOut = atom((get) => get(currentHealth) >= get(maximumHealth));

export const isStaminaMaxedOut = atom((get) => get(currentStamina) >= get(maximumStamina));

export const maximumHealth = atom((get) => {
  const healthValue = get(health);

  const { base, increment, points } = healthValue;

  return base + increment * points;
});

export const maximumStamina = atom((get) => {
  const staminaValue = get(stamina);

  const { base, increment, points } = staminaValue;

  return base + increment * points;
});

// WRITERS

export const reservesInitial = atom(null, (get, set) => {
  set(currentHealth, get(maximumHealth));
  set(currentStamina, get(maximumStamina));
});
