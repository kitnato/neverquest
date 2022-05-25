import { atom } from "jotai";

import { health, stamina } from "neverquest/state/attributes";
import { shield, weapon } from "neverquest/state/inventory";

// PRIMITIVES

export const currentHealth = atom(-1);

export const currentStamina = atom(-1);

// READERS

export const canAttack = atom((get) => {
  const currentStaminaValue = get(currentStamina);
  const { staminaCost } = get(weapon);

  return currentStaminaValue >= staminaCost;
});

export const canBlock = atom((get) => {
  const currentStaminaValue = get(currentStamina);
  const { staminaCost } = get(shield);

  return currentStaminaValue >= staminaCost;
});

export const isHealthMaxedOut = atom((get) => {
  const currentHealthValue = get(currentHealth);
  const maximumHealthValue = get(maximumHealth);

  return currentHealthValue >= maximumHealthValue;
});

export const isStaminaMaxedOut = atom((get) => {
  const currentStaminaValue = get(currentStamina);
  const maximumStaminaValue = get(maximumStamina);

  return currentStaminaValue >= maximumStaminaValue;
});

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

export const initializeReserves = atom(null, (get, set) => {
  set(currentHealth, get(maximumHealth));
  set(currentStamina, get(maximumStamina));
});
