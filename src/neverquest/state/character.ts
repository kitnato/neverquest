import { atom, selector } from "recoil";

import {
  attackRateBonus,
  criticalChance,
  criticalDamage,
  damage,
  dodgeChance,
  health,
  healthRegenerationRate,
  lootBonus,
  physicalResistance,
  recoveryRate,
  stamina,
  staminaRegenerationRate,
} from "neverquest/state/attributes";
import { UNKNOWN } from "neverquest/utilities/constants";

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

export const isLooting = atom({
  key: "isLooting",
  default: false,
});

export const isRecovering = atom({
  key: "isRecovering",
  default: false,
});

export const lootingRate = atom({
  key: "lootingRate",
  default: 2500,
});

export const name = atom({
  key: "name",
  default: UNKNOWN,
});

export const statusElement = atom<HTMLDivElement | null>({
  key: "statusElement",
  default: null,
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
    const healthRegenerationRateValue = get(healthRegenerationRate);
    const lootBonusValue = get(lootBonus);
    const physicalResistanceValue = get(physicalResistance);
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
      physicalResistanceValue,
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
