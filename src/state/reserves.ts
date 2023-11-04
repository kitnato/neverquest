import { atom, atomFamily, selector, selectorFamily } from "recoil";

import { ATTRIBUTES } from "@neverquest/data/attributes";
import { BLIGHT } from "@neverquest/data/monster";
import { HEALTH_LOW_THRESHOLD, RESERVES, RESERVE_MINIMUM } from "@neverquest/data/reserves";
import {
  attributePowerBonus,
  attributeRank,
  attributeStatistic,
} from "@neverquest/state/attributes";
import { handleLocalStorage } from "@neverquest/state/effects/handleLocalStorage";
import { poisonLength, poisonMagnitude } from "@neverquest/state/monster";
import { questsBonus } from "@neverquest/state/quests";
import type { BlightMagnitude } from "@neverquest/types";
import type { Reserve } from "@neverquest/types/unions";
import { getComputedStatistic } from "@neverquest/utilities/getters";
import { withStateKey } from "@neverquest/utilities/helpers";

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
        amount: Math.min(blightValue * get(blightAmount), get(staminaMaximum)),
        percentage: Math.min(blightValue * BLIGHT.increment, 1),
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

      return Math.round(
        total * (1 + get(attributePowerBonus("vitality"))) * (1 + get(questsBonus("healthBonus"))),
      );
    },
    key,
  }),
);

export const healthMaximumPoisoned = withStateKey("healthMaximumPoisoned", (key) =>
  selector({
    get: ({ get }) =>
      Math.max(
        get(healthMaximum) -
          Math.round(
            get(healthMaximum) * get(poisonMagnitude) * (get(poisonDuration) / get(poisonLength)),
          ),
        RESERVE_MINIMUM,
      ),
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
    get: ({ get }) => get(health) >= get(healthMaximumPoisoned),
    key,
  }),
);

export const isHealthLow = withStateKey("isHealthLow", (key) =>
  selector({
    get: ({ get }) => get(health) <= get(healthMaximumPoisoned) * HEALTH_LOW_THRESHOLD,
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
    get: ({ get }) => get(stamina) >= get(staminaMaximumBlighted),
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

export const staminaMaximumBlighted = withStateKey("staminaMaximumBlighted", (key) =>
  selector({
    get: ({ get }) => Math.max(get(staminaMaximum) - get(blightMagnitude).amount, RESERVE_MINIMUM),
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
    default: healthMaximumPoisoned,
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
    default: staminaMaximumBlighted,
    effects: [handleLocalStorage({ key })],
    key,
  }),
);
