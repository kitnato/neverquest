import { selector, selectorFamily } from "recoil";

import { ELEMENTALS } from "@neverquest/data/items";
import { BLEED } from "@neverquest/data/statistics";
import { BRUISER_STUN_CHANCE } from "@neverquest/data/traits";
import { attributeRank } from "@neverquest/state/attributes";
import { elementalEffects, shield, weapon } from "@neverquest/state/gear";
import { isSkillAcquired } from "@neverquest/state/skills";
import { isTraitAcquired } from "@neverquest/state/traits";
import { isUnarmed, isUnshielded } from "@neverquest/types/type-guards";
import { AILMENT_TYPES, type Ailment, ELEMENTAL_TYPES } from "@neverquest/types/unions";
import { withStateKey } from "@neverquest/utilities/helpers";

// SELECTORS

export const bleed = withStateKey("bleed", (key) =>
  selector({
    get: ({ get }) => BLEED[get(isTraitAcquired("shredder")) ? "shredder" : "base"],
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
  selectorFamily({
    get:
      (ailment: Ailment) =>
      ({ get }) => {
        switch (ailment) {
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
              (currentElemental) => ELEMENTALS[currentElemental].ailment === ailment,
            );
            const { armor, weapon } = get(elementalEffects);

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
    get: ({ get }) => AILMENT_TYPES.some((ailment) => get(canReceiveAilment(ailment))),
    key,
  }),
);

export const staggerChance = withStateKey("staggerChance", (key) =>
  selector({
    get: ({ get }) => {
      const shieldValue = get(shield);

      return get(isSkillAcquired("shieldcraft")) && !isUnshielded(shieldValue)
        ? get(shield).stagger
        : 0;
    },
    key,
  }),
);

export const stunChance = withStateKey("stunChance", (key) =>
  selector({
    get: ({ get }) => {
      const weaponValue = get(weapon);
      const { abilityChance, gearClass } = weaponValue;
      const { increment, maximum } = BRUISER_STUN_CHANCE;

      return get(isSkillAcquired("traumatology")) && gearClass === "blunt"
        ? get(isTraitAcquired("bruiser")) && isUnarmed(weaponValue)
          ? Math.min(increment * get(attributeRank("strength")), maximum)
          : abilityChance
        : 0;
    },
    key,
  }),
);
