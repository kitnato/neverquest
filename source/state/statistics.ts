import { selector } from "recoil";

import { ATTRIBUTES } from "@neverquest/data/attributes";
import { PERCENTAGE_POINTS } from "@neverquest/data/general";
import { PARRY_ABSORPTION, PARRY_DAMAGE, RECOVERY_RATE } from "@neverquest/data/statistics";
import {
  BRAWLER_DAMAGE_BONUS,
  INOCULATED_DEFLECTION_BASE,
  NUDIST_DODGE_BONUS,
} from "@neverquest/data/traits";
import { bleed, bleedChance, staggerChance, stunChance } from "@neverquest/state/ailments";
import { attributePowerBonus, attributeStatistic } from "@neverquest/state/attributes";
import { armor, elementalEffects, shield, weapon } from "@neverquest/state/gear";
import { masteryStatistic } from "@neverquest/state/masteries";
import { questsBonus } from "@neverquest/state/quests";
import { stamina } from "@neverquest/state/reserves";
import { isSkillAcquired } from "@neverquest/state/skills";
import { isTraitAcquired } from "@neverquest/state/traits";
import type { Shield } from "@neverquest/types";
import {
  isMelee,
  isRanged,
  isUnarmed,
  isUnarmored,
  isUnshielded,
} from "@neverquest/types/type-guards";
import { getDamagePerRate, getDamagePerTick } from "@neverquest/utilities/getters";
import { withStateKey } from "@neverquest/utilities/helpers";

// SELECTORS

export const attackRate = withStateKey("attackRate", (key) =>
  selector({
    get: ({ get }) =>
      get(weapon).rate *
      (1 - get(attributeStatistic("speed")) * (1 + get(attributePowerBonus("speed")))),
    key,
  }),
);

export const bleedDamage = withStateKey("bleedDamage", (key) =>
  selector({
    get: ({ get }) => {
      const { duration, ticks } = get(bleed);

      return Math.round(
        getDamagePerTick({
          damage: get(damage) * get(masteryStatistic("cruelty")),
          duration,
          ticks,
        }),
      );
    },
    key,
  }),
);

export const bleedRating = withStateKey("bleedRating", (key) =>
  selector({
    get: ({ get }) => Math.round(get(bleedDamage) * get(bleedChance) * PERCENTAGE_POINTS * 10),
    key,
  }),
);

export const blockChance = withStateKey("blockChance", (key) =>
  selector({
    get: ({ get }) => {
      const weaponValue = get(weapon);

      return !isRanged(weaponValue) &&
        (weaponValue.grip === "one-handed" || get(isTraitAcquired("colossus")))
        ? get(shield).block
        : 0;
    },
    key,
  }),
);

export const criticalChance = withStateKey("criticalChance", (key) =>
  selector({
    get: ({ get }) =>
      get(isSkillAcquired("assassination"))
        ? get(attributeStatistic("dexterity")) * (1 + get(attributePowerBonus("dexterity")))
        : 0,
    key,
  }),
);

export const criticalDamage = withStateKey("criticalDamage", (key) =>
  selector({
    get: ({ get }) =>
      get(isSkillAcquired("assassination"))
        ? get(attributeStatistic("perception")) * (1 + get(attributePowerBonus("perception")))
        : 0,
    key,
  }),
);

export const criticalRating = withStateKey("criticalRating", (key) =>
  selector({
    get: ({ get }) =>
      Math.round(get(criticalChance) * PERCENTAGE_POINTS + get(criticalDamage) * PERCENTAGE_POINTS),
    key,
  }),
);

export const criticalStrike = withStateKey("criticalStrike", (key) =>
  selector({
    get: ({ get }) => Math.round(get(damage) * get(criticalDamage)),
    key,
  }),
);

export const damage = withStateKey("damage", (key) =>
  selector({
    get: ({ get }) => {
      const weaponValue = get(weapon);

      return Math.ceil(
        (weaponValue.damage +
          get(attributeStatistic("strength")) * (1 + get(attributePowerBonus("strength"))) +
          Object.values(get(elementalEffects).weapon).reduce((sum, { damage }) => sum + damage, 0) +
          (get(isTraitAcquired("bruiser")) && isUnarmed(weaponValue) ? get(stamina) : 0)) *
          (get(isTraitAcquired("brawler")) &&
          isUnshielded(get(shield)) &&
          isMelee(weaponValue) &&
          (weaponValue.grip === "one-handed" || get(isTraitAcquired("colossus")))
            ? 1 + BRAWLER_DAMAGE_BONUS
            : 1) *
          (1 + get(questsBonus("damageBonus"))),
      );
    },
    key,
  }),
);

