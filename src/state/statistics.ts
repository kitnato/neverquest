import { selector } from "recoil";

import { SHIELD_NONE, WEAPON_NONE } from "@neverquest/data/inventory";
import {
  AILMENT_PENALTY,
  BLEED,
  PARRY_ABSORPTION,
  PARRY_DAMAGE,
  RECOVERY_RATE,
} from "@neverquest/data/statistics";
import { withStateKey } from "@neverquest/state";
import { attributePowerBonus, attributeStatistic } from "@neverquest/state/attributes";
import {
  armor,
  elementalEffects,
  shield,
  totalElementalEffects,
  weapon,
} from "@neverquest/state/gear";
import { masteryStatistic } from "@neverquest/state/masteries";
import { isMonsterAiling } from "@neverquest/state/monster";
import { stamina } from "@neverquest/state/reserves";
import { isTraitAcquired } from "@neverquest/state/traits";
import { isMelee } from "@neverquest/types/type-guards";
import { getDamagePerRate, getDamagePerTick } from "@neverquest/utilities/getters";

// SELECTORS

export const attackRate = withStateKey("attackRate", (key) =>
  selector({
    get: ({ get }) => get(attributeStatistic("speed")) * (1 + get(attributePowerBonus("speed"))),
    key,
  }),
);

export const attackRateTotal = withStateKey("attackRateTotal", (key) =>
  selector({
    get: ({ get }) => get(weapon).rate * (1 - get(attackRate)),
    key,
  }),
);

export const bleed = withStateKey("bleed", (key) =>
  selector({
    get: ({ get }) => {
      const { abilityChance, gearClass } = get(weapon);

      return gearClass === "piercing" ? abilityChance : 0;
    },
    key,
  }),
);

export const bleedDamage = withStateKey("bleedDamage", (key) =>
  selector({
    get: ({ get }) => {
      const { duration, ticks } = BLEED;

      return Math.round(
        getDamagePerTick({
          damage: Math.round(get(damageTotal)) * get(masteryStatistic("cruelty")),
          duration,
          ticks,
        }),
      );
    },
    key,
  }),
);

export const bleedDamageTotal = withStateKey("bleedDamageTotal", (key) =>
  selector({
    get: ({ get }) =>
      get(bleedDamage) * (get(isMonsterAiling("burning")) ? AILMENT_PENALTY.burning : 1),
    key,
  }),
);

export const bleedRating = withStateKey("bleedRating", (key) =>
  selector({
    get: ({ get }) => Math.round(get(bleedDamage) * get(bleed) * 100),
    key,
  }),
);

export const block = withStateKey("block", (key) =>
  selector({
    get: ({ get }) => get(shield).block,
    key,
  }),
);

export const criticalChance = withStateKey("criticalChance", (key) =>
  selector({
    get: ({ get }) =>
      get(attributeStatistic("dexterity")) * (1 + get(attributePowerBonus("dexterity"))),
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
    get: ({ get }) => Math.round(get(criticalChance) * get(criticalDamage) * 1000),
    key,
  }),
);

export const criticalStrike = withStateKey("criticalStrike", (key) =>
  selector({
    get: ({ get }) => Math.round(get(damageTotal) * get(criticalDamage)),
    key,
  }),
);

export const damage = withStateKey("damage", (key) =>
  selector({
    get: ({ get }) =>
      Math.round(get(attributeStatistic("strength")) * (1 + get(attributePowerBonus("strength")))),
    key,
  }),
);

export const damageTotal = withStateKey("damageTotal", (key) =>
  selector({
    get: ({ get }) => {
      const { damage: weaponDamage, name } = get(weapon);

      return (
        (get(damage) +
          weaponDamage +
          Object.values(get(totalElementalEffects).weapon).reduce(
            (aggregator, { damage }) => aggregator + damage,
            0,
          ) +
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
        damage: get(damageTotal),
        damageModifier: get(criticalDamage),
        damageModifierChance: get(criticalChance),
        rate: get(attackRateTotal),
      }),
    key,
  }),
);

export const deflection = withStateKey("deflection", (key) =>
  selector({
    get: ({ get }) => get(armor).deflection,
    key,
  }),
);

export const dodge = withStateKey("dodge", (key) =>
  selector({
    get: ({ get }) =>
      get(armor).staminaCost === Infinity
        ? 0
        : get(attributeStatistic("agility")) * (1 + get(attributePowerBonus("agility"))),
    key,
  }),
);

export const execution = withStateKey("execution", (key) =>
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

export const parry = withStateKey("parry", (key) =>
  selector({
    get: ({ get }) => {
      const { abilityChance, gearClass } = get(weapon);

      return gearClass === "slashing" ? abilityChance : 0;
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
    get: ({ get }) => Math.round(get(parry) * get(parryAbsorption) * get(parryDamage) * 1000),
    key,
  }),
);

export const protection = withStateKey("protection", (key) =>
  selector({
    get: ({ get }) => get(armor).protection,
    key,
  }),
);

export const recoveryRate = withStateKey("recoveryRate", (key) =>
  selector({
    get: ({ get }) => RECOVERY_RATE - RECOVERY_RATE * get(masteryStatistic("resilience")),
    key,
  }),
);

export const staggerRating = withStateKey("staggerRating", (key) =>
  selector({
    get: ({ get }) => Math.round(get(shield).stagger * get(masteryStatistic("stability"))),
    key,
  }),
);

export const stunRating = withStateKey("stunRating", (key) =>
  selector({
    get: ({ get }) => {
      const { abilityChance, gearClass } = get(weapon);

      return gearClass === "blunt"
        ? Math.round(abilityChance * get(masteryStatistic("might")) * 100)
        : 0;
    },
    key,
  }),
);

export const thorns = withStateKey("thorns", (key) =>
  selector({
    get: ({ get }) =>
      Object.values(get(elementalEffects).armor).reduce(
        (aggregator, { damage }) => aggregator + damage,
        0,
      ),
    key,
  }),
);
