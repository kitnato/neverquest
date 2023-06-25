import { atom, selector } from "recoil";

import { ATTRIBUTES } from "@neverquest/data/attributes";
import { BLIGHT } from "@neverquest/data/monster";
import { handleLocalStorage, withStateKey } from "@neverquest/state";
import { attributes } from "@neverquest/state/attributes";
import { monsterPoisonDuration, monsterPoisonMagnitude } from "@neverquest/state/monster";

// SELECTORS

export const blightIncrement = withStateKey("blightIncrement", (key) =>
  selector({
    get: ({ get }) => Math.round(BLIGHT.increment * get(staminaMaximum)),
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

export const healthMaximumTotal = withStateKey("healthMaximumTotal", (key) =>
  selector({
    get: ({ get }) => {
      const newMaximum =
        get(healthMaximum) -
        Math.round(
          get(healthMaximum) *
            get(monsterPoisonMagnitude) *
            (get(poisonDuration) / get(monsterPoisonDuration))
        );

      if (newMaximum < 0) {
        return 0;
      }

      return newMaximum;
    },
    key,
  })
);

export const isHealthAtMaximum = withStateKey("isHealthAtMaximum", (key) =>
  selector({
    get: ({ get }) => get(health) >= get(healthMaximumTotal),
    key,
  })
);

export const isHealthLow = withStateKey("isHealthLow", (key) =>
  selector({
    get: ({ get }) => get(health) <= Math.round(get(healthMaximumTotal) * 0.33),
    key,
  })
);

export const isStaminaAtMaximum = withStateKey("isStaminaAtMaximum", (key) =>
  selector({
    get: ({ get }) => get(stamina) >= get(staminaMaximumTotal),
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
      const newMaximum = get(staminaMaximum) - get(blight) * get(blightIncrement);

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

export const health = withStateKey("health", (key) =>
  atom({
    default: healthMaximum,
    effects: [handleLocalStorage<number>({ key })],
    key,
  })
);

export const healthRegenerationDuration = withStateKey("healthRegenerationDuration", (key) =>
  atom({
    default: 0,
    effects: [handleLocalStorage<number>({ key })],
    key,
  })
);

export const poisonDuration = withStateKey("poisonDuration", (key) =>
  atom({
    default: 0,
    effects: [handleLocalStorage<number>({ key })],
    key,
  })
);

export const stamina = withStateKey("stamina", (key) =>
  atom({
    default: staminaMaximum,
    effects: [handleLocalStorage<number>({ key })],
    key,
  })
);

export const staminaRegenerationDuration = withStateKey("staminaRegenerationDuration", (key) =>
  atom({
    default: 0,
    effects: [handleLocalStorage<number>({ key })],
    key,
  })
);
