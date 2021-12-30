import { atom, selector } from "recoil";

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
