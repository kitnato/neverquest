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
import { armor, weapon } from "neverquest/state/inventory";
import { getComputedStat, getDamagePerSecond } from "neverquest/utilities/helpers";

export const damagePerSecond = selector({
  key: "damagePerSecond",
  get: ({ get }) => {
    const totalAttackRateValue = get(totalAttackRate);
    const totalDamageValue = get(totalDamage);

    return getDamagePerSecond({
      damage: totalDamageValue,
      rate: totalAttackRateValue,
    });
  },
});

export const totalProtection = selector({
  key: "totalProtection",
  get: ({ get }) => {
    const armorValue = get(armor);

    return armorValue.protection;
  },
});

export const totalAttackRate = selector({
  key: "totalAttackRate",
  get: ({ get }) => {
    const attackRateBonusValue = get(attackRateBonus);
    const weaponValue = get(weapon);

    const bonus = getComputedStat(attackRateBonusValue);

    return weaponValue.rate * (1 - bonus);
  },
});

export const totalCriticalChance = selector({
  key: "totalCriticalChance",
  get: ({ get }) => {
    const criticalChanceValue = get(criticalChance);

    return getComputedStat(criticalChanceValue);
  },
});

export const totalCriticalDamage = selector({
  key: "totalCriticalDamage",
  get: ({ get }) => {
    const criticalDamageValue = get(criticalDamage);

    return getComputedStat(criticalDamageValue);
  },
});

export const totalDamage = selector({
  key: "totalDamage",
  get: ({ get }) => {
    const damageValue = get(damage);
    const weaponValue = get(weapon);

    return weaponValue.damage + getComputedStat(damageValue);
  },
});

export const totalDodgeChance = selector({
  key: "totalDodgeChance",
  get: ({ get }) => {
    const dodgeChanceValue = get(dodgeChance);

    return getComputedStat(dodgeChanceValue);
  },
});

export const totalHealthRegenerationRate = selector({
  key: "totalHealthRegenerationRate",
  get: ({ get }) => {
    const healthRegenerationRateValue = get(healthRegenerationRate);

    return getComputedStat(healthRegenerationRateValue);
  },
});

export const totalPhysicalResistance = selector({
  key: "totalPhysicalResistance",
  get: ({ get }) => {
    const physicalResistanceValue = get(physicalResistance);

    return getComputedStat(physicalResistanceValue);
  },
});

export const totalRecoveryRate = selector({
  key: "totalRecoveryRate",
  get: ({ get }) => {
    const recoveryRateValue = get(recoveryRate);

    return getComputedStat(recoveryRateValue);
  },
});

export const totalStaminaRegenerationRate = selector({
  key: "totalStaminaRegenerationRate",
  get: ({ get }) => {
    const staminaRegenerationRateValue = get(staminaRegenerationRate);

    return getComputedStat(staminaRegenerationRateValue);
  },
});
