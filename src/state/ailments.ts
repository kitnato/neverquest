import { selector, selectorFamily } from "recoil";

import { shield, totalElementalEffects, weapon } from "./gear";
import { isSkillAcquired } from "./skills";
import { isTraitAcquired } from "./traits";
import { WEAPON_NONE } from "@neverquest/data/gear";
import { ELEMENTALS } from "@neverquest/data/items";
import { BLEED } from "@neverquest/data/statistics";
import { BRUISER_STUN_CHANCE } from "@neverquest/data/traits";
import {
  ELEMENTAL_TYPES,
  MONSTER_AILMENT_TYPES,
  type MonsterAilment,
} from "@neverquest/types/unions";
import { withStateKey } from "@neverquest/utilities/helpers";

// SELECTORS

export const bleed = withStateKey("bleed", (key) =>
  selector({
    get: ({ get }) => BLEED[get(isTraitAcquired("shredder")) ? "shredder" : "default"],
    key,
  }),
);

export const bleedChance = withStateKey("bleedChance", (key) =>
  selector({
    get: ({ get }) => {
      const { abilityChance, gearClass } = get(weapon);

      return get(isSkillAcquired("anatomy")) && gearClass === "piercing" ? abilityChance : 0;
    },
    key,
  }),
);

export const canReceiveAilment = withStateKey("canReceiveAilment", (key) =>
  selectorFamily<boolean, MonsterAilment>({
    get:
      (parameter) =>
      ({ get }) => {
        switch (parameter) {
          case "bleeding": {
            return get(bleedChance) > 0;
          }

          case "staggered": {
            return get(staggerChance) > 0;
          }

          case "stunned": {
            return get(stunChance) > 0;
          }

          case "burning":
          case "frozen":
          case "shocked": {
            const elemental = ELEMENTAL_TYPES.find(
              (current) => ELEMENTALS[current].ailment === parameter,
            );
            const { armor, weapon } = get(totalElementalEffects);

            return elemental === undefined
              ? false
              : armor[elemental].duration > 0 || weapon[elemental].duration > 0;
          }
        }
      },
    key,
  }),
);

export const canReceiveAilments = withStateKey("canReceiveAilments", (key) =>
  selector({
    get: ({ get }) => MONSTER_AILMENT_TYPES.some((current) => get(canReceiveAilment(current))),
    key,
  }),
);

export const staggerChance = withStateKey("staggerChance", (key) =>
  selector({
    get: ({ get }) => (get(isSkillAcquired("shieldcraft")) ? get(shield).stagger : 0),
    key,
  }),
);

export const stunChance = withStateKey("stunChance", (key) =>
  selector({
    get: ({ get }) => {
      const { abilityChance, gearClass, name } = get(weapon);

      return get(isSkillAcquired("traumatology")) && gearClass === "blunt"
        ? get(isTraitAcquired("bruiser")) && name === WEAPON_NONE.name
          ? BRUISER_STUN_CHANCE
          : abilityChance
        : 0;
    },
    key,
  }),
);
