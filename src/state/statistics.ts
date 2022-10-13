import { selector } from "recoil";

import { ATTRIBUTES } from "@neverquest/constants/attributes";
import { attributes } from "@neverquest/state/attributes";
import { armor, shield, weapon } from "@neverquest/state/inventory";
import { AttributeType } from "@neverquest/types/enums";
import { getComputedStat, getDamagePerSecond } from "@neverquest/utilities/helpers";

export const damagePerSecond = selector({
  get: ({ get }) =>
    getDamagePerSecond({
      criticalChance: get(totalCriticalChance),
      criticalDamage: get(totalCriticalDamage),
      damage: get(totalDamage),
      rate: get(totalAttackRate),
    }),
  key: "damagePerSecond",
});

export const totalAttackRate = selector({
  get: ({ get }) => {
    const { points } = get(attributes(AttributeType.AttackRate));

    const { base, increment } = ATTRIBUTES[AttributeType.AttackRate];

    return get(weapon).rate * (1 - getComputedStat({ base, increment, points }));
  },
  key: "totalAttackRate",
});

export const totalDamage = selector({
  get: ({ get }) => {
    const { points } = get(attributes(AttributeType.Damage));

    const { base, increment } = ATTRIBUTES[AttributeType.Damage];

    return get(weapon).damage + getComputedStat({ base, increment, points });
  },
  key: "totalDamage",
});

export const totalBlockChance = selector({
  get: ({ get }) => get(shield).block,
  key: "totalBlockChance",
});

export const totalProtection = selector({
  get: ({ get }) => get(armor).protection,
  key: "totalProtection",
});

export const totalStaggerDuration = selector({
  get: ({ get }) => {
    const { points } = get(attributes(AttributeType.StaggerDuration));

    const { base, increment } = ATTRIBUTES[AttributeType.StaggerDuration];

    return getComputedStat({ base, increment, points }) + get(shield).stagger;
  },
  key: "totalStaggerDuration",
});

// TODO - combine into selectorFamily?

export const totalBleedDamage = selector({
  get: ({ get }) => {
    const { points } = get(attributes(AttributeType.BleedDamage));

    const { base, increment } = ATTRIBUTES[AttributeType.BleedDamage];

    return getComputedStat({ base, increment, points });
  },
  key: "totalBleedDamage",
});

export const totalCriticalChance = selector({
  get: ({ get }) => {
    const { points } = get(attributes(AttributeType.CriticalChance));

    const { base, increment } = ATTRIBUTES[AttributeType.CriticalChance];

    return getComputedStat({ base, increment, points });
  },
  key: "totalCriticalChance",
});

export const totalCriticalDamage = selector({
  get: ({ get }) => {
    const { points } = get(attributes(AttributeType.CriticalDamage));

    const { base, increment } = ATTRIBUTES[AttributeType.CriticalDamage];

    return getComputedStat({ base, increment, points });
  },
  key: "totalCriticalDamage",
});

export const totalDodgeChance = selector({
  get: ({ get }) => {
    const { points } = get(attributes(AttributeType.DodgeChance));

    const { base, increment } = ATTRIBUTES[AttributeType.DodgeChance];

    return getComputedStat({ base, increment, points });
  },
  key: "totalDodgeChance",
});

export const totalHealthRegenerationRate = selector({
  get: ({ get }) => {
    const { points } = get(attributes(AttributeType.HealthRegenerationRate));

    const { base, increment } = ATTRIBUTES[AttributeType.HealthRegenerationRate];

    return getComputedStat({ base, increment, points });
  },
  key: "totalHealthRegenerationRate",
});

export const totalParryChance = selector({
  get: ({ get }) => {
    const { points } = get(attributes(AttributeType.ParryChance));

    const { base, increment } = ATTRIBUTES[AttributeType.ParryChance];

    return getComputedStat({ base, increment, points });
  },
  key: "totalParryChance",
});

export const totalRecoveryRate = selector({
  get: ({ get }) => {
    const { points } = get(attributes(AttributeType.RecoveryRate));

    const { base, increment } = ATTRIBUTES[AttributeType.RecoveryRate];

    return getComputedStat({ base, increment, points });
  },
  key: "totalRecoveryRate",
});

export const totalStaminaRegenerationRate = selector({
  get: ({ get }) => {
    const { points } = get(attributes(AttributeType.StaminaRegenerationRate));

    const { base, increment } = ATTRIBUTES[AttributeType.StaminaRegenerationRate];

    return getComputedStat({ base, increment, points });
  },
  key: "totalStaminaRegenerationRate",
});
