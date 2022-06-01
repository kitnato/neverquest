import { atom } from "jotai";
import { atomWithReset } from "jotai/utils";

import LOCRA from "locra";
import { CreatureType } from "locra/types";
import { deltaHealthMonster } from "neverquest/state/deltas";
import { level, nsfw, progress } from "neverquest/state/global";
import { FloatingTextType } from "neverquest/types/ui";
import { getDamagePerSecond } from "neverquest/utilities/helpers";

// PRIMITIVES

export const currentHealthMonster = atomWithReset(-1);

export const isMonsterEngaged = atomWithReset(false);

export const isMonsterStaggered = atomWithReset(false);

export const monsterName = atomWithReset("");

export const monsterStatusElement = atomWithReset<HTMLDivElement | null>(null);

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

  return Math.ceil(levelValue * 1.75) + Math.floor(progressValue / 2);
});

export const monsterLoot = atom((get) => {
  const levelValue = get(level);
  const progressValue = get(progress);

  return {
    essence: Math.floor(progressValue * 0.5 + levelValue * 2.5),
    scrap: Math.floor(progressValue * 1.2 + levelValue * 1.75),
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

// WRITERS

export const monsterCreate = atom(null, (get, set) => {
  set(
    monsterName,
    LOCRA.generateCreature({
      isNSFW: get(nsfw),
      hasPrefix: Math.random() < 0.8,
      hasSuffix: Math.random() < 0.1 * Math.ceil(get(level) / 2),
      type: CreatureType.Monster,
    })
  );

  set(isMonsterEngaged, false);
  set(currentHealthMonster, get(maximumHealthMonster));
});

export const monsterRegenerate = atom(null, (get, set) => {
  const maximumHealthMonsterValue = get(maximumHealthMonster);
  const difference = maximumHealthMonsterValue - get(currentHealthMonster);

  if (difference > 0) {
    set(deltaHealthMonster, {
      color: FloatingTextType.Positive,
      value: `+${difference}`,
    });
  }

  set(currentHealthMonster, maximumHealthMonsterValue);
});
