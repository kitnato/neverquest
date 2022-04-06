import { selector } from "recoil";

import {
  attackRateBonus,
  criticalChance,
  criticalDamage,
  damage,
  dodgeChance,
  healthRegenerationRate,
  physicalResistance,
  recoveryRate,
  staminaRegenerationRate,
} from "neverquest/state/attributes";
import { armor, weapon } from "neverquest/state/equipment";

export const totalArmor = selector({
  key: "totalArmor",
  get: ({ get }) => {
    // TODO
    const armorValue = get(armor);

    return armorValue.value;
  },
});

export const totalAttackRate = selector({
  key: "totalAttackRate",
  get: ({ get }) => {
    const attackRateBonusValue = get(attackRateBonus);
    const weaponValue = get(weapon);

    const { base, increment, points } = attackRateBonusValue;
    const bonus = base + increment * points;

    return weaponValue.rate * (1 - bonus);
  },
});

export const totalCriticalChance = selector({
  key: "totalCriticalChance",
  get: ({ get }) => {
    const criticalChanceValue = get(criticalChance);

    const { base, increment, points } = criticalChanceValue;

    return base + increment * points;
  },
});

export const totalCriticalDamage = selector({
  key: "totalCriticalDamage",
  get: ({ get }) => {
    const criticalDamageValue = get(criticalDamage);

    const { base, increment, points } = criticalDamageValue;

    return base + increment * points;
  },
});

export const totalDamage = selector({
  key: "totalDamage",
  get: ({ get }) => {
    const damageValue = get(damage);
    const weaponValue = get(weapon);

    const { base, increment, points } = damageValue;

    return weaponValue.damage + base + increment * points;
  },
});

export const totalDodgeChance = selector({
  key: "totalDodgeChance",
  get: ({ get }) => {
    const dodgeChanceValue = get(dodgeChance);

    const { base, increment, points } = dodgeChanceValue;

    return base + increment * points;
  },
});

export const totalHealthRegenerationRate = selector({
  key: "totalHealthRegenerationRate",
  get: ({ get }) => {
    const healthRegenerationRateValue = get(healthRegenerationRate);

    const { base, increment, points } = healthRegenerationRateValue;

    return base + increment * points;
  },
});

export const totalPhysicalResistance = selector({
  key: "totalPhysicalResistance",
  get: ({ get }) => {
    const physicalResistanceValue = get(physicalResistance);

    const { base, increment, points } = physicalResistanceValue;

    return base + increment * points;
  },
});

export const totalRecoveryRate = selector({
  key: "totalRecoveryRate",
  get: ({ get }) => {
    const recoveryRateValue = get(recoveryRate);

    const { base, increment, points } = recoveryRateValue;

    return base + increment * points;
  },
});

export const totalStaminaRegenerationRate = selector({
  key: "totalStaminaRegenerationRate",
  get: ({ get }) => {
    const staminaRegenerationRateValue = get(staminaRegenerationRate);

    const { base, increment, points } = staminaRegenerationRateValue;

    return base + increment * points;
  },
});
