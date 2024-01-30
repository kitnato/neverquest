import { atom, atomFamily, selector, selectorFamily } from "recoil";

import { BLIGHT, POISON } from "@neverquest/data/monster";
import { AILING_RESERVE_MINIMUM, HEALTH_LOW_THRESHOLD, RESERVES } from "@neverquest/data/reserves";
import { attributePowerBonus, attributeStatistic } from "@neverquest/state/attributes";
import { handleStorage } from "@neverquest/state/effects/handleStorage";
import { stage } from "@neverquest/state/encounter";
import { questsBonus } from "@neverquest/state/quests";
import type { Reserve } from "@neverquest/types/unions";
import { getFromRange, getLinearMapping, getSigmoid } from "@neverquest/utilities/getters";
import { withStateKey } from "@neverquest/utilities/helpers";

// SELECTORS

export const blightMagnitude = withStateKey("blightMagnitude", (key) =>
  selector({
    get: ({ get }) => get(blight) * BLIGHT.increment,
    key,
  }),
);

export const healthMaximum = withStateKey("healthMaximum", (key) =>
  selector({
    get: ({ get }) =>
      Math.ceil(
        get(attributeStatistic("vitality")) *
          (1 + get(attributePowerBonus("vitality"))) *
          (1 + get(questsBonus("healthBonus"))),
      ),
    key,
  }),
);

export const healthMaximumPoisoned = withStateKey("healthMaximumPoisoned", (key) =>
  selector({
    get: ({ get }) => {
      const healthMaximumValue = get(healthMaximum);

      return Math.max(
        Math.round(
          healthMaximumValue -
            Math.ceil(
              healthMaximumValue * get(poisonMagnitude) * (get(poisonDuration) / get(poisonLength)),
            ),
        ),
        AILING_RESERVE_MINIMUM,
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
  selectorFamily({
    get:
      (reserve: Reserve) =>
      ({ get }) =>
        get(regenerationDuration(reserve)) > 0,
    key,
  }),
);

export const isStaminaAtMaximum = withStateKey("isStaminaAtMaximum", (key) =>
  selector({
    get: ({ get }) => get(stamina) >= get(staminaMaximumBlighted),
    key,
  }),
);

export const poisonLength = withStateKey("poisonLength", (key) =>
  selector({
    get: ({ get }) => {
      const {
        duration: { maximum, minimum },
        requiredStage,
      } = POISON;

      return getFromRange({
        factor: getSigmoid(
          getLinearMapping({
            offset: requiredStage,
            stage: get(stage),
          }),
        ),
        maximum,
        minimum,
      });
    },
    key,
  }),
);

export const poisonMagnitude = withStateKey("poisonMagnitude", (key) =>
  selector({
    get: ({ get }) => {
      const {
        magnitude: { maximum, minimum },
        requiredStage,
      } = POISON;

      return getFromRange({
        factor: getSigmoid(
          getLinearMapping({
            offset: requiredStage,
            stage: get(stage),
          }),
        ),
        maximum,
        minimum,
      });
    },
    key,
  }),
);

export const regenerationAmount = withStateKey("regenerationAmount", (key) =>
  selectorFamily({
    get:
      (reserve: Reserve) =>
      ({ get }) =>
        RESERVES[reserve].baseRegenerationAmount +
        Math.round(
          get(attributeStatistic("fortitude")) * (1 + get(attributePowerBonus("fortitude"))),
        ),
    key,
  }),
);

export const regenerationRate = withStateKey("regenerationRate", (key) =>
  selectorFamily({
    get:
      (reserve: Reserve) =>
      ({ get }) => {
        const { baseRegenerationRate } = RESERVES[reserve];

        return Math.round(
          baseRegenerationRate - baseRegenerationRate * get(reserveRegenerationRateReduction),
        );
      },
    key,
  }),
);

export const reserveRegenerationRateReduction = withStateKey(
  "reserveRegenerationRateReduction",
  (key) =>
    selector({
      get: ({ get }) => get(attributeStatistic("vigor")) * (1 + get(attributePowerBonus("vigor"))),
      key,
    }),
);

export const staminaMaximum = withStateKey("staminaMaximum", (key) =>
  selector({
    get: ({ get }) =>
      Math.ceil(
        get(attributeStatistic("endurance")) *
          (1 + get(attributePowerBonus("endurance"))) *
          (1 + get(questsBonus("staminaBonus"))),
      ),
    key,
  }),
);

export const staminaMaximumBlighted = withStateKey("staminaMaximumBlighted", (key) =>
  selector({
    get: ({ get }) => {
      const staminaMaximumValue = get(staminaMaximum);

      return Math.max(
        Math.round(staminaMaximumValue - staminaMaximumValue * get(blightMagnitude)),
        AILING_RESERVE_MINIMUM,
      );
    },
    key,
  }),
);

// ATOMS

export const blight = withStateKey("blight", (key) =>
  atom({
    default: 0,
    effects: [handleStorage({ key })],
    key,
  }),
);

export const health = withStateKey("health", (key) =>
  atom({
    default: healthMaximumPoisoned,
    effects: [handleStorage({ key })],
    key,
  }),
);

export const isInexhaustible = withStateKey("isInexhaustible", (key) =>
  atom({
    default: false,
    effects: [handleStorage({ key })],
    key,
  }),
);

export const isInvulnerable = withStateKey("isInvulnerable", (key) =>
  atom({
    default: false,
    effects: [handleStorage({ key })],
    key,
  }),
);

export const poisonDuration = withStateKey("poisonDuration", (key) =>
  atom({
    default: 0,
    effects: [handleStorage({ key })],
    key,
  }),
);

export const regenerationDuration = withStateKey("regenerationDuration", (key) =>
  atomFamily<number, Reserve>({
    default: 0,
    effects: (reserve) => [handleStorage({ key, parameter: reserve })],
    key,
  }),
);

export const stamina = withStateKey("stamina", (key) =>
  atom({
    default: staminaMaximumBlighted,
    effects: [handleStorage({ key })],
    key,
  }),
);
