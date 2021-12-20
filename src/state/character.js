import { atom, selector } from "recoil";

import { totalAttackRate, totalDamage } from "state/stats";

// ATOMS

export const characterLevel = atom({
  key: "characterLevel",
  default: 0,
});

export const damageDealt = atom({
  key: "damageDealt",
  default: 0,
});

export const damageTaken = atom({
  key: "damageTaken",
  default: 0,
});

export const experience = atom({
  key: "experience",
  default: {
    spent: 0,
    total: 0,
  },
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

export const attributesAvailable = selector({
  key: "attributesAvailable",
  get: ({ get }) => {
    const attributeCostValue = get(attributeCost);
    const characterLevelValue = get(characterLevel);
    const experienceValue = get(experience);
    let available = 0;
    let cumulativeCost = attributeCostValue;
    let potentialLevel = characterLevelValue + 1;

    while (cumulativeCost <= experienceValue.total - experienceValue.spent) {
      cumulativeCost += 1 + potentialLevel;
      available += 1;
      potentialLevel += 1;
    }

    return available;
  },
});

export const attributeCost = selector({
  key: "attributeCost",
  get: ({ get }) => {
    const characterLevelValue = get(characterLevel);

    return 1 + characterLevelValue;
  },
});

export const damagePerSecond = selector({
  key: "damagePerSecond",
  get: ({ get }) => {
    const totalAttackRateValue = get(totalAttackRate);
    const { min, max } = get(totalDamage);

    return ((max - min) / (totalAttackRateValue / 1000)).toFixed(2);
  },
});
