import { atom, atomFamily, selector, selectorFamily } from "recoil";

import { ATTRIBUTES } from "@neverquest/data/attributes";
import { BLIGHT } from "@neverquest/data/monster";
import { HEALTH_LOW_THRESHOLD, RESERVES } from "@neverquest/data/reserves";
import { handleLocalStorage, withStateKey } from "@neverquest/state";
import { attributes } from "@neverquest/state/attributes";
import { monsterPoisonLength, monsterPoisonMagnitude } from "@neverquest/state/monster";
import {
  powerBonus,
  reserveRegenerationAmount,
  reserveRegenerationRate,
} from "@neverquest/state/statistics";
import type { BlightMagnitude } from "@neverquest/types";
import type { Reserve } from "@neverquest/types/unions";
import { getComputedStatistic } from "@neverquest/utilities/getters";

// SELECTORS

export const blightAmount = withStateKey("blightAmount", (key) =>
  selector({
    get: ({ get }) => Math.round(BLIGHT.increment * get(staminaMaximum)),
    key,
  }),
);

export const blightMagnitude = withStateKey("blightMagnitude", (key) =>
  selector<BlightMagnitude>({
    get: ({ get }) => {
      const blightValue = get(blight);

      return {
        amount: blightValue * get(blightAmount),
        percentage: blightValue * BLIGHT.increment,
      };
    },
    key,
  }),
);

export const healthMaximum = withStateKey("healthMaximum", (key) =>
  selector({
    get: ({ get }) => {
      const { base, increment } = ATTRIBUTES.vitality;
      const { points } = get(attributes("vitality"));
      const total = getComputedStatistic({ amount: points, base, increment });

      return Math.round(total + total * get(powerBonus("vitality")));
    },
    key,
  }),
);

export const healthMaximumTotal = withStateKey("healthMaximumTotal", (key) =>
  selector({
    get: ({ get }) => {
      const newMaximum =
        get(healthMaximum) -
        Math.round(
          get(healthMaximum) *
            get(monsterPoisonMagnitude) *
            (get(poisonDuration) / get(monsterPoisonLength)),
        );

      if (newMaximum < 0) {
        return 0;
      }

      return newMaximum;
    },
    key,
  }),
);

export const regenerationAmount = withStateKey("regenerationAmount", (key) =>
  selectorFamily<number, Reserve>({
    get:
      (parameter) =>
      ({ get }) =>
        RESERVES[parameter].baseRegenerationAmount + get(reserveRegenerationAmount),
    key,
  }),
);

export const regenerationRate = withStateKey("regenerationRate", (key) =>
  selectorFamily<number, Reserve>({
    get:
      (parameter) =>
      ({ get }) => {
        const { baseRegenerationRate } = RESERVES[parameter];

        return Math.round(
          baseRegenerationRate - baseRegenerationRate * get(reserveRegenerationRate),
        );
      },
    key,
  }),
);

export const isBlighted = withStateKey("isBlighted", (key) =>
  selector({
    get: ({ get }) => get(blight) > 0,
    key,
  }),
);

export const isHealthAtMaximum = withStateKey("isHealthAtMaximum", (key) =>
  selector({
    get: ({ get }) => get(health) >= get(healthMaximumTotal),
    key,
  }),
);

export const isHealthLow = withStateKey("isHealthLow", (key) =>
  selector({
    get: ({ get }) => get(health) <= get(healthMaximumTotal) * HEALTH_LOW_THRESHOLD,
    key,
  }),
);

export const isPoisoned = withStateKey("isPoisoned", (key) =>
  selector({
    get: ({ get }) => get(poisonDuration) > 0,
    key,
  }),
);

export const isStaminaAtMaximum = withStateKey("isStaminaAtMaximum", (key) =>
  selector({
    get: ({ get }) => get(stamina) >= get(staminaMaximumTotal),
    key,
  }),
);

export const staminaMaximum = withStateKey("staminaMaximum", (key) =>
  selector({
    get: ({ get }) => {
      const { base, increment } = ATTRIBUTES.endurance;
      const { points } = get(attributes("endurance"));
      const total = getComputedStatistic({ amount: points, base, increment });

      return Math.round(total + total * get(powerBonus("endurance")));
    },
    key,
  }),
);

export const staminaMaximumTotal = withStateKey("staminaMaximumTotal", (key) =>
  selector({
    get: ({ get }) => {
      const newMaximum = get(staminaMaximum) - get(blightMagnitude).amount;

      if (newMaximum < 0) {
        return 0;
      }

      return newMaximum;
    },
    key,
  }),
);

// ATOMS

export const blight = withStateKey("blight", (key) =>
  atom({
    default: 0,
    effects: [handleLocalStorage<number>({ key })],
    key,
  }),
);

export const health = withStateKey("health", (key) =>
  atom({
    default: healthMaximumTotal,
    effects: [handleLocalStorage<number>({ key })],
    key,
  }),
);

export const regenerationDuration = withStateKey("regenerationDuration", (key) =>
  atomFamily<number, Reserve>({
    default: 0,
    effects: (parameter) => [handleLocalStorage<number>({ key, parameter })],
    key,
  }),
);

export const isImmortal = withStateKey("isImmortal", (key) =>
  atom({
    default: false,
    effects: [handleLocalStorage<boolean>({ key })],
    key,
  }),
);

export const poisonDuration = withStateKey("poisonDuration", (key) =>
  atom({
    default: 0,
    effects: [handleLocalStorage<number>({ key })],
    key,
  }),
);

export const stamina = withStateKey("stamina", (key) =>
  atom({
    default: staminaMaximumTotal,
    effects: [handleLocalStorage<number>({ key })],
    key,
  }),
);
