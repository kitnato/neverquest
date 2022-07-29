import { atom } from "jotai";

import { attributes } from "@neverquest/state/attributes";
import { armor, shield, weapon } from "@neverquest/state/inventory";
import { getComputedStat, getDamagePerSecond } from "@neverquest/utilities/helpers";
import { AttributeType } from "@neverquest/types/enums";
import { ATTRIBUTES } from "@neverquest/utilities/constants-attributes";

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
  const { points } = get(attributes)[AttributeType.AttackRateBonus];
  const { rate } = get(weapon);

  const { base, increment } = ATTRIBUTES[AttributeType.AttackRateBonus];

  const bonus = getComputedStat({ base, increment, points });

  return rate * (1 - bonus);
});

export const totalBlockChance = atom((get) => {
  const shieldValue = get(shield);

  return shieldValue.block;
});

export const totalCriticalChance = atom((get) => {
  const { points } = get(attributes)[AttributeType.CriticalChance];

  const { base, increment } = ATTRIBUTES[AttributeType.CriticalChance];

  return getComputedStat({ base, increment, points });
});

export const totalCriticalDamage = atom((get) => {
  const { points } = get(attributes)[AttributeType.CriticalDamage];

  const { base, increment } = ATTRIBUTES[AttributeType.CriticalDamage];

  return getComputedStat({ base, increment, points });
});

export const totalDamage = atom((get) => {
  const { points } = get(attributes)[AttributeType.Damage];
  const weaponValue = get(weapon);

  const { base, increment } = ATTRIBUTES[AttributeType.Damage];

  return weaponValue.damage + getComputedStat({ base, increment, points });
});

export const totalDodgeChance = atom((get) => {
  const { points } = get(attributes)[AttributeType.DodgeChance];

  const { base, increment } = ATTRIBUTES[AttributeType.DodgeChance];

  return getComputedStat({ base, increment, points });
});

export const totalHealthRegenerationRate = atom((get) => {
  const { points } = get(attributes)[AttributeType.HealthRegenerationRate];

  const { base, increment } = ATTRIBUTES[AttributeType.HealthRegenerationRate];

  return getComputedStat({ base, increment, points });
});

export const totalProtection = atom((get) => {
  const armorValue = get(armor);

  return armorValue.protection;
});

export const totalRecoveryRate = atom((get) => {
  const { points } = get(attributes)[AttributeType.RecoveryRate];

  const { base, increment } = ATTRIBUTES[AttributeType.RecoveryRate];

  return getComputedStat({ base, increment, points });
});

export const totalStaggerRate = atom((get) => {
  const shieldValue = get(shield);

  return shieldValue.stagger;
});

export const totalStaminaRegenerationRate = atom((get) => {
  const { points } = get(attributes)[AttributeType.StaminaRegenerationRate];

  const { base, increment } = ATTRIBUTES[AttributeType.StaminaRegenerationRate];

  return getComputedStat({ base, increment, points });
});
