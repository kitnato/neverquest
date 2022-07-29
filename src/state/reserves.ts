import { atom } from "jotai";
import { atomWithReset } from "jotai/utils";

import { attributes } from "@neverquest/state/attributes";
import { deltaHealth, deltaStamina } from "@neverquest/state/deltas";
import { gameOver } from "@neverquest/state/global";
import { shield, weapon } from "@neverquest/state/inventory";
import { AttributeType } from "@neverquest/types/enums";
import { DeltaDisplay, FloatingTextType } from "@neverquest/types/ui";
import { ATTRIBUTES } from "@neverquest/utilities/constants-attributes";

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
  const { points } = get(attributes)[AttributeType.Health];

  const { base, increment } = ATTRIBUTES[AttributeType.Health];

  return base + increment * points;
});

export const maximumStamina = atom((get) => {
  const { points } = get(attributes)[AttributeType.Stamina];

  const { base, increment } = ATTRIBUTES[AttributeType.Stamina];

  return base + increment * points;
});

// WRITERS

export const healthChange = atom(
  null,
  (get, set, change: number | { delta: number; deltaContents: DeltaDisplay }) => {
    const max = get(maximumHealth);
    const isSimpleDelta = typeof change === "number";
    const healthChange = isSimpleDelta ? change : change.delta;

    let newHealth = get(currentHealth) + healthChange;

    if (isSimpleDelta) {
      const isPositive = healthChange > 0;

      set(deltaHealth, {
        color: isPositive ? FloatingTextType.Positive : FloatingTextType.Negative,
        value: `${isPositive ? `+${healthChange}` : healthChange}`,
      });
    } else {
      set(deltaHealth, change.deltaContents);
    }

    if (newHealth <= 0) {
      newHealth = 0;
      set(gameOver, true);
    }

    if (newHealth > max) {
      newHealth = max;
    }

    set(currentHealth, newHealth);
  }
);

export const staminaChange = atom(null, (get, set, delta: number) => {
  const max = get(maximumStamina);
  let newStamina = get(currentStamina) + delta;

  set(deltaStamina, {
    color: delta > 0 ? FloatingTextType.Positive : FloatingTextType.Negative,
    value: `${delta > 0 ? `+${delta}` : delta}`,
  });

  if (newStamina < 0) {
    newStamina = 0;
  }

  if (newStamina > max) {
    newStamina = max;
  }

  set(currentStamina, newStamina);
});
