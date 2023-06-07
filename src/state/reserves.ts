import { atom, selector } from "recoil";

import { ATTRIBUTES } from "@neverquest/data/attributes";
import { handleLocalStorage, withStateKey } from "@neverquest/state";
import { attributes } from "@neverquest/state/attributes";
import { armor, shield, weapon } from "@neverquest/state/inventory";

// SELECTORS

export const canAttackOrParry = withStateKey("canAttackOrParry", (key) =>
  selector({
    get: ({ get }) => get(staminaCurrent) >= get(weapon).staminaCost,
    key,
  })
);

export const canBlock = withStateKey("canBlock", (key) =>
  selector({
    get: ({ get }) => get(staminaCurrent) >= get(shield).staminaCost,
    key,
  })
);

export const canDodge = withStateKey("canDodge", (key) =>
  selector({
    get: ({ get }) => get(staminaCurrent) >= get(armor).staminaCost,
    key,
  })
);

export const healthMaximum = withStateKey("healthMaximum", (key) =>
  selector({
    get: ({ get }) => {
      const { points } = get(attributes("vitality"));

      const { base, increment } = ATTRIBUTES.vitality;

      return base + increment * points;
    },
    key,
  })
);

export const isHealthAtMaximum = withStateKey("isHealthAtMaximum", (key) =>
  selector({
    get: ({ get }) => get(healthCurrent) >= get(healthMaximum),
    key,
  })
);

export const isHealthLow = withStateKey("isHealthLow", (key) =>
  selector({
    get: ({ get }) => get(healthCurrent) <= Math.round(get(healthMaximum) * 0.33),
    key,
  })
);

export const isStaminaAtMaximum = withStateKey("isStaminaAtMaximum", (key) =>
  selector({
    get: ({ get }) => get(staminaCurrent) >= get(staminaMaximumTotal),
    key,
  })
);

export const staminaMaximum = withStateKey("staminaMaximum", (key) =>
  selector({
    get: ({ get }) => {
      const { points } = get(attributes("endurance"));

      const { base, increment } = ATTRIBUTES.endurance;

      return base + increment * points;
    },
    key,
  })
);

export const staminaMaximumTotal = withStateKey("staminaMaximumTotal", (key) =>
  selector({
    get: ({ get }) => {
      const newMaximum = get(staminaMaximum) - get(blight);

      if (newMaximum < 0) {
        return 0;
      }

      return newMaximum;
    },
    key,
  })
);

// ATOMS

export const blight = withStateKey("blight", (key) =>
  atom({
    default: 0,
    effects: [handleLocalStorage<number>({ key })],
    key,
  })
);

export const healthCurrent = withStateKey("healthCurrent", (key) =>
  atom({
    default: healthMaximum,
    effects: [handleLocalStorage<number>({ key })],
    key,
  })
);

export const staminaCurrent = withStateKey("staminaCurrent", (key) =>
  atom({
    default: staminaMaximum,
    effects: [handleLocalStorage<number>({ key })],
    key,
  })
);
