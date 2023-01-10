import { selector } from "recoil";

import { BLEED, REGENERATION_RATE_HEALTH, REGENERATION_RATE_STAMINA } from "@neverquest/constants";
import { ATTRIBUTES } from "@neverquest/data/attributes";
import { MASTERIES } from "@neverquest/data/masteries";
import { WeaponClass } from "@neverquest/locra/types";
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

export const attackRate = selector({
  get: ({ get }) => {
    const { base, increment } = ATTRIBUTES[AttributeType.AttackRate];
    const { points } = get(attributes(AttributeType.AttackRate));

    const statistic =
      get(weapon).rate * (1 - getComputedStatistic({ amount: points, base, increment }));
    const penalty = get(armor).penalty || 0 * statistic;

    return statistic - penalty;
  },
  key: "attackRate",
});

export const bleedChance = selector({
  get: ({ get }) => {
    const { abilityChance, weaponClass } = get(weapon);

    if (weaponClass === WeaponClass.Piercing && abilityChance > 0) {
      return abilityChance;
    }

    return 0;
  },
  key: "bleedChance",
});

export const bleedDamage = selector({
  get: ({ get }) => {
    const { base, increment } = MASTERIES[MasteryType.BleedDamage];
    const { rank } = get(masteries(MasteryType.BleedDamage));

    return getComputedStatistic({ amount: rank, base, increment });
  },
  key: "bleedDamage",
});

export const bleedRating = selector({
  get: ({ get }) => Math.round(get(bleedTick) * get(bleedChance) * 100),
  key: "bleedRating",
});

export const bleedTick = selector({
  get: ({ get }) => {
    const { duration, ticks } = BLEED;

    return getDamagePerTick({
      damage: get(damage),
      duration,
      proportion: get(bleedDamage),
      ticks,
    });
  },
  key: "bleedTick",
});

export const blockChance = selector({
  get: ({ get }) => get(shield).blockChance,
  key: "blockChance",
});

export const criticalChance = selector({
  get: ({ get }) => {
    const { base, increment } = ATTRIBUTES[AttributeType.CriticalChance];
    const { points } = get(attributes(AttributeType.CriticalChance));

    return getComputedStatistic({ amount: points, base, increment });
  },
  key: "criticalChance",
});

export const criticalDamage = selector({
  get: ({ get }) => {
    const { base, increment } = ATTRIBUTES[AttributeType.CriticalDamage];
    const { points } = get(attributes(AttributeType.CriticalDamage));

    return getComputedStatistic({ amount: points, base, increment });
  },
  key: "criticalDamage",
});

export const criticalRating = selector({
  get: ({ get }) => Math.round(get(criticalChance) * get(criticalDamage) * 100),
  key: "criticalRating",
});

export const damage = selector({
  get: ({ get }) => {
    const { base, increment } = ATTRIBUTES[AttributeType.Damage];
    const { points } = get(attributes(AttributeType.Damage));

    return getComputedStatistic({ amount: points, base, increment }) + get(weapon).damage;
  },
  key: "damage",
});

export const damagePerSecond = selector({
  get: ({ get }) =>
    getDamagePerRate({
      damage: get(damage),
      damageModifier: get(criticalDamage),
      damageModifierChance: get(criticalChance),
      rate: get(attackRate),
    }),
  key: "damagePerSecond",
});

export const deflectionChance = selector({
  get: ({ get }) => get(armor).deflectionChance || 0,
  key: "deflectionChance",
});

export const dodgeChance = selector({
  get: ({ get }) => {
    const { base, increment } = ATTRIBUTES[AttributeType.DodgeChance];
    const { points } = get(attributes(AttributeType.DodgeChance));

    const statistic = getComputedStatistic({ amount: points, base, increment });
    const penalty = get(armor).penalty || 0 * statistic;

    return statistic - penalty;
  },
  key: "dodgeChance",
});

export const freeBlockChance = selector({
  get: ({ get }) => {
    const { base, increment } = MASTERIES[MasteryType.FreeBlockChance];
    const { rank } = get(masteries(MasteryType.FreeBlockChance));

    return getComputedStatistic({ amount: rank, base, increment });
  },
  key: "freeBlockChance",
});

