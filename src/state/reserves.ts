import { atom, selector } from "recoil";

import { ATTRIBUTES } from "@neverquest/data/attributes";
import { handleLocalStorage, withStateKey } from "@neverquest/state";
import { attributes } from "@neverquest/state/attributes";
import { armor, shield, weapon } from "@neverquest/state/inventory";
import { Attribute } from "@neverquest/types/enums";

// SELECTORS

export const canAttackOrParry = withStateKey("canAttackOrParry", (key) =>
  selector({
    get: ({ get }) => get(currentStamina) >= get(weapon).staminaCost,
    key,
  })
);

export const canBlock = withStateKey("canBlock", (key) =>
  selector({
    get: ({ get }) => get(currentStamina) >= get(shield).staminaCost,
    key,
  })
);

export const canDodge = withStateKey("canDodge", (key) =>
  selector({
    get: ({ get }) => get(currentStamina) >= get(armor).staminaCost,
    key,
  })
);

export const isHealthAtMaximum = withStateKey("isHealthAtMaximum", (key) =>
  selector({
    get: ({ get }) => get(currentHealth) >= get(maximumHealth),
    key,
  })
);

export const isHealthLow = withStateKey("isHealthLow", (key) =>
  selector({
    get: ({ get }) => get(currentHealth) <= Math.round(get(maximumHealth) * 0.33),
    key,
  })
);

export const isStaminaAtMaximum = withStateKey("isStaminaAtMaximum", (key) =>
  selector({
    get: ({ get }) => get(currentStamina) >= get(maximumStaminaTotal),
    key,
  })
);

export const maximumHealth = withStateKey("maximumHealth", (key) =>
  selector({
    get: ({ get }) => {
      const { points } = get(attributes(Attribute.Vitality));

      const { base, increment } = ATTRIBUTES[Attribute.Vitality];

      return base + increment * points;
    },
    key,
  })
);

export const maximumStamina = withStateKey("maximumStamina", (key) =>
  selector({
    get: ({ get }) => {
      const { points } = get(attributes(Attribute.Endurance));

      const { base, increment } = ATTRIBUTES[Attribute.Endurance];

      return base + increment * points;
    },
    key,
  })
);

export const maximumStaminaTotal = withStateKey("maximumStaminaTotal", (key) =>
  selector({
    get: ({ get }) => {
      const newMaximum = get(maximumStamina) - get(staminaDebuff);

      if (newMaximum < 0) {
        return 0;
      }

      return newMaximum;
    },
    key,
  })
);

// ATOMS

export const currentHealth = withStateKey("currentHealth", (key) =>
  atom({
    default: maximumHealth,
    effects: [handleLocalStorage<number>({ key })],
    key,
  })
);

export const currentStamina = withStateKey("currentStamina", (key) =>
  atom({
    default: maximumStamina,
    effects: [handleLocalStorage<number>({ key })],
    key,
  })
);

export const staminaDebuff = withStateKey("staminaDebuff", (key) =>
  atom({
    default: 0,
    effects: [handleLocalStorage<number>({ key })],
    key,
  })
);
