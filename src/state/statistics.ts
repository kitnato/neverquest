import { selector } from "recoil";

import { ARMOR_NONE, SHIELD_NONE, WEAPON_NONE } from "@neverquest/data/gear";
import { PERCENTAGE_POINTS } from "@neverquest/data/general";
import { PARRY_ABSORPTION, PARRY_DAMAGE, RECOVERY_RATE } from "@neverquest/data/statistics";
import { bleed, bleedChance, staggerChance, stunChance } from "@neverquest/state/ailments";
import { attributePowerBonus, attributeStatistic } from "@neverquest/state/attributes";
import { armor, elementalEffects, shield, weapon } from "@neverquest/state/gear";
import { masteryStatistic } from "@neverquest/state/masteries";
import { questsBonus } from "@neverquest/state/quests";
import { stamina } from "@neverquest/state/reserves";
import { isSkillAcquired } from "@neverquest/state/skills";
import { isTraitAcquired } from "@neverquest/state/traits";
import { isMelee, isRanged } from "@neverquest/types/type-guards";
import { getDamagePerRate, getDamagePerTick } from "@neverquest/utilities/getters";
import { withStateKey } from "@neverquest/utilities/helpers";

// SELECTORS

export const attackRate = withStateKey("attackRate", (key) =>
  selector({
    get: ({ get }) => get(weapon).rate * (1 - get(attackRateReduction)),
    key,
  }),
);

export const attackRateReduction = withStateKey("attackRateReduction", (key) =>
  selector({
    get: ({ get }) => get(attributeStatistic("speed")) * (1 + get(attributePowerBonus("speed"))),
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
    get: ({ get }) => Math.round(get(bleedDamage) * get(bleedChance) * PERCENTAGE_POINTS),
    key,
  }),
);

export const blockChance = withStateKey("blockChance", (key) =>
  selector({
    get: ({ get }) => get(shield).block,
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
      get(attributeStatistic("perception")) * (1 + get(attributePowerBonus("perception"))),
    key,
  }),
);

export const criticalRating = withStateKey("criticalRating", (key) =>
  selector({
    get: ({ get }) => Math.round(get(criticalChance) * PERCENTAGE_POINTS * get(criticalDamage)),
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
      const { damage: weaponDamage, name } = get(weapon);

      return (
        (Math.round(
          get(attributeStatistic("strength")) *
            (1 + get(attributePowerBonus("strength"))) *
            (1 + get(questsBonus("damageBonus"))),
        ) +
          weaponDamage +
          Object.values(get(elementalEffects).weapon).reduce((sum, { damage }) => sum + damage, 0) +
          (get(isTraitAcquired("bruiser")) && name === WEAPON_NONE.name ? get(stamina) : 0)) *
        (get(isTraitAcquired("brawler")) && get(shield).name === SHIELD_NONE.name ? 2 : 1)
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

export const deflection = withStateKey("deflection", (key) =>
  selector({
    get: ({ get }) =>
      get(isSkillAcquired("armorcraft"))
        ? Math.min(get(armor).deflection * (get(isTraitAcquired("inoculated")) ? 2 : 1), 1)
        : 0,
    key,
  }),
);

export const dodgeChance = withStateKey("dodgeChance", (key) =>
  selector({
    get: ({ get }) =>
      (get(armor).staminaCost === Number.POSITIVE_INFINITY && !get(isTraitAcquired("stalwart"))) ||
      !get(isSkillAcquired("evasion"))
        ? 0
        : get(attributeStatistic("agility")) *
          (1 + get(attributePowerBonus("agility"))) *
          (get(isTraitAcquired("nudist")) && get(armor).ID === ARMOR_NONE.ID ? 2 : 1),
    key,
  }),
);

export const executionThreshold = withStateKey("executionThreshold", (key) =>
  selector({
    get: ({ get }) => {
      const weaponValue = get(weapon);

      return isMelee(weaponValue) && weaponValue.grip === "two-handed"
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
    get: ({ get }) =>
      get(armor).protection *
      (get(isTraitAcquired("tank")) && get(shield).name !== SHIELD_NONE.name ? 2 : 1),
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

      return isRanged(weaponValue)
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
    get: ({ get }) => Math.round(get(stunChance) * get(masteryStatistic("might")) * 100),
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
