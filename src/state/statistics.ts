import { selector } from "recoil";

import { BLEED_DURATION } from "@neverquest/constants";
import { ATTRIBUTES } from "@neverquest/data/attributes";
import { MASTERIES } from "@neverquest/data/masteries";
import { WeaponClass } from "@neverquest/locra/types";
import { attributes } from "@neverquest/state/attributes";
import { armor, shield, weapon } from "@neverquest/state/inventory";
import { masteries } from "@neverquest/state/masteries";
import { AttributeType, MasteryType } from "@neverquest/types/enums";
import { getComputedStatistic, getDamagePerRate } from "@neverquest/utilities/getters";

// SELECTORS

export const attackRate = selector({
  get: ({ get }) => {
    const { base, increment } = ATTRIBUTES[AttributeType.AttackRate];
    const { points } = get(attributes(AttributeType.AttackRate));

    const statistic = get(weapon).rate * (1 - getComputedStatistic({ base, increment, points }));
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

    return getComputedStatistic({ base, increment, points: rank });
  },
  key: "bleedDamage",
});

export const bleedDamageDelta = selector({
  get: ({ get }) => Math.ceil((get(damage) * get(bleedDamage)) / BLEED_DURATION),
  key: "bleedDamageDelta",
});

export const blockChance = selector({
  get: ({ get }) => get(shield).blockChance,
  key: "blockChance",
});

export const criticalChance = selector({
  get: ({ get }) => {
    const { base, increment } = ATTRIBUTES[AttributeType.CriticalChance];
    const { points } = get(attributes(AttributeType.CriticalChance));

    return getComputedStatistic({ base, increment, points });
  },
  key: "criticalChance",
});

export const criticalDamage = selector({
  get: ({ get }) => {
    const { base, increment } = ATTRIBUTES[AttributeType.CriticalDamage];
    const { points } = get(attributes(AttributeType.CriticalDamage));

    return getComputedStatistic({ base, increment, points });
  },
  key: "criticalDamage",
});

export const damage = selector({
  get: ({ get }) => {
    const { base, increment } = ATTRIBUTES[AttributeType.Damage];
    const { points } = get(attributes(AttributeType.Damage));

    return getComputedStatistic({ base, increment, points }) + get(weapon).damage;
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

// TODO
export const deflection = selector({
  get: ({ get }) => get(armor).deflection || 0,
  key: "deflection",
});

export const dodgeChance = selector({
  get: ({ get }) => {
    const { base, increment } = ATTRIBUTES[AttributeType.DodgeChance];
    const { points } = get(attributes(AttributeType.DodgeChance));

    const statistic = getComputedStatistic({ base, increment, points });
    const penalty = get(armor).penalty || 0 * statistic;

    return statistic - penalty;
  },
  key: "dodgeChance",
});

export const freeBlockChance = selector({
  get: ({ get }) => {
    const { base, increment } = MASTERIES[MasteryType.FreeBlockChance];
    const { rank } = get(masteries(MasteryType.FreeBlockChance));

    return getComputedStatistic({ base, increment, points: rank });
  },
  key: "freeBlockChance",
});

export const healthRegenerationRate = selector({
  get: ({ get }) => {
    const { base, increment } = ATTRIBUTES[AttributeType.HealthRegenerationRate];
    const { points } = get(attributes(AttributeType.HealthRegenerationRate));

    return getComputedStatistic({ base, increment, points });
  },
  key: "healthRegenerationRate",
});

export const parryAbsorption = selector({
  get: ({ get }) => {
    const { base, increment } = MASTERIES[MasteryType.ParryDamage];
    const { rank } = get(masteries(MasteryType.ParryDamage));

    return 0.33 + getComputedStatistic({ base, increment, points: rank });
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
    const { base, increment } = MASTERIES[MasteryType.ParryDamage];
    const { rank } = get(masteries(MasteryType.ParryDamage));

    return 0.25 + getComputedStatistic({ base, increment, points: rank });
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

    return getComputedStatistic({ base, increment, points });
  },
  key: "recoveryRate",
});

export const skipRecoveryChance = selector({
  get: ({ get }) => {
    const { base, increment } = MASTERIES[MasteryType.SkipRecoveryChance];
    const { rank } = get(masteries(MasteryType.SkipRecoveryChance));

    return getComputedStatistic({ base, increment, points: rank });
  },
  key: "skipRecoveryChance",
});

export const staminaRegenerationRate = selector({
  get: ({ get }) => {
    const { base, increment } = ATTRIBUTES[AttributeType.StaminaRegenerationRate];
    const { points } = get(attributes(AttributeType.StaminaRegenerationRate));

    return getComputedStatistic({ base, increment, points });
  },
  key: "staminaRegenerationRate",
});

export const staggerDuration = selector({
  get: ({ get }) => {
    const { base, increment } = MASTERIES[MasteryType.StaggerDuration];
    const { rank } = get(masteries(MasteryType.StaggerDuration));

    return getComputedStatistic({ base, increment, points: rank });
  },
  key: "staggerDuration",
});
