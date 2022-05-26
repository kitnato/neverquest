import { atom } from "jotai";
import { atomWithReset } from "jotai/utils";

import {
  attackRateBonus,
  criticalChance,
  criticalDamage,
  damage,
  dodgeChance,
  health,
  healthRegenerationRate,
  lootBonus,
  recoveryRate,
  stamina,
  staminaRegenerationRate,
} from "neverquest/state/attributes";
import { UNKNOWN } from "neverquest/utilities/constants";

// PRIMITIVES

export const characterLevel = atomWithReset(0);

export const experience = atomWithReset(0);

export const experienceSpent = atomWithReset(0);

export const isAttacking = atomWithReset(false);

export const isLooting = atomWithReset(false);

export const isRecovering = atomWithReset(false);

export const lootingRate = atomWithReset(2500);

export const name = atomWithReset(UNKNOWN);

export const statusElement = atomWithReset<HTMLDivElement | null>(null);

// READ-ONLY

export const attributesIncreasable = atom((get) => {
  const attackRateBonusValue = get(attackRateBonus);
  const criticalChanceValue = get(criticalChance);
  const criticalDamageValue = get(criticalDamage);
  const damageValue = get(damage);
  const dodgeChanceValue = get(dodgeChance);
  const experienceAvailableValue = get(experienceAvailable);
  const healthValue = get(health);
  const healthRegenerationRateValue = get(healthRegenerationRate);
  const lootBonusValue = get(lootBonus);
  const recoveryRateValue = get(recoveryRate);
  const staminaValue = get(stamina);
  const staminaRegenerationRateValue = get(staminaRegenerationRate);
  let increasableCount = 0;

  const allAttributes = [
    attackRateBonusValue,
    criticalChanceValue,
    criticalDamageValue,
    damageValue,
    dodgeChanceValue,
    healthValue,
    healthRegenerationRateValue,
    lootBonusValue,
    recoveryRateValue,
    staminaValue,
    staminaRegenerationRateValue,
  ];

  allAttributes.forEach(({ cost }) => {
    if (cost <= experienceAvailableValue) {
      increasableCount += 1;
    }
  });

  return increasableCount;
});

export const experienceAvailable = atom((get) => {
  const experienceValue = get(experience);
  const experienceSpentValue = get(experienceSpent);

  return experienceValue - experienceSpentValue;
});
