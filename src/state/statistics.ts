import { selector } from "recoil";

import { ATTRIBUTES } from "@neverquest/data/attributes";
import { MASTERIES } from "@neverquest/data/masteries";
import {
  BLEED,
  REGENERATION_AMOUNT_HEALTH,
  REGENERATION_AMOUNT_STAMINA,
  REGENERATION_RATE_HEALTH,
  REGENERATION_RATE_STAMINA,
} from "@neverquest/data/statistics";
import { withStateKey } from "@neverquest/state";
import { attributes } from "@neverquest/state/attributes";
import { armor, shield, weapon } from "@neverquest/state/inventory";
import { masteries } from "@neverquest/state/masteries";
import { formatToFixed } from "@neverquest/utilities/formatters";
import {
  getComputedStatistic,
  getDamagePerRate,
  getDamagePerTick,
} from "@neverquest/utilities/getters";

// SELECTORS

export const attackRate = withStateKey("attackRate", (key) =>
  selector({
    get: ({ get }) => {
      const { base, increment } = ATTRIBUTES.speed;
      const { points } = get(attributes("speed"));

      return getComputedStatistic({ amount: points, base, increment });
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

      if (gearClass === "piercing" && abilityChance > 0) {
        return abilityChance;
      }

      return 0;
    },
    key,
  })
);

export const bleedDamage = withStateKey("bleedDamage", (key) =>
  selector({
    get: ({ get }) => {
      const { base, increment } = MASTERIES.cruelty;
      const { rank } = get(masteries("cruelty"));

      return getComputedStatistic({ amount: rank, base, increment });
    },
    key,
  })
);

export const bleedRating = withStateKey("bleedRating", (key) =>
  selector({
    get: ({ get }) => Math.round(get(bleedTick) * get(bleed) * 100),
    key,
  })
);

export const bleedTick = withStateKey("bleedTick", (key) =>
  selector({
    get: ({ get }) => {
      const { duration, ticks } = BLEED;

      return getDamagePerTick({
        damage: get(damage),
        duration,
        proportion: get(bleedDamage),
        ticks,
      });
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
      const { base, increment } = ATTRIBUTES.dexterity;
      const { points } = get(attributes("dexterity"));

      return getComputedStatistic({ amount: points, base, increment });
    },
    key,
  })
);

export const criticalDamage = withStateKey("criticalDamage", (key) =>
  selector({
    get: ({ get }) => {
      const { base, increment } = ATTRIBUTES.perception;
      const { points } = get(attributes("perception"));

      return getComputedStatistic({ amount: points, base, increment });
    },
    key,
  })
);

export const criticalRating = withStateKey("criticalRating", (key) =>
  selector({
    get: ({ get }) => Math.round(get(criticalChance) * get(criticalDamage) * 100),
    key,
  })
);

export const damage = withStateKey("damage", (key) =>
  selector({
    get: ({ get }) => {
      const { base, increment } = ATTRIBUTES.strength;
      const { points } = get(attributes("strength"));

      return getComputedStatistic({ amount: points, base, increment });
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
      formatToFixed(
        getDamagePerRate({
          damage: get(damageTotal),
          damageModifier: get(criticalDamage),
          damageModifierChance: get(criticalChance),
          rate: get(attackRateTotal),
        })
      ),
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
      const { base, increment } = ATTRIBUTES.agility;
      const { points } = get(attributes("agility"));

      return getComputedStatistic({ amount: points, base, increment });
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

export const stability = withStateKey("stability", (key) =>
  selector({
    get: ({ get }) => {
      const { base, increment } = MASTERIES.stability;
      const { rank } = get(masteries("stability"));

      return getComputedStatistic({ amount: rank, base, increment });
    },
    key,
  })
);

export const healthRegenerationAmount = withStateKey("healthRegenerationAmount", (key) =>
  selector({
    get: ({ get }) => REGENERATION_AMOUNT_HEALTH + get(reserveRegenerationAmount),
    key,
  })
);

export const healthRegenerationRate = withStateKey("healthRegenerationRate", (key) =>
  selector({
    get: ({ get }) =>
      Math.round(
        REGENERATION_RATE_HEALTH - REGENERATION_RATE_HEALTH * get(reserveRegenerationRate)
      ),
    key,
  })
);

export const parryAbsorption = withStateKey("parryAbsorption", (key) =>
  selector({
    get: ({ get }) => {
      const { base, increment } = MASTERIES.finesse;
      const { rank } = get(masteries("finesse"));

      return 0.33 + getComputedStatistic({ amount: rank, base, increment });
    },
    key,
  })
);

export const parry = withStateKey("parry", (key) =>
  selector({
    get: ({ get }) => {
      const { abilityChance, gearClass } = get(weapon);

      if (gearClass === "slashing" && abilityChance > 0) {
        return abilityChance;
      }

      return 0;
    },
    key,
  })
);

export const parryDamage = withStateKey("parryDamage", (key) =>
  selector({
    get: ({ get }) => {
      const { base, increment } = MASTERIES.finesse;
      const { rank } = get(masteries("finesse"));

      return 0.25 + getComputedStatistic({ amount: rank, base, increment });
    },
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
    get: ({ get }) => {
      const { base, increment } = ATTRIBUTES.resilience;
      const { points } = get(attributes("resilience"));

      return getComputedStatistic({ amount: points, base, increment });
    },
    key,
  })
);

export const reserveRegenerationAmount = withStateKey("reserveRegenerationAmount", (key) =>
  selector({
    get: ({ get }) => {
      const { base, increment } = ATTRIBUTES.fortitude;
      const { points } = get(attributes("fortitude"));

      return getComputedStatistic({ amount: points, base, increment });
    },
    key,
  })
);

export const reserveRegenerationRate = withStateKey("reserveRegenerationRate", (key) =>
  selector({
    get: ({ get }) => {
      const { base, increment } = ATTRIBUTES.vigor;
      const { points } = get(attributes("vigor"));

      return getComputedStatistic({ amount: points, base, increment });
    },
    key,
  })
);

export const staggerDuration = withStateKey("staggerDuration", (key) =>
  selector({
    get: ({ get }) => {
      const { base, increment } = MASTERIES.might;
      const { rank } = get(masteries("might"));

      return getComputedStatistic({ amount: rank, base, increment });
    },
    key,
  })
);

export const staggerRating = withStateKey("staggerRating", (key) =>
  selector({
    get: ({ get }) => {
      const staggerDurationValue = get(staggerDuration);

      return Math.round(
        get(shield).stagger * staggerDurationValue + get(staggerWeapon) * staggerDurationValue
      );
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

export const staminaRegenerationAmount = withStateKey("staminaRegenerationAmount", (key) =>
  selector({
    get: ({ get }) => REGENERATION_AMOUNT_STAMINA + get(reserveRegenerationAmount),
    key,
  })
);

export const staminaRegenerationRate = withStateKey("staminaRegenerationRate", (key) =>
  selector({
    get: ({ get }) =>
      Math.round(
        REGENERATION_RATE_STAMINA - REGENERATION_RATE_STAMINA * get(reserveRegenerationRate)
      ),
    key,
  })
);

export const tenacity = withStateKey("tenacity", (key) =>
  selector({
    get: ({ get }) => {
      const { base, increment } = MASTERIES.tenacity;
      const { rank } = get(masteries("tenacity"));

      return getComputedStatistic({ amount: rank, base, increment });
    },
    key,
  })
);
