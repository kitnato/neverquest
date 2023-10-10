import { atom, atomFamily, selector, selectorFamily } from "recoil";

import { ATTRIBUTES } from "@neverquest/data/attributes";
import { BLIGHT } from "@neverquest/data/monster";
import { HEALTH_LOW_THRESHOLD, RESERVES } from "@neverquest/data/reserves";
import { handleLocalStorage, withStateKey } from "@neverquest/state";
import {
  attributePowerBonus,
  attributeRank,
  attributeStatistic,
} from "@neverquest/state/attributes";
import { monsterPoisonLength, monsterPoisonMagnitude } from "@neverquest/state/monster";
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
      const attributeRankValue = get(attributeRank("vitality"));
      const total = getComputedStatistic({ amount: attributeRankValue, base, increment });

      return Math.round(total * (1 + get(attributePowerBonus("vitality"))));
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

export const isRegenerating = withStateKey("isRegenerating", (key) =>
  selectorFamily<boolean, Reserve>({
    get:
      (parameter) =>
      ({ get }) =>
        get(regenerationDuration(parameter)) > 0,
    key,
  }),
);

export const isStaminaAtMaximum = withStateKey("isStaminaAtMaximum", (key) =>
  selector({
    get: ({ get }) => get(stamina) >= get(staminaMaximumTotal),
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

export const reserveRegenerationAmount = withStateKey("reserveRegenerationAmount", (key) =>
  selector({
    get: ({ get }) =>
      Math.round(
        get(attributeStatistic("fortitude")) * (1 + get(attributePowerBonus("fortitude"))),
      ),
    key,
  }),
);

export const reserveRegenerationRate = withStateKey("reserveRegenerationRate", (key) =>
  selector({
    get: ({ get }) => get(attributeStatistic("vigor")) * (1 + get(attributePowerBonus("vigor"))),
    key,
  }),
);

export const staminaMaximum = withStateKey("staminaMaximum", (key) =>
  selector({
    get: ({ get }) => {
      const { base, increment } = ATTRIBUTES.endurance;
      const attributeRankValue = get(attributeRank("endurance"));
      const total = getComputedStatistic({ amount: attributeRankValue, base, increment });

      return Math.round(total * (1 + get(attributePowerBonus("endurance"))));
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
    effects: [handleLocalStorage({ key })],
    key,
  }),
);

export const health = withStateKey("health", (key) =>
  atom({
    default: healthMaximumTotal,
    effects: [handleLocalStorage({ key })],
    key,
  }),
);

export const regenerationDuration = withStateKey("regenerationDuration", (key) =>
  atomFamily<number, Reserve>({
    default: 0,
    effects: (parameter) => [handleLocalStorage({ key, parameter })],
    key,
  }),
);

export const isImmortal = withStateKey("isImmortal", (key) =>
  atom({
    default: false,
    effects: [handleLocalStorage({ key })],
    key,
  }),
);

export const poisonDuration = withStateKey("poisonDuration", (key) =>
  atom({
    default: 0,
    effects: [handleLocalStorage({ key })],
    key,
  }),
);

export const stamina = withStateKey("stamina", (key) =>
  atom({
    default: staminaMaximumTotal,
    effects: [handleLocalStorage({ key })],
    key,
  }),
);
