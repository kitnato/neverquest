import { atom } from "jotai";

import {
  attackRateBonus,
  criticalChance,
  criticalDamage,
  damage,
  dodgeChance,
  healthRegenerationRate,
  recoveryRate,
  staminaRegenerationRate,
} from "neverquest/state/attributes";
import { armor, shield, weapon } from "neverquest/state/inventory";
import { getComputedStat, getDamagePerSecond } from "neverquest/utilities/helpers";

// READERS

export const damagePerSecond = atom((get) => {
  const totalAttackRateValue = get(totalAttackRate);
  const totalDamageValue = get(totalDamage);

  return getDamagePerSecond({
    damage: totalDamageValue,
    rate: totalAttackRateValue,
  });
});

export const totalAttackRate = atom((get) => {
  const attackRateBonusValue = get(attackRateBonus);
  const { rate } = get(weapon);

  const bonus = getComputedStat(attackRateBonusValue);

  return rate * (1 - bonus);
});

export const totalBlockChance = atom((get) => {
  const shieldValue = get(shield);

  return shieldValue.block;
});

export const totalCriticalChance = atom((get) => {
  const criticalChanceValue = get(criticalChance);

  return getComputedStat(criticalChanceValue);
});

export const totalCriticalDamage = atom((get) => {
  const criticalDamageValue = get(criticalDamage);

  return getComputedStat(criticalDamageValue);
});

export const totalDamage = atom((get) => {
  const damageValue = get(damage);
  const weaponValue = get(weapon);

  return weaponValue.damage + getComputedStat(damageValue);
});

export const totalDodgeChance = atom((get) => {
  const dodgeChanceValue = get(dodgeChance);

  return getComputedStat(dodgeChanceValue);
});

export const totalHealthRegenerationRate = atom((get) => {
  const healthRegenerationRateValue = get(healthRegenerationRate);

  return getComputedStat(healthRegenerationRateValue);
});

export const totalProtection = atom((get) => {
  const armorValue = get(armor);

  return armorValue.protection;
});

export const totalRecoveryRate = atom((get) => {
  const recoveryRateValue = get(recoveryRate);

  return getComputedStat(recoveryRateValue);
});

export const totalStaggerRate = atom((get) => {
  const shieldValue = get(shield);

  return shieldValue.stagger;
});

export const totalStaminaRegenerationRate = atom((get) => {
  const staminaRegenerationRateValue = get(staminaRegenerationRate);

  return getComputedStat(staminaRegenerationRateValue);
});