export const healthRegenerationAmount = selector({
  get: ({ get }) => {
    const { base, increment } = ATTRIBUTES[AttributeType.ReserveRegenerationAmount];
    const { points } = get(attributes(AttributeType.ReserveRegenerationAmount));

    return 4 + getComputedStatistic({ amount: points, base, increment });
  },
  key: "healthRegenerationAmount",
});

export const healthRegenerationRate = selector({
  get: ({ get }) => {
    const { base, increment } = ATTRIBUTES[AttributeType.ReserveRegenerationRate];
    const { points } = get(attributes(AttributeType.ReserveRegenerationRate));

    return Math.round(
      REGENERATION_RATE_HEALTH -
        REGENERATION_RATE_HEALTH * getComputedStatistic({ amount: points, base, increment })
    );
  },
  key: "healthRegenerationRate",
});

export const parryAbsorption = selector({
  get: ({ get }) => {
    const { base, increment } = MASTERIES[MasteryType.ParryFactor];
    const { rank } = get(masteries(MasteryType.ParryFactor));

    return 0.33 + getComputedStatistic({ amount: rank, base, increment });
  },
  key: "parryAbsorption",
});

export const parryChance = selector({
  get: ({ get }) => {
    const { abilityChance, weaponClass } = get(weapon);

    if (weaponClass === WeaponClass.Slashing && abilityChance > 0) {
      return abilityChance;
    }

    return 0;
  },
  key: "parryChance",
});

export const parryDamage = selector({
  get: ({ get }) => {
    const { base, increment } = MASTERIES[MasteryType.ParryFactor];
    const { rank } = get(masteries(MasteryType.ParryFactor));

    return 0.25 + getComputedStatistic({ amount: rank, base, increment });
  },
  key: "parryDamage",
});

export const protection = selector({
  get: ({ get }) => get(armor).protection,
  key: "protection",
});

export const recoveryRate = selector({
  get: ({ get }) => {
    const { base, increment } = ATTRIBUTES[AttributeType.RecoveryRate];
    const { points } = get(attributes(AttributeType.RecoveryRate));

    return getComputedStatistic({ amount: points, base, increment });
  },
  key: "recoveryRate",
});

export const skipRecoveryChance = selector({
  get: ({ get }) => {
    const { base, increment } = MASTERIES[MasteryType.SkipRecoveryChance];
    const { rank } = get(masteries(MasteryType.SkipRecoveryChance));

    return getComputedStatistic({ amount: rank, base, increment });
  },
  key: "skipRecoveryChance",
});

export const staggerChanceWeapon = selector({
  get: ({ get }) => {
    const { abilityChance, weaponClass } = get(weapon);

    return weaponClass === WeaponClass.Blunt ? abilityChance : 0;
  },
  key: "staggerChanceWeapon",
});

export const staggerDuration = selector({
  get: ({ get }) => {
    const { base, increment } = MASTERIES[MasteryType.StaggerDuration];
    const { rank } = get(masteries(MasteryType.StaggerDuration));

    return getComputedStatistic({ amount: rank, base, increment });
  },
  key: "staggerDuration",
});

export const staggerRating = selector({
  get: ({ get }) => {
    const staggerDurationValue = get(staggerDuration);

    return Math.round(
      get(shield).staggerChance * staggerDurationValue +
        get(staggerChanceWeapon) * staggerDurationValue
    );
  },
  key: "staggerRating",
});

export const staminaRegenerationAmount = selector({
  get: ({ get }) => {
    const { base, increment } = ATTRIBUTES[AttributeType.ReserveRegenerationAmount];
    const { points } = get(attributes(AttributeType.ReserveRegenerationAmount));

    return 2 + getComputedStatistic({ amount: points, base, increment });
  },
  key: "staminaRegenerationAmount",
});

export const staminaRegenerationRate = selector({
  get: ({ get }) => {
    const { base, increment } = ATTRIBUTES[AttributeType.ReserveRegenerationAmount];
    const { points } = get(attributes(AttributeType.ReserveRegenerationAmount));

    return Math.round(
      REGENERATION_RATE_STAMINA -
        REGENERATION_RATE_STAMINA * getComputedStatistic({ amount: points, base, increment })
    );
  },
  key: "staminaRegenerationRate",
});
