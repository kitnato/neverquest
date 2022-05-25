import { atom } from "jotai";
import { atomWithReset } from "jotai/utils";

import { level, progress } from "neverquest/state/global";
import { getDamagePerSecond } from "neverquest/utilities/helpers";

// PRIMITIVES

export const currentHealthMonster = atomWithReset(-1);

export const isMonsterEngaged = atom(false);

export const isMonsterStaggered = atom(false);

// TODO - determines whether Monster has Coins as loot
export const hasTreasure = atom(false);

export const monsterName = atom("");

export const monsterStatusElement = atom<HTMLDivElement | null>(null);

// READERS

export const isMonsterDead = atom((get) => {
  const currentHealthMonsterValue = get(currentHealthMonster);

  return currentHealthMonsterValue === 0;
});

export const damagePerSecondMonster = atom((get) => {
  const totalAttackRateMonsterValue = get(totalAttackRateMonster);
  const totalDamageMonsterValue = get(totalDamageMonster);

  return getDamagePerSecond({
    damage: totalDamageMonsterValue,
    rate: totalAttackRateMonsterValue,
  });
});

export const maximumHealthMonster = atom((get) => {
  const levelValue = get(level);
  const progressValue = get(progress);

  return Math.ceil(levelValue * 2) + Math.floor(progressValue / 2) + 1;
});

export const monsterLoot = atom((get) => {
  const hasTreasureValue = get(hasTreasure);
  const levelValue = get(level);
  const progressValue = get(progress);

  return {
    aether: levelValue >= 10 ? Math.ceil(levelValue + progressValue / 3) : 0,
    coins: hasTreasureValue ? progressValue + Math.ceil(levelValue * 1.5) : 0,
    experience: Math.floor(progressValue + levelValue * 1.5),
    scrap: Math.floor(progressValue + levelValue * 1.5),
  };
});

export const totalAttackRateMonster = atom((get) => {
  const levelValue = get(level);
  const progressValue = get(progress);

  return 4510 - progressValue - 10 * levelValue * 2;
});

export const totalDamageMonster = atom((get) => {
  const levelValue = get(level);
  const progressValue = get(progress);

  return levelValue + Math.floor(levelValue / 2.5) + Math.floor(progressValue / 3);
});
