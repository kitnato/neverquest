import { selector } from "recoil";

import { ATTRIBUTES } from "@neverquest/constants/attributes";
import { attributes } from "@neverquest/state/attributes";
import { armor, shield, weapon } from "@neverquest/state/inventory";
import { getComputedStat, getDamagePerSecond } from "@neverquest/utilities/helpers";
import { AttributeType } from "@neverquest/types/enums";

export const damagePerSecond = selector({
  key: "damagePerSecond",
  get: ({ get }) =>
    getDamagePerSecond({
      damage: get(totalDamage),
      criticalChance: get(totalCriticalChance),
      criticalDamage: get(totalCriticalDamage),
      rate: get(totalAttackRate),
    }),
});

export const totalAttackRate = selector({
  key: "totalAttackRate",
  get: ({ get }) => {
    const { points } = get(attributes(AttributeType.AttackRate));

    const { base, increment } = ATTRIBUTES[AttributeType.AttackRate];

    return get(weapon).rate * (1 - getComputedStat({ base, increment, points }));
  },
});

export const totalDamage = selector({
  key: "totalDamage",
  get: ({ get }) => {
    const { points } = get(attributes(AttributeType.Damage));

    const { base, increment } = ATTRIBUTES[AttributeType.Damage];

    return get(weapon).damage + getComputedStat({ base, increment, points });
  },
});

export const totalBlockChance = selector({
  key: "totalBlockChance",
  get: ({ get }) => get(shield).block,
});

export const totalProtection = selector({
  key: "totalProtection",
  get: ({ get }) => get(armor).protection,
});

export const totalStaggerDuration = selector({
  key: "totalStaggerDuration",
  get: ({ get }) => {
    const { points } = get(attributes(AttributeType.StaggerDuration));

    const { base, increment } = ATTRIBUTES[AttributeType.StaggerDuration];

    return getComputedStat({ base, increment, points }) + get(shield).stagger;
  },
});

// TODO - combine into selectorFamily?

export const totalBleedDamage = selector({
  key: "totalBleedDamage",
  get: ({ get }) => {
    const { points } = get(attributes(AttributeType.BleedDamage));

    const { base, increment } = ATTRIBUTES[AttributeType.BleedDamage];

    return getComputedStat({ base, increment, points });
  },
});

export const totalCriticalChance = selector({
  key: "totalCriticalChance",
  get: ({ get }) => {
    const { points } = get(attributes(AttributeType.CriticalChance));

    const { base, increment } = ATTRIBUTES[AttributeType.CriticalChance];

    return getComputedStat({ base, increment, points });
  },
});

export const totalCriticalDamage = selector({
  key: "totalCriticalDamage",
  get: ({ get }) => {
    const { points } = get(attributes(AttributeType.CriticalDamage));

    const { base, increment } = ATTRIBUTES[AttributeType.CriticalDamage];

    return getComputedStat({ base, increment, points });
  },
});

export const totalDodgeChance = selector({
  key: "totalDodgeChance",
  get: ({ get }) => {
    const { points } = get(attributes(AttributeType.DodgeChance));

    const { base, increment } = ATTRIBUTES[AttributeType.DodgeChance];

    return getComputedStat({ base, increment, points });
  },
});

export const totalHealthRegenerationRate = selector({
  key: "totalHealthRegenerationRate",
  get: ({ get }) => {
    const { points } = get(attributes(AttributeType.HealthRegenerationRate));

    const { base, increment } = ATTRIBUTES[AttributeType.HealthRegenerationRate];

    return getComputedStat({ base, increment, points });
  },
});

export const totalParryChance = selector({
  key: "totalParryChance",
  get: ({ get }) => {
    const { points } = get(attributes(AttributeType.ParryChance));

    const { base, increment } = ATTRIBUTES[AttributeType.ParryChance];

    return getComputedStat({ base, increment, points });
  },
});

export const totalRecoveryRate = selector({
  key: "totalRecoveryRate",
  get: ({ get }) => {
    const { points } = get(attributes(AttributeType.RecoveryRate));

    const { base, increment } = ATTRIBUTES[AttributeType.RecoveryRate];

    return getComputedStat({ base, increment, points });
  },
});

export const totalStaminaRegenerationRate = selector({
  key: "totalStaminaRegenerationRate",
  get: ({ get }) => {
    const { points } = get(attributes(AttributeType.StaminaRegenerationRate));

    const { base, increment } = ATTRIBUTES[AttributeType.StaminaRegenerationRate];

    return getComputedStat({ base, increment, points });
  },
});
