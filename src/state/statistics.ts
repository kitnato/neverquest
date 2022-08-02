import { selector } from "recoil";

import { attributes } from "@neverquest/state/attributes";
import { armor, shield, weapon } from "@neverquest/state/inventory";
import { getComputedStat, getDamagePerSecond } from "@neverquest/utilities/helpers";
import { AttributeType } from "@neverquest/types/enums";
import { ATTRIBUTES } from "@neverquest/utilities/constants-attributes";

export const damagePerSecond = selector({
  key: "damagePerSecond",
  get: ({ get }) =>
    getDamagePerSecond({
      damage: get(totalDamage),
      rate: get(totalAttackRate),
    }),
});

export const totalAttackRate = selector({
  key: "totalAttackRate",
  get: ({ get }) => {
    const { points } = get(attributes(AttributeType.AttackRateBonus));
    const { rate } = get(weapon);

    const { base, increment } = ATTRIBUTES[AttributeType.AttackRateBonus];

    return rate * (1 - getComputedStat({ base, increment, points }));
  },
});

export const totalBlockChance = selector({
  key: "totalBlockChance",
  get: ({ get }) => get(shield).block,
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

export const totalDamage = selector({
  key: "totalDamage",
  get: ({ get }) => {
    const { points } = get(attributes(AttributeType.Damage));

    const { base, increment } = ATTRIBUTES[AttributeType.Damage];

    return get(weapon).damage + getComputedStat({ base, increment, points });
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

export const totalProtection = selector({
  key: "totalProtection",
  get: ({ get }) => get(armor).protection,
});

export const totalRecoveryRate = selector({
  key: "totalRecoveryRate",
  get: ({ get }) => {
    const { points } = get(attributes(AttributeType.RecoveryRate));

    const { base, increment } = ATTRIBUTES[AttributeType.RecoveryRate];

    return getComputedStat({ base, increment, points });
  },
});

export const totalStaggerRate = selector({
  key: "totalStaggerRate",
  get: ({ get }) => get(shield).stagger,
});

export const totalStaminaRegenerationRate = selector({
  key: "totalStaminaRegenerationRate",
  get: ({ get }) => {
    const { points } = get(attributes(AttributeType.StaminaRegenerationRate));

    const { base, increment } = ATTRIBUTES[AttributeType.StaminaRegenerationRate];

    return getComputedStat({ base, increment, points });
  },
});
