import { selector } from "recoil";

import { masteries } from "./masteries";
import { ATTRIBUTES, BLEED_DURATION } from "@neverquest/constants/attributes";
import { MASTERIES } from "@neverquest/constants/masteries";
import { WeaponClass } from "@neverquest/locra/types";
import { attributes } from "@neverquest/state/attributes";
import { armor, shield, weapon } from "@neverquest/state/inventory";
import { AttributeType, MasteryType } from "@neverquest/types/enums";
import { getComputedStatistic, getDamagePerRate } from "@neverquest/utilities/getters";

// SELECTORS

export const bleedDamageDelta = selector({
  get: ({ get }) => Math.ceil((get(totalDamage) * get(totalBleedDamage)) / BLEED_DURATION),
  key: "bleedDamageDelta",
});

export const damagePerSecond = selector({
  get: ({ get }) =>
    getDamagePerRate({
      damage: get(totalDamage),
      damageModifier: get(totalCriticalDamage),
      damageModifierChance: get(totalCriticalChance),
      rate: get(totalAttackRate),
    }),
  key: "damagePerSecond",
});

export const totalAttackRate = selector({
  get: ({ get }) => {
    const { base, increment } = ATTRIBUTES[AttributeType.AttackRate];
    const { points } = get(attributes(AttributeType.AttackRate));

    return get(weapon).rate * (1 - getComputedStatistic({ base, increment, points }));
  },
  key: "totalAttackRate",
});

export const totalBleedChance = selector({
  get: ({ get }) => {
    const { abilityChance, weaponClass } = get(weapon);

    if (weaponClass === WeaponClass.Piercing && abilityChance > 0) {
      return abilityChance;
    }

    return 0;
  },
  key: "totalBleedChance",
});

export const totalBleedDamage = selector({
  get: ({ get }) => {
    const { base, increment } = MASTERIES[MasteryType.BleedDamage];
    const { rank } = get(masteries(MasteryType.BleedDamage));

    return getComputedStatistic({ base, increment, points: rank });
  },
  key: "totalBleedDamage",
});

export const totalBlockChance = selector({
  get: ({ get }) => get(shield).blockChance,
  key: "totalBlockChance",
});

export const totalCriticalChance = selector({
  get: ({ get }) => {
    const { base, increment } = ATTRIBUTES[AttributeType.CriticalChance];
    const { points } = get(attributes(AttributeType.CriticalChance));

    return getComputedStatistic({ base, increment, points });
  },
  key: "totalCriticalChance",
});

export const totalCriticalDamage = selector({
  get: ({ get }) => {
    const { base, increment } = ATTRIBUTES[AttributeType.CriticalDamage];
    const { points } = get(attributes(AttributeType.CriticalDamage));

    return getComputedStatistic({ base, increment, points });
  },
  key: "totalCriticalDamage",
});

export const totalDamage = selector({
  get: ({ get }) => {
    const { base, increment } = ATTRIBUTES[AttributeType.Damage];
    const { points } = get(attributes(AttributeType.Damage));

    return getComputedStatistic({ base, increment, points }) + get(weapon).damage;
  },
  key: "totalDamage",
});

export const totalDodgeChance = selector({
  get: ({ get }) => {
    const { base, increment } = ATTRIBUTES[AttributeType.DodgeChance];
    const { points } = get(attributes(AttributeType.DodgeChance));

    return getComputedStatistic({ base, increment, points });
  },
  key: "totalDodgeChance",
});

export const totalHealthRegenerationRate = selector({
  get: ({ get }) => {
    const { base, increment } = ATTRIBUTES[AttributeType.HealthRegenerationRate];
    const { points } = get(attributes(AttributeType.HealthRegenerationRate));

    return getComputedStatistic({ base, increment, points });
  },
  key: "totalHealthRegenerationRate",
});

export const totalParryAbsorption = selector({
  get: ({ get }) => {
    const { base, increment } = MASTERIES[MasteryType.ParryDamage];
    const { rank } = get(masteries(MasteryType.ParryDamage));

    return 0.33 + getComputedStatistic({ base, increment, points: rank });
  },
  key: "totalParryAbsorption",
});

export const totalParryChance = selector({
  get: ({ get }) => {
    const { abilityChance, weaponClass } = get(weapon);

    if (weaponClass === WeaponClass.Slashing && abilityChance > 0) {
      return abilityChance;
    }

    return 0;
  },
  key: "totalParryChance",
});

export const totalParryDamage = selector({
  get: ({ get }) => {
    const { base, increment } = MASTERIES[MasteryType.ParryDamage];
    const { rank } = get(masteries(MasteryType.ParryDamage));

    return 0.25 + getComputedStatistic({ base, increment, points: rank });
  },
  key: "totalParryDamage",
});

export const totalProtection = selector({
  get: ({ get }) => get(armor).protection,
  key: "totalProtection",
});

export const totalRecoveryRate = selector({
  get: ({ get }) => {
    const { base, increment } = ATTRIBUTES[AttributeType.RecoveryRate];
    const { points } = get(attributes(AttributeType.RecoveryRate));

    return getComputedStatistic({ base, increment, points });
  },
  key: "totalRecoveryRate",
});

export const totalStaminaRegenerationRate = selector({
  get: ({ get }) => {
    const { base, increment } = ATTRIBUTES[AttributeType.StaminaRegenerationRate];
    const { points } = get(attributes(AttributeType.StaminaRegenerationRate));

    return getComputedStatistic({ base, increment, points });
  },
  key: "totalStaminaRegenerationRate",
});

export const totalStaggerDuration = selector({
  get: ({ get }) => {
    const { base, increment } = MASTERIES[MasteryType.StaggerDuration];
    const { rank } = get(masteries(MasteryType.StaggerDuration));

    return getComputedStatistic({ base, increment, points: rank });
  },
  key: "totalStaggerDuration",
});
