import { atom } from "jotai";
import { atomWithReset } from "jotai/utils";

import { health, stamina } from "neverquest/state/attributes";
import { deltaStamina } from "neverquest/state/deltas";
import { gameOver } from "neverquest/state/global";
import { shield, weapon } from "neverquest/state/inventory";
import { FloatingTextType } from "neverquest/types/ui";

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
  const { base, increment, points } = get(health);

  return base + increment * points;
});

export const maximumStamina = atom((get) => {
  const { base, increment, points } = get(stamina);

  return base + increment * points;
});

// WRITERS

export const healthChange = atom(null, (get, set, delta: number) => {
  const max = get(maximumHealth);
  let newHealth = get(currentHealth) + delta;

  if (newHealth <= 0) {
    newHealth = 0;
    set(gameOver, true);
  }

  if (newHealth > max) {
    newHealth = max;
  }

  set(currentHealth, newHealth);
});

export const staminaChange = atom(null, (get, set, delta: number) => {
  const max = get(maximumStamina);
  let newStamina = get(currentStamina) + delta;

  set(deltaStamina, {
    color: FloatingTextType.Negative,
    value: `${delta > 0 ? delta : -delta}`,
  });

  if (newStamina < 0) {
    newStamina = 0;
  }

  if (newStamina > max) {
    newStamina = max;
  }

  set(currentStamina, newStamina);
});

export const reservesInitial = atom(null, (get, set) => {
  set(currentHealth, get(maximumHealth));
  set(currentStamina, get(maximumStamina));
});