export const damagePerSecond = withStateKey("damagePerSecond", (key) =>
  selector({
    get: ({ get }) =>
      getDamagePerRate({
        damage: get(damage),
        damageModifier: get(criticalDamage),
        damageModifierChance: get(criticalChance),
        rate: get(attackRate),
      }),
    key,
  }),
);

export const deflectionChance = withStateKey("deflectionChance", (key) =>
  selector({
    get: ({ get }) =>
      get(isSkillAcquired("armorcraft"))
        ? get(armor).deflection +
          (get(isTraitAcquired("inoculated")) ? INOCULATED_DEFLECTION_BASE : 0)
        : 0,
    key,
  }),
);

export const dodgeChance = withStateKey("dodgeChance", (key) =>
  selector({
    get: ({ get }) =>
      get(isSkillAcquired("evasion"))
        ? Math.min(
            get(attributeStatistic("agility")) *
              (1 + get(attributePowerBonus("agility"))) *
              (get(isTraitAcquired("nudist")) && isUnarmored(get(armor)) ? NUDIST_DODGE_BONUS : 1),
            ATTRIBUTES.agility.maximum ?? Number.POSITIVE_INFINITY,
          )
        : 0,
    key,
  }),
);

export const executionThreshold = withStateKey("executionThreshold", (key) =>
  selector({
    get: ({ get }) => {
      const weaponValue = get(weapon);

      return get(isSkillAcquired("siegecraft")) &&
        isMelee(weaponValue) &&
        weaponValue.grip === "two-handed"
        ? get(masteryStatistic("butchery"))
        : 0;
    },
    key,
  }),
);

export const parryAbsorption = withStateKey("parryAbsorption", (key) =>
  selector({
    get: ({ get }) => PARRY_ABSORPTION + get(masteryStatistic("finesse")),
    key,
  }),
);

export const parryChance = withStateKey("parryChance", (key) =>
  selector({
    get: ({ get }) => {
      const { abilityChance, gearClass } = get(weapon);

      return get(isSkillAcquired("escrime")) && gearClass === "slashing" ? abilityChance : 0;
    },
    key,
  }),
);

export const parryDamage = withStateKey("parryDamage", (key) =>
  selector({
    get: ({ get }) => PARRY_DAMAGE + get(masteryStatistic("finesse")),
    key,
  }),
);

export const parryRating = withStateKey("parryRating", (key) =>
  selector({
    get: ({ get }) =>
      Math.round(
        get(parryChance) *
          PERCENTAGE_POINTS *
          get(parryAbsorption) *
          PERCENTAGE_POINTS *
          get(parryDamage),
      ),
    key,
  }),
);

export const protection = withStateKey("protection", (key) =>
  selector({
    get: ({ get }) => {
      const { protection } = get(armor);
      const shieldValue = get(shield);

      if (!isUnshielded(shieldValue) && get(isTraitAcquired("tank"))) {
        return Math.ceil(protection * (1 + (shieldValue as Shield).block));
      }

      return protection;
    },
    key,
  }),
);

export const recoveryRate = withStateKey("recoveryRate", (key) =>
  selector({
    get: ({ get }) =>
      Math.max(RECOVERY_RATE - RECOVERY_RATE * get(masteryStatistic("resilience")), 0),
    key,
  }),
);

export const range = withStateKey("range", (key) =>
  selector({
    get: ({ get }) => {
      const weaponValue = get(weapon);

      return get(isSkillAcquired("archery")) && isRanged(weaponValue)
        ? weaponValue.range * (1 + get(masteryStatistic("marksmanship")))
        : 0;
    },
    key,
  }),
);

export const staggerRating = withStateKey("staggerRating", (key) =>
  selector({
    get: ({ get }) => Math.round(get(staggerChance) * get(masteryStatistic("stability"))),
    key,
  }),
);

export const stunRating = withStateKey("stunRating", (key) =>
  selector({
    get: ({ get }) => Math.round(get(stunChance) * get(masteryStatistic("might"))),
    key,
  }),
);

export const thorns = withStateKey("thorns", (key) =>
  selector({
    get: ({ get }) =>
      Object.values(get(elementalEffects).armor).reduce((sum, { damage }) => sum + damage, 0),
    key,
  }),
);
