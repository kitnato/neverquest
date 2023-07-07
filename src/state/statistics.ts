import { selector, selectorFamily } from "recoil";

import { ATTRIBUTES } from "@neverquest/data/attributes";
import { BLEED, PARRY_ABSORPTION, PARRY_DAMAGE, RECOVERY_RATE } from "@neverquest/data/statistics";
import { withStateKey } from "@neverquest/state";
import { level, rawAttributeStatistic } from "@neverquest/state/attributes";
import { armor, hasItem, shield, weapon } from "@neverquest/state/inventory";
import { rawMasteryStatistic } from "@neverquest/state/masteries";
import type { Attribute } from "@neverquest/types/unions";
import { getDamagePerRate, getDamagePerTick } from "@neverquest/utilities/getters";

// SELECTORS

export const attackRate = withStateKey("attackRate", (key) =>
  selector({
    get: ({ get }) => {
      const total = get(rawAttributeStatistic("speed"));

      return total + total * get(powerBonus("speed"));
    },
    key,
  })
);

export const attackRateTotal = withStateKey("attackRateTotal", (key) =>
  selector({
    get: ({ get }) => get(weapon).rate * (1 - get(attackRate)),
    key,
  })
);

export const bleed = withStateKey("bleed", (key) =>
  selector({
    get: ({ get }) => {
      const { abilityChance, gearClass } = get(weapon);

      return gearClass === "piercing" ? abilityChance : 0;
    },
    key,
  })
);

export const bleedRating = withStateKey("bleedRating", (key) =>
  selector({
    get: ({ get }) => Math.round(get(bleedTick).damage * get(bleed) * 100),
    key,
  })
);

export const bleedTick = withStateKey("bleedTick", (key) =>
  selector({
    get: ({ get }) => {
      const { duration, ticks } = BLEED;

      return {
        damage: getDamagePerTick({
          damage: get(damageTotal),
          duration,
          proportion: get(rawMasteryStatistic("cruelty")),
          ticks,
        }),
        duration: duration / ticks,
      };
    },
    key,
  })
);

export const block = withStateKey("block", (key) =>
  selector({
    get: ({ get }) => get(shield).block,
    key,
  })
);

export const criticalChance = withStateKey("criticalChance", (key) =>
  selector({
    get: ({ get }) => {
      const total = get(rawAttributeStatistic("dexterity"));

      return total + total * get(powerBonus("dexterity"));
    },
    key,
  })
);

export const criticalDamage = withStateKey("criticalDamage", (key) =>
  selector({
    get: ({ get }) => {
      const total = get(rawAttributeStatistic("perception"));

      return total + total * get(powerBonus("perception"));
    },
    key,
  })
);

export const criticalRating = withStateKey("criticalRating", (key) =>
  selector({
    get: ({ get }) => Math.round(get(criticalChance) * get(criticalDamage) * 1000),
    key,
  })
);

export const damage = withStateKey("damage", (key) =>
  selector({
    get: ({ get }) => {
      const total = get(rawAttributeStatistic("strength"));

      return Math.round(total + total * get(powerBonus("strength")));
    },
    key,
  })
);

export const damageTotal = withStateKey("damageTotal", (key) =>
  selector({
    get: ({ get }) => get(damage) + get(weapon).damage,
    key,
  })
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
  })
);

export const deflection = withStateKey("deflection", (key) =>
  selector({
    get: ({ get }) => get(armor).deflection,
    key,
  })
);

export const dodge = withStateKey("dodge", (key) =>
  selector({
    get: ({ get }) => {
      const total = get(rawAttributeStatistic("agility"));

      return total + total * get(powerBonus("agility"));
    },
    key,
  })
);

export const dodgeTotal = withStateKey("dodgeTotal", (key) =>
  selector({
    get: ({ get }) => {
      const { staminaCost } = get(armor);

      if (staminaCost === Infinity) {
        return 0;
      }

      return get(dodge);
    },
    key,
  })
);

export const lootBonus = withStateKey("lootBonus", (key) =>
  selector({
    get: ({ get }) => {
      const total = get(rawAttributeStatistic("luck"));

      return get(hasItem("antique coin")) ? total + total * get(powerBonus("luck")) : 0;
    },
    key,
  })
);

export const parryAbsorption = withStateKey("parryAbsorption", (key) =>
  selector({
    get: ({ get }) => PARRY_ABSORPTION + get(rawMasteryStatistic("finesse")),
    key,
  })
);

export const parryChance = withStateKey("parryChance", (key) =>
  selector({
    get: ({ get }) => {
      const { abilityChance, gearClass } = get(weapon);

      return gearClass === "slashing" ? abilityChance : 0;
    },
    key,
  })
);

export const parryDamage = withStateKey("parryDamage", (key) =>
  selector({
    get: ({ get }) => PARRY_DAMAGE + get(rawMasteryStatistic("finesse")),
    key,
  })
);

export const parryRating = withStateKey("parryRating", (key) =>
  selector({
    get: ({ get }) => Math.round(get(parryChance) * get(parryAbsorption) * get(parryDamage) * 1000),
    key,
  })
);

export const powerBonus = withStateKey("powerBonus", (key) =>
  selectorFamily<number, Attribute>({
    get:
      (type) =>
      ({ get }) =>
        get(hasItem("tome of power")) ? get(level) * ATTRIBUTES[type].powerBonus : 0,
    key,
  })
);

export const protection = withStateKey("protection", (key) =>
  selector({
    get: ({ get }) => get(armor).protection,
    key,
  })
);

export const recoveryRate = withStateKey("recoveryRate", (key) =>
  selector({
    get: ({ get }) => RECOVERY_RATE - RECOVERY_RATE * get(rawMasteryStatistic("resilience")),
    key,
  })
);

export const reserveRegenerationAmount = withStateKey("reserveRegenerationAmount", (key) =>
  selector({
    get: ({ get }) => {
      const total = get(rawAttributeStatistic("fortitude"));

      return Math.round(total + total * get(powerBonus("fortitude")));
    },
    key,
  })
);

export const reserveRegenerationRate = withStateKey("reserveRegenerationRate", (key) =>
  selector({
    get: ({ get }) => {
      const total = get(rawAttributeStatistic("vigor"));

      return total + total * get(powerBonus("vigor"));
    },
    key,
  })
);

export const staggerRating = withStateKey("staggerRating", (key) =>
  selector({
    get: ({ get }) => {
      const mightValue = get(rawMasteryStatistic("might"));

      return Math.round(get(shield).stagger * mightValue + get(staggerWeapon) * mightValue);
    },
    key,
  })
);

export const staggerWeapon = withStateKey("staggerWeapon", (key) =>
  selector({
    get: ({ get }) => {
      const { abilityChance, gearClass } = get(weapon);

      return gearClass === "blunt" ? abilityChance : 0;
    },
    key,
  })
);
