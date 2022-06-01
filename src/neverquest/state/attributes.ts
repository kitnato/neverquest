import { atom } from "jotai";
import { atomWithReset } from "jotai/utils";

import { characterLevel } from "neverquest/state/character";
import { essence } from "neverquest/state/resources";
import { Attribute } from "neverquest/types/core";
import { getTriangularNumber } from "neverquest/utilities/helpers";

// PRIMITIVES

export const attackRateBonus = atomWithReset<Attribute>({
  base: 0,
  canAssign: true,
  description: "Reduce attack rate",
  increment: 0.03,
  name: "Speed",
  points: 0,
});

export const criticalChance = atomWithReset<Attribute>({
  base: 0,
  canAssign: false,
  description: "Increase critical hit chance",
  increment: 0.03,
  name: "Dexterity",
  points: 0,
});

export const criticalDamage = atomWithReset<Attribute>({
  base: 1.5,
  canAssign: false,
  description: "Increase critical hit damage",
  increment: 0.15,
  name: "Perception",
  points: 0,
});

export const damage = atomWithReset<Attribute>({
  base: 0,
  canAssign: true,
  description: "Increase base attack damage",
  increment: 1,
  name: "Strength",
  points: 0,
});

export const dodgeChance = atomWithReset<Attribute>({
  base: 0,
  canAssign: false,
  description: "Increase chance to dodge an attack",
  increment: 0.04,
  name: "Agility",
  points: 0,
});

export const health = atomWithReset<Attribute>({
  base: 8,
  canAssign: true,
  description: "Increase maximum total health",
  increment: 4,
  name: "Vitality",
  points: 0,
});

export const healthRegenerationRate = atomWithReset<Attribute>({
  base: 8000,
  canAssign: true,
  description: "Increase health regeneration rate",
  increment: -200,
  name: "Vigor",
  points: 0,
});

export const lootBonus = atomWithReset<Attribute>({
  base: 0,
  canAssign: false,
  description: "Increase amount of loot dropped by monsters",
  increment: 0.03,
  name: "Luck",
  points: 0,
});

export const recoveryRate = atomWithReset<Attribute>({
  base: 1500,
  canAssign: true,
  description: "Reduce recovery rate",
  increment: -100,
  name: "Resilience",
  points: 0,
});

export const stamina = atomWithReset<Attribute>({
  base: 4,
  canAssign: false,
  description: "Increase maximum total stamina",
  increment: 2,
  name: "Endurance",
  points: 0,
});

export const staminaRegenerationRate = atomWithReset<Attribute>({
  base: 5500,
  canAssign: false,
  description: "Increase stamina regeneration rate",
  increment: -150,
  name: "Fortitude",
  points: 0,
});

// READERS

export const attributeCost = atom((get) => getTriangularNumber(get(characterLevel) + 1));

export const attributesIncreasable = atom((get) => get(attributeCost) <= get(essence));
