import { atom, selector } from "recoil";

import {
  attackRateBonus,
  criticalChance,
  criticalDamage,
  damage,
  dodgeChance,
  health,
  healthRegenRate,
  lootBonus,
  physicalResistance,
  recoveryRate,
  stamina,
  staminaRegenRate,
} from "state/attributes";
import { totalAttackRate, totalDamage } from "state/stats";

// ATOMS

export const characterLevel = atom({
  key: "characterLevel",
  default: 0,
});

export const experience = atom({
  key: "experience",
  default: 0,
});

export const experienceSpent = atom({
  key: "experienceSpent",
  default: 0,
});

export const isAttacking = atom({
  key: "isAttacking",
  default: false,
});

export const isRecovering = atom({
  key: "isRecovering",
  default: false,
});

export const name = atom({
  key: "name",
  default: "???",
});

// SELECTORS

export const attributesIncreasable = selector({
  key: "attributesIncreasable",
  get: ({ get }) => {
    const attackRateBonusValue = get(attackRateBonus);
    const criticalChanceValue = get(criticalChance);
    const criticalDamageValue = get(criticalDamage);
    const damageValue = get(damage);
    const dodgeChanceValue = get(dodgeChance);
    const experienceAvailableValue = get(experienceAvailable);
    const healthValue = get(health);
    const healthRegenRateValue = get(healthRegenRate);
    const lootBonusValue = get(lootBonus);
    const physicalResistanceValue = get(physicalResistance);
    const recoveryRateValue = get(recoveryRate);
    const staminaValue = get(stamina);
    const staminaRegenRateValue = get(staminaRegenRate);

    const allAttributes = [
      attackRateBonusValue,
      criticalChanceValue,
      criticalDamageValue,
      damageValue,
      dodgeChanceValue,
      healthValue,
      healthRegenRateValue,
      lootBonusValue,
      physicalResistanceValue,
      recoveryRateValue,
      staminaValue,
      staminaRegenRateValue,
    ];
    let increasableCount = 0;

    allAttributes.forEach(({ cost }) => {
      if (cost <= experienceAvailableValue) {
        increasableCount += 1;
      }
    });

    return increasableCount;
  },
});

export const damagePerSecond = selector({
  key: "damagePerSecond",
  get: ({ get }) => {
    const totalAttackRateValue = get(totalAttackRate);
    const { max, min } = get(totalDamage);

    return ((max + min) / 2 / (totalAttackRateValue / 1000)).toFixed(2);
  },
});

export const experienceAvailable = selector({
  key: "experienceAvailable",
  get: ({ get }) => {
    const experienceValue = get(experience);
    const experienceSpentValue = get(experienceSpent);

    return experienceValue - experienceSpentValue;
  },
});
