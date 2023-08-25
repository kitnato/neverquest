import { atom, atomFamily, selector, selectorFamily } from "recoil";

import { BLIGHT, ELEMENTAL_AILMENT_PENALTY, POISON } from "@neverquest/data/combat";
import { ELEMENTALS } from "@neverquest/data/inventory";
import {
  BOSS_STAGE_INTERVAL,
  BOSS_STAGE_START,
  LOOT,
  MONSTER_ATTACK_RATE,
  MONSTER_DAMAGE,
  MONSTER_HEALTH,
} from "@neverquest/data/monster";
import { handleLocalStorage, withStateKey } from "@neverquest/state";
import { isBoss, isStageStarted, progress, stage } from "@neverquest/state/encounter";
import { weapon, weaponElementalEffects } from "@neverquest/state/inventory";
import { skills } from "@neverquest/state/skills";
import { lootBonus } from "@neverquest/state/statistics";
import {
  ELEMENTAL_TYPES,
  MONSTER_AILMENT_TYPES,
  type MonsterAilment,
} from "@neverquest/types/unions";
import { formatFloat } from "@neverquest/utilities/formatters";
import {
  getDamagePerRate,
  getGrowthMonsterPower,
  getGrowthSigmoid,
} from "@neverquest/utilities/getters";

// SELECTORS

export const canReceiveAilment = withStateKey("canReceiveAilment", (key) =>
  selectorFamily<boolean, MonsterAilment>({
    get:
      (type) =>
      ({ get }) => {
        const { abilityChance, gearClass } = get(weapon);

        switch (type) {
          case "bleeding": {
            return get(skills("anatomy")) && abilityChance > 0 && gearClass === "piercing";
          }

          case "staggered": {
            return get(skills("traumatology")) && abilityChance > 0 && gearClass === "blunt";
          }

          default: {
            const elemental = ELEMENTAL_TYPES.find(
              (current) => ELEMENTALS[current].ailment === type,
            );

            // TODO - add armor thorns check
            return elemental === undefined
              ? false
              : get(weaponElementalEffects)[elemental].duration > 0;
          }
        }
      },
    key,
  }),
);

export const canReceiveAilments = withStateKey("canReceiveAilments", (key) =>
  selector({
    get: ({ get }) => MONSTER_AILMENT_TYPES.some((current) => get(canReceiveAilment(current))),
    key,
  }),
);

export const isMonsterAiling = withStateKey("isMonsterAiling", (key) =>
  selectorFamily<boolean, MonsterAilment>({
    get:
      (type) =>
      ({ get }) =>
        get(monsterAilmentDuration(type)) > 0,
    key,
  }),
);

export const isMonsterDead = withStateKey("isMonsterDead", (key) =>
  selector({
    get: ({ get }) => get(isStageStarted) && get(monsterHealth) === 0,
    key,
  }),
);

export const monsterAttackRate = withStateKey("monsterAttackRate", (key) =>
  selector({
    get: ({ get }) => {
      const { base, bonus, boss, reduction } = MONSTER_ATTACK_RATE;

      return (
        (base -
          Math.round(
            (reduction * getGrowthMonsterPower(get(stage)) +
              bonus * getGrowthSigmoid(get(progress))) *
              (1 - (get(isBoss) ? boss : 0)),
          )) *
        (get(isMonsterAiling("frozen")) ? ELEMENTAL_AILMENT_PENALTY.frozen : 1)
      );
    },
    key,
  }),
);

export const monsterBlightChance = withStateKey("monsterBlightChance", (key) =>
  selector({
    get: ({ get }) => {
      const stageValue = get(stage);

      const { boss, chanceBase, chanceMaximum, stageRequired } = BLIGHT;

      if (stageValue < stageRequired) {
        return 0;
      }

      return (
        (chanceBase + chanceMaximum * getGrowthMonsterPower(stageValue)) *
        (1 + (get(isBoss) ? boss : 0))
      );
    },
    key,
  }),
);

export const monsterDamage = withStateKey("monsterDamage", (key) =>
  selector({
    get: ({ get }) => {
      const { base, bonus, boss, maximum } = MONSTER_DAMAGE;

      return (
        base +
        Math.round(
          (maximum * getGrowthMonsterPower(get(stage)) + bonus * getGrowthSigmoid(get(progress))) *
            (1 + (get(isBoss) ? boss : 0)) *
            (get(isMonsterAiling("shocked")) ? ELEMENTAL_AILMENT_PENALTY.shocked : 1),
        )
      );
    },
    key,
  }),
);

