import { selector } from "recoil";

import {
  attackRateBonus,
  criticalChance,
  criticalDamage,
  damage,
  dodgeChance,
  healthRegenAmount,
  healthRegenRate,
  recoveryRate,
  staminaRegenAmount,
  staminaRegenRate,
} from "state/attributes";
import { armor, shield, weapon } from "state/equipment";

export const totalArmor = selector({
  key: "totalArmor",
  get: ({ get }) => {
    const armorValue = get(armor);
    const shieldValue = get(shield);

    return armorValue.value + shieldValue.armor;
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
    const bonus = base + increment * points;

    return {
      min: weaponValue.damage.min + bonus,
      max: weaponValue.damage.max + bonus,
    };
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

export const totalHealthRegenAmount = selector({
  key: "totalHealthRegenAmount",
  get: ({ get }) => {
    const healthRegenAmountValue = get(healthRegenAmount);

    const { base, increment, points } = healthRegenAmountValue;

    return base + increment * points;
  },
});

export const totalHealthRegenRate = selector({
  key: "totalHealthRegenRate",
  get: ({ get }) => {
    const healthRegenRateValue = get(healthRegenRate);

    const { base, increment, points } = healthRegenRateValue;

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

export const totalStaminaRegenAmount = selector({
  key: "totalStaminaRegenAmount",
  get: ({ get }) => {
    const staminaRegenAmountValue = get(staminaRegenAmount);

    const { base, increment, points } = staminaRegenAmountValue;

    return base + increment * points;
  },
});

export const totalStaminaRegenRate = selector({
  key: "totalStaminaRegenRate",
  get: ({ get }) => {
    const staminaRegenRateValue = get(staminaRegenRate);

    const { base, increment, points } = staminaRegenRateValue;

    return base + increment * points;
  },
});
