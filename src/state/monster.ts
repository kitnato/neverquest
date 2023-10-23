import { atom, atomFamily, selector, selectorFamily } from "recoil";

import { ELEMENTALS } from "@neverquest/data/inventory";
import {
  BLIGHT,
  BOSS_STAGE_INTERVAL,
  BOSS_STAGE_START,
  ESSENCE,
  MONSTER_ATTACK_RATE,
  MONSTER_DAMAGE,
  MONSTER_HEALTH,
  POISON,
} from "@neverquest/data/monster";
import { AILMENT_PENALTY, BLEED } from "@neverquest/data/statistics";
import { handleLocalStorage, withStateKey } from "@neverquest/state";
import { isBoss, isStageStarted, progress, stage } from "@neverquest/state/encounter";
import { range, shield, totalElementalEffects, weapon } from "@neverquest/state/gear";
import { essenceBonus } from "@neverquest/state/items";
import { isSkillAcquired } from "@neverquest/state/skills";
import { isTraitAcquired } from "@neverquest/state/traits";
import {
  ELEMENTAL_TYPES,
  MONSTER_AILMENT_TYPES,
  type MonsterAilment,
} from "@neverquest/types/unions";
import { formatValue } from "@neverquest/utilities/formatters";
import {
  getDamagePerRate,
  getFromRange,
  getGrowthSigmoid,
  getGrowthTriangular,
  getLinearMapping,
} from "@neverquest/utilities/getters";

// SELECTORS

export const bleed = withStateKey("bleed", (key) =>
  selector({
    get: ({ get }) => BLEED[get(isTraitAcquired("shredder")) ? "shredder" : "default"],
    key,
  }),
);

export const bleedingDeltaLength = withStateKey("bleedingDeltaLength", (key) =>
  selector({
    get: ({ get }) => {
      const { duration, ticks } = get(bleed);

      return Math.round(duration / ticks);
    },
    key,
  }),
);

export const blightChance = withStateKey("blightChance", (key) =>
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

      return (
        getFromRange({
          factor: getGrowthSigmoid(getLinearMapping({ offset: stageRequired, stage: stageValue })),
          maximum,
          minimum,
        }) * (get(isBoss) ? boss : 1)
      );
    },
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
            return get(isSkillAcquired("anatomy")) && abilityChance > 0 && gearClass === "piercing";
          }

          case "staggered": {
            return get(isSkillAcquired("shieldcraft")) && get(shield).stagger > 0;
          }

          case "stunned": {
            return (
              get(isSkillAcquired("traumatology")) && abilityChance > 0 && gearClass === "blunt"
            );
          }

          case "burning":
          case "frozen":
          case "shocked": {
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
    get: ({ get }) => get(distance) === 0,
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
      const { base, bonus, boss, minimum } = MONSTER_ATTACK_RATE;
      const factor = getGrowthSigmoid(get(stage));

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

export const monsterDamage = withStateKey("monsterDamage", (key) =>
  selector({
    get: ({ get }) => {
      const { attenuation, base, bonus, boss } = MONSTER_DAMAGE;
      const factor = getGrowthTriangular(get(stage)) / attenuation;

      return Math.round(
        (base + base * factor * (1 + get(progress) * bonus)) * (get(isBoss) ? boss : 1),
      );
    },
    key,
  }),
);

export const monsterDamagePerSecond = withStateKey("monsterDamagePerSecond", (key) =>
  selector({
    get: ({ get }) =>
      formatValue({
        format: "float",
        value: getDamagePerRate({
          damage: get(monsterDamage),
          rate: get(monsterAttackRate),
        }),
      }),
    key,
  }),
);

export const monsterDamageTotal = withStateKey("monsterDamageTotal", (key) =>
  selector({
    get: ({ get }) =>
      Math.round(
        get(monsterDamage) * (get(isMonsterAiling("shocked")) ? AILMENT_PENALTY.shocked : 1),
      ),
    key,
  }),
);

export const monsterDamageTotalPerSecond = withStateKey("monsterDamageTotalPerSecond", (key) =>
  selector({
    get: ({ get }) =>
      get(isMonsterAiling("stunned"))
        ? formatValue({
            format: "float",
            value: getDamagePerRate({
              damage: get(monsterDamageTotal),
              damageModifier: 0,
              damageModifierChance: AILMENT_PENALTY.stunned,
              rate: get(monsterAttackRate),
            }),
          })
        : get(monsterDamagePerSecond),
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
      const { attenuation, bonus, boss, essence } = ESSENCE;

      const isBossValue = get(isBoss);
      const stageValue = get(stage);
      const factor = getGrowthTriangular(stageValue) / attenuation;

      return {
        essence: Math.round(
          (essence + essence * factor) * 1 +
            get(progress) * bonus * (isBossValue ? boss : 1) * (1 + get(essenceBonus)),
        ),
        gems: isBossValue
          ? 1 + Math.floor((stageValue - BOSS_STAGE_START) / BOSS_STAGE_INTERVAL)
          : 0,
      };
    },
    key,
  }),
);