export const monsterDamagePerSecond = withStateKey("monsterDamagePerSecond", (key) =>
  selector({
    get: ({ get }) =>
      formatFloat(
        getDamagePerRate({
          damage: get(monsterDamage),
          rate: get(monsterAttackRate),
        }),
      ),
    key,
  }),
);

export const monsterHealthMaximum = withStateKey("monsterHealthMaximum", (key) =>
  selector({
    get: ({ get }) => {
      const { base, bonus, boss, maximum } = MONSTER_HEALTH;

      return (
        base +
        Math.round(
          (maximum * getGrowthMonsterPower(get(stage)) + bonus * getGrowthSigmoid(get(progress))) *
            (1 + (get(isBoss) ? boss : 0)),
        )
      );
    },
    key,
  }),
);

export const monsterPoisonChance = withStateKey("monsterPoisonChance", (key) =>
  selector({
    get: ({ get }) => {
      const stageValue = get(stage);

      const { boss, chanceBase, chanceMaximum, stageRequired } = POISON;

      if (stageValue < stageRequired) {
        return 0;
      }

      return (
        (chanceBase + chanceMaximum * getGrowthMonsterPower(stageValue)) *
        (1 + (get(isBoss) ? boss : 0))
      );
    },
    key,
  }),
);

export const monsterPoisonLength = withStateKey("monsterPoisonLength", (key) =>
  selector({
    get: ({ get }) => {
      const { durationBase, durationMaximum } = POISON;

      return durationBase + durationMaximum * getGrowthMonsterPower(get(stage));
    },
    key,
  }),
);

export const monsterPoisonMagnitude = withStateKey("monsterPoisonMagnitude", (key) =>
  selector({
    get: ({ get }) => {
      const { magnitudeBase, magnitudeMaximum } = POISON;

      return magnitudeBase + magnitudeMaximum * getGrowthMonsterPower(get(stage));
    },
    key,
  }),
);

export const monsterLoot = withStateKey("monsterLoot", (key) =>
  selector({
    get: ({ get }) => {
      const { bonus, boss, coinsBase, essenceBase, scrapBase } = LOOT;

      const isBossValue = get(isBoss);
      const stageValue = get(stage);
      const growthFactor = getGrowthMonsterPower(stageValue);
      const progressBonus = getGrowthSigmoid(get(progress)) * bonus;
      const totalBonus = (1 + get(lootBonus)) * (1 + (isBossValue ? boss : 0));

      return {
        coins: Math.round((progressBonus + coinsBase * growthFactor) * totalBonus),
        essence: Math.round((progressBonus + essenceBase * growthFactor) * totalBonus),
        gems: isBossValue ? 1 + (stageValue - BOSS_STAGE_START) / BOSS_STAGE_INTERVAL : 0,
        scrap: Math.round((progressBonus + scrapBase * growthFactor) * totalBonus),
      };
    },
    key,
  }),
);

// ATOMS

export const isMonsterNew = withStateKey("isMonsterNew", (key) =>
  atom({
    default: false,
    effects: [handleLocalStorage<boolean>({ key })],
    key,
  }),
);

export const monsterAilmentDuration = withStateKey("monsterAilmentDuration", (key) =>
  atomFamily<number, MonsterAilment>({
    default: 0,
    effects: (parameter) => [handleLocalStorage<number>({ key, parameter })],
    key,
  }),
);

export const monsterAttackDuration = withStateKey("monsterAttackDuration", (key) =>
  atom({
    default: 0,
    effects: [handleLocalStorage<number>({ key })],
    key,
  }),
);

export const monsterElement = withStateKey("monsterElement", (key) =>
  atom<HTMLDivElement | null>({
    default: null,
    effects: [handleLocalStorage<HTMLDivElement | null>({ key })],
    key,
  }),
);

export const monsterHealth = withStateKey("monsterHealth", (key) =>
  atom({
    default: monsterHealthMaximum,
    effects: [handleLocalStorage<number>({ key })],
    key,
  }),
);

export const monsterName = withStateKey("monsterName", (key) =>
  atom({
    default: null,
    effects: [handleLocalStorage<string | null>({ key })],
    key,
  }),
);
