import { selector } from "recoil";

import { ATTRIBUTES } from "@neverquest/data/attributes";
import {
  BLEED,
  REGENERATION_AMOUNT_HEALTH,
  REGENERATION_AMOUNT_STAMINA,
  REGENERATION_RATE_HEALTH,
  REGENERATION_RATE_STAMINA,
} from "@neverquest/data/constants";
import { MASTERIES } from "@neverquest/data/masteries";
import { withStateKey } from "@neverquest/state";
import { attributes } from "@neverquest/state/attributes";
import { armor, shield, weapon } from "@neverquest/state/inventory";
import { masteries } from "@neverquest/state/masteries";
import { AttributeType, MasteryType } from "@neverquest/types/enums";
import {
  getComputedStatistic,
  getDamagePerRate,
  getDamagePerTick,
} from "@neverquest/utilities/getters";

// SELECTORS

export const attackRate = withStateKey("attackRate", (key) =>
  selector({
    get: ({ get }) => {
      const { base, increment } = ATTRIBUTES[AttributeType.AttackRate];
      const { points } = get(attributes(AttributeType.AttackRate));

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

export const bleedChance = withStateKey("bleedChance", (key) =>
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
      const { base, increment } = MASTERIES[MasteryType.BleedDamage];
      const { rank } = get(masteries(MasteryType.BleedDamage));

      return getComputedStatistic({ amount: rank, base, increment });
    },
    key,
  })
);

export const bleedRating = withStateKey("bleedRating", (key) =>
  selector({
    get: ({ get }) => Math.round(get(bleedTick) * get(bleedChance) * 100),
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

export const blockChance = withStateKey("blockChance", (key) =>
  selector({
    get: ({ get }) => get(shield).blockChance,
    key,
  })
);

export const criticalChance = withStateKey("criticalChance", (key) =>
  selector({
    get: ({ get }) => {
      const { base, increment } = ATTRIBUTES[AttributeType.CriticalChance];
      const { points } = get(attributes(AttributeType.CriticalChance));

      return getComputedStatistic({ amount: points, base, increment });
    },
    key,
  })
);

export const criticalDamage = withStateKey("criticalDamage", (key) =>
  selector({
    get: ({ get }) => {
      const { base, increment } = ATTRIBUTES[AttributeType.CriticalDamage];
      const { points } = get(attributes(AttributeType.CriticalDamage));

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
      const { base, increment } = ATTRIBUTES[AttributeType.Damage];
      const { points } = get(attributes(AttributeType.Damage));

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
      getDamagePerRate({
        damage: get(damageTotal),
        damageModifier: get(criticalDamage),
        damageModifierChance: get(criticalChance),
        rate: get(attackRateTotal),
      }),
    key,
  })
);

export const deflectionChance = withStateKey("deflectionChance", (key) =>
  selector({
    get: ({ get }) => get(armor).deflectionChance,
    key,
  })
);

export const dodgeChance = withStateKey("dodgeChance", (key) =>
  selector({
    get: ({ get }) => {
      const { base, increment } = ATTRIBUTES[AttributeType.DodgeChance];
      const { points } = get(attributes(AttributeType.DodgeChance));

      return getComputedStatistic({ amount: points, base, increment });
    },
    key,
  })
);

export const dodgeChanceTotal = withStateKey("dodgeChanceTotal", (key) =>
  selector({
    get: ({ get }) => {
      const { staminaCost } = get(armor);

      if (staminaCost === Infinity) {
        return 0;
      }

      return get(dodgeChance);
    },
    key,
  })
);

export const freeBlockChance = withStateKey("freeBlockChance", (key) =>
  selector({
    get: ({ get }) => {
      const { base, increment } = MASTERIES[MasteryType.FreeBlockChance];
      const { rank } = get(masteries(MasteryType.FreeBlockChance));

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
      const { base, increment } = MASTERIES[MasteryType.ParryFactor];
      const { rank } = get(masteries(MasteryType.ParryFactor));

      return 0.33 + getComputedStatistic({ amount: rank, base, increment });
    },
    key,
  })
);

export const parryChance = withStateKey("parryChance", (key) =>
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
      const { base, increment } = MASTERIES[MasteryType.ParryFactor];
      const { rank } = get(masteries(MasteryType.ParryFactor));

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
      const { base, increment } = ATTRIBUTES[AttributeType.RecoveryRate];
      const { points } = get(attributes(AttributeType.RecoveryRate));

      return getComputedStatistic({ amount: points, base, increment });
    },
    key,
  })
);

export const reserveRegenerationAmount = withStateKey("reserveRegenerationAmount", (key) =>
  selector({
    get: ({ get }) => {
      const { base, increment } = ATTRIBUTES[AttributeType.ReserveRegenerationAmount];
      const { points } = get(attributes(AttributeType.ReserveRegenerationAmount));

      return getComputedStatistic({ amount: points, base, increment });
    },
    key,
  })
);

export const reserveRegenerationRate = withStateKey("reserveRegenerationRate", (key) =>
  selector({
    get: ({ get }) => {
      const { base, increment } = ATTRIBUTES[AttributeType.ReserveRegenerationRate];
      const { points } = get(attributes(AttributeType.ReserveRegenerationRate));

      return getComputedStatistic({ amount: points, base, increment });
    },
    key,
  })
);

export const skipRecoveryChance = withStateKey("skipRecoveryChance", (key) =>
  selector({
    get: ({ get }) => {
      const { base, increment } = MASTERIES[MasteryType.SkipRecoveryChance];
      const { rank } = get(masteries(MasteryType.SkipRecoveryChance));

      return getComputedStatistic({ amount: rank, base, increment });
    },
    key,
  })
);

export const staggerChanceWeapon = withStateKey("staggerChanceWeapon", (key) =>
  selector({
    get: ({ get }) => {
      const { abilityChance, gearClass } = get(weapon);

      return gearClass === "blunt" ? abilityChance : 0;
    },
    key,
  })
);

export const staggerDuration = withStateKey("staggerDuration", (key) =>
  selector({
    get: ({ get }) => {
      const { base, increment } = MASTERIES[MasteryType.StaggerDuration];
      const { rank } = get(masteries(MasteryType.StaggerDuration));

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
        get(shield).staggerChance * staggerDurationValue +
          get(staggerChanceWeapon) * staggerDurationValue
      );
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