export const poison = withStateKey("poison", (key) =>
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

      return (
        getFromRange({
          factor: getGrowthSigmoid(getLinearMapping({ offset: stageRequired, stage: stageValue })),
          maximum,
          minimum,
        }) * (get(isBoss) ? boss : 1)
      );
    },
    key,
  }),
);

export const poisonLength = withStateKey("poisonLength", (key) =>
  selector({
    get: ({ get }) => {
      const {
        duration: { maximum, minimum },
        stageRequired,
      } = POISON;

      return getFromRange({
        factor: getGrowthSigmoid(
          getLinearMapping({
            offset: stageRequired,
            stage: get(stage),
          }),
        ),
        maximum,
        minimum,
      });
    },
    key,
  }),
);

export const poisonMagnitude = withStateKey("poisonMagnitude", (key) =>
  selector({
    get: ({ get }) => {
      const {
        magnitude: { maximum, minimum },
        stageRequired,
      } = POISON;

      return getFromRange({
        factor: getGrowthSigmoid(
          getLinearMapping({
            offset: stageRequired,
            stage: get(stage),
          }),
        ),
        maximum,
        minimum,
      });
    },
    key,
  }),
);

// ATOMS

export const bleedingDelta = withStateKey("bleedingDelta", (key) =>
  atom({
    default: bleedingDeltaLength,
    effects: [handleLocalStorage({ key })],
    key,
  }),
);

export const distance = withStateKey("distance", (key) =>
  atom({
    default: range,
    effects: [handleLocalStorage({ key })],
    key,
  }),
);

export const isMonsterNew = withStateKey("isMonsterNew", (key) =>
  atom({
    default: false,
    effects: [handleLocalStorage({ key })],
    key,
  }),
);

export const monsterAilmentDuration = withStateKey("monsterAilmentDuration", (key) =>
  atomFamily<number, MonsterAilment>({
    default: 0,
    effects: (parameter) => [handleLocalStorage({ key, parameter })],
    key,
  }),
);

export const monsterAttackDuration = withStateKey("monsterAttackDuration", (key) =>
  atom({
    default: 0,
    effects: [handleLocalStorage({ key })],
    key,
  }),
);

export const monsterElement = withStateKey("monsterElement", (key) =>
  atom<HTMLDivElement | null>({
    default: null,
    effects: [handleLocalStorage({ key })],
    key,
  }),
);

export const monsterHealth = withStateKey("monsterHealth", (key) =>
  atom({
    default: monsterHealthMaximum,
    effects: [handleLocalStorage({ key })],
    key,
  }),
);

export const monsterName = withStateKey("monsterName", (key) =>
  atom<string | null>({
    default: null,
    effects: [handleLocalStorage({ key })],
    key,
  }),
);
