import { atom } from "jotai";
import { atomWithReset } from "jotai/utils";

import { characterLevel } from "@neverquest/state/character";
import { essence } from "@neverquest/state/resources";
import { AttributeType } from "@neverquest/types/enums";
import { getTriangularNumber } from "@neverquest/utilities/helpers";

// PRIMITIVES

export const attributes = atomWithReset<
  Record<AttributeType, { canAssign: boolean; points: number }>
>({
  [AttributeType.AttackRateBonus]: {
    canAssign: true,
    points: 0,
  },
  [AttributeType.CriticalChance]: {
    canAssign: false,
    points: 0,
  },
  [AttributeType.CriticalDamage]: {
    canAssign: false,
    points: 0,
  },
  [AttributeType.Damage]: {
    canAssign: true,
    points: 0,
  },
  [AttributeType.DodgeChance]: {
    canAssign: false,
    points: 0,
  },
  [AttributeType.Health]: {
    canAssign: true,
    points: 0,
  },
  [AttributeType.HealthRegenerationRate]: {
    canAssign: false,
    points: 0,
  },
  [AttributeType.LootBonus]: {
    canAssign: false,
    points: 0,
  },
  [AttributeType.RecoveryRate]: {
    canAssign: true,
    points: 0,
  },
  [AttributeType.Stamina]: {
    canAssign: false,
    points: 0,
  },
  [AttributeType.StaminaRegenerationRate]: {
    canAssign: false,
    points: 0,
  },
});

// READERS

export const attributeCost = atom((get) => getTriangularNumber(get(characterLevel) + 1));

export const attributesIncreasable = atom((get) => get(attributeCost) <= get(essence));
