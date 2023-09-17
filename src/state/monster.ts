import { atom, atomFamily, selector, selectorFamily } from "recoil";

import { ELEMENTALS } from "@neverquest/data/inventory";
import {
  BLIGHT,
  BOSS_STAGE_INTERVAL,
  BOSS_STAGE_START,
  LOOT,
  MONSTER_ATTACK_RATE,
  MONSTER_DAMAGE,
  MONSTER_HEALTH,
  POISON,
} from "@neverquest/data/monster";
import { BLEED_DELTA, ELEMENTAL_AILMENT_PENALTY } from "@neverquest/data/statistics";
import { handleLocalStorage, withStateKey } from "@neverquest/state";
import { isBoss, isStageStarted, progress, stage } from "@neverquest/state/encounter";
import { weapon } from "@neverquest/state/inventory";
import { skills } from "@neverquest/state/skills";
import { bleedDamage, lootBonus, range, totalElementalEffects } from "@neverquest/state/statistics";
import {
  ELEMENTAL_TYPES,
  MONSTER_AILMENT_TYPES,
  type MonsterAilment,
} from "@neverquest/types/unions";
import { formatFloat } from "@neverquest/utilities/formatters";
import {
  getDamagePerRate,
  getGrowthSigmoid,
  getGrowthTriangular,
} from "@neverquest/utilities/getters";

// SELECTORS

export const bleedDamageTotal = withStateKey("bleedDamageTotal", (key) =>
  selector({
    get: ({ get }) =>
      get(bleedDamage) * (get(isMonsterAiling("burning")) ? ELEMENTAL_AILMENT_PENALTY.burning : 1),
    key,
  }),
);

export const canReceiveAilment = withStateKey("canReceiveAilment", (key) =>
  selectorFamily<boolean, MonsterAilment>({
    get:
      (parameter) =>
      ({ get }) => {
        const { abilityChance, gearClass } = get(weapon);

        switch (parameter) {
          case "bleeding": {
            return get(skills("anatomy")) && abilityChance > 0 && gearClass === "piercing";
          }

          case "staggered": {
            return get(skills("traumatology")) && abilityChance > 0 && gearClass === "blunt";
          }

          default: {
            const elemental = ELEMENTAL_TYPES.find(
              (current) => ELEMENTALS[current].ailment === parameter,
            );
            const { armor, weapon } = get(totalElementalEffects);

            return elemental === undefined
              ? false
              : armor[elemental].duration > 0 || weapon[elemental].duration > 0;
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

export const hasMonsterClosed = withStateKey("hasMonsterClosed", (key) =>
  selector({
    get: ({ get }) => get(monsterDistance) === 0,
    key,
  }),
);

export const isMonsterAiling = withStateKey("isMonsterAiling", (key) =>
  selectorFamily<boolean, MonsterAilment>({
    get:
      (parameter) =>
      ({ get }) =>
        get(monsterAilmentDuration(parameter)) > 0,
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
      const { attenuation, base, bonus, boss, minimum } = MONSTER_ATTACK_RATE;
      const factor = getGrowthTriangular(get(stage)) / attenuation;

      return Math.round(
        Math.max(
          base - base * factor * (1 + get(progress) * bonus) * (get(isBoss) ? boss : 1),
          minimum,
        ),
      );
    },
    key,
  }),
);

export const monsterBlightChance = withStateKey("monsterBlightChance", (key) =>
  selector({
    get: ({ get }) => {
      const stageValue = get(stage);

      const {
        boss,
        chance: { maximum, minimum },
        stageRequired,
      } = BLIGHT;

      if (stageValue < stageRequired) {
        return 0;
      }

      return (minimum + maximum * getGrowthSigmoid(stageValue)) * (get(isBoss) ? boss : 1);
    },
    key,
  }),
);

export const monsterDamage = withStateKey("monsterDamage", (key) =>
  selector({
    get: ({ get }) => {
      const { attenuation, base, bonus, boss } = MONSTER_DAMAGE;
      const factor = getGrowthTriangular(get(stage)) / attenuation;

      return Math.round(
        (base +
          base *
            factor *
            (1 + get(progress) * bonus) *
            (get(isMonsterAiling("shocked")) ? ELEMENTAL_AILMENT_PENALTY.shocked : 1)) *
          (get(isBoss) ? boss : 1),
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
      const { attenuation, base, bonus, boss } = MONSTER_HEALTH;
      const factor = getGrowthTriangular(get(stage)) / attenuation;

      return Math.round(
        (base + base * factor * (1 + get(progress) * bonus)) * (get(isBoss) ? boss : 1),
      );
    },
    key,
  }),
);

export const monsterLoot = withStateKey("monsterLoot", (key) =>
  selector({
    get: ({ get }) => {
      const { attenuation, bonus, boss, coins, essence, scrap } = LOOT;

      const isBossValue = get(isBoss);
      const stageValue = get(stage);
      const factor = getGrowthTriangular(stageValue) / attenuation;
      const totalBonus = 1 + get(progress) * bonus + get(lootBonus) + (isBossValue ? boss : 0);

      return {
        coins: Math.round((coins + coins * factor) * totalBonus),
        essence: Math.round((essence + essence * factor) * totalBonus),
        gems: isBossValue
          ? 1 + Math.floor((stageValue - BOSS_STAGE_START) / BOSS_STAGE_INTERVAL)
          : 0,
        scrap: Math.round((scrap + scrap * factor) * totalBonus),
      };
    },
    key,
  }),
);

export const monsterPoisonChance = withStateKey("monsterPoisonChance", (key) =>
  selector({
    get: ({ get }) => {
      const stageValue = get(stage);

      const {
        boss,
        chance: { maximum, minimum },
        stageRequired,
      } = POISON;

      if (stageValue < stageRequired) {
        return 0;
      }

      return (minimum + maximum * getGrowthSigmoid(stageValue)) * (get(isBoss) ? boss : 1);
    },
    key,
  }),
);

export const monsterPoisonLength = withStateKey("monsterPoisonLength", (key) =>
  selector({
    get: ({ get }) => {
      const {
        duration: { maximum, minimum },
      } = POISON;

      return Math.round(minimum + maximum * getGrowthSigmoid(get(stage)));
    },
    key,
  }),
);

export const monsterPoisonMagnitude = withStateKey("monsterPoisonMagnitude", (key) =>
  selector({
    get: ({ get }) => {
      const {
        magnitude: { maximum, minimum },
      } = POISON;

      return minimum + maximum * getGrowthSigmoid(get(stage));
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

export const monsterBleedingDelta = withStateKey("monsterBleedingDelta", (key) =>
  atom({
    default: BLEED_DELTA,
    effects: [handleLocalStorage<number>({ key })],
    key,
  }),
);

export const monsterDistance = withStateKey("monsterDistance", (key) =>
  atom({
    default: range,
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
