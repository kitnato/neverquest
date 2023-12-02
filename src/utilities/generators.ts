import { nanoid } from "nanoid";

import { ARMOR_SPECIFICATIONS, SHIELD_SPECIFICATIONS, WEAPON_BASE } from "@neverquest/data/gear";
import { generateArtifact } from "@neverquest/LOCRAN/generate/generateArtifact";
import type {
  ArmorClass,
  GeneratorParameters,
  ShieldClass,
  WeaponClass,
} from "@neverquest/LOCRAN/types";
import type { Armor, Melee, Ranged, Shield } from "@neverquest/types";
import { isGeneratorRange } from "@neverquest/types/type-guards";
import type { Grip } from "@neverquest/types/unions";
import {
  getArmorRanges,
  getFromRange,
  getGearPrice,
  getGrowthSigmoid,
  getMeleeRanges,
  getRangedRanges,
  getShieldRanges,
} from "@neverquest/utilities/getters";

export function generateArmor({
  gearClass,
  level,
  ...generatorParameters
}: GeneratorParameters & {
  gearClass: ArmorClass;
  level: number;
}): Armor {
  const factor = getGrowthSigmoid(level);
  const { deflection, protection, staminaCost, weight } = getArmorRanges({
    factor,
    gearClass,
  });

  return {
    deflection: deflection === undefined ? 0 : getFromRange(deflection),
    gearClass,
    gems: [],
    ID: nanoid(),
    isEquipped: false,
    level,
    name: generateArtifact({
      query: {
        type: "armor",
      },
      ...generatorParameters,
    }),
    price: getGearPrice({
      factor,
      ...ARMOR_SPECIFICATIONS[gearClass],
    }),
    protection: getFromRange(protection),
    staminaCost: isGeneratorRange(staminaCost) ? getFromRange(staminaCost) : staminaCost,
    weight: getFromRange(weight),
  };
}

export function generateMeleeWeapon({
  gearClass,
  grip,
  level,
  ...generatorParameters
}: GeneratorParameters & {
  gearClass: WeaponClass;
  grip: Grip;
  level: number;
}): Melee {
  const factor = getGrowthSigmoid(level);
  const { abilityChance, damage, rate, staminaCost, weight } = getMeleeRanges({
    factor,
    gearClass,
    grip,
  });

  return {
    abilityChance: getFromRange(abilityChance),
    damage: getFromRange(damage),
    gearClass,
    gems: [],
    grip,
    ID: nanoid(),
    isEquipped: false,
    level,
    name: generateArtifact({
      query: {
        artifactClass: gearClass,
        subtype: "melee",
        type: "weapon",
      },
      ...generatorParameters,
    }),
    price: getGearPrice({ factor, ...WEAPON_BASE }),
    rate: getFromRange(rate),
    staminaCost: getFromRange(staminaCost),
    weight: getFromRange(weight),
  };
}

export function generateRangedWeapon({
  gearClass,
  level,
  ...generatorParameters
}: GeneratorParameters & {
  gearClass: WeaponClass;
  level: number;
}): Ranged {
  const factor = getGrowthSigmoid(level);
  const { abilityChance, ammunitionCost, damage, range, rate, staminaCost, weight } =
    getRangedRanges({
      factor,
      gearClass,
    });

  return {
    abilityChance: getFromRange(abilityChance),
    ammunitionCost: getFromRange(ammunitionCost),
    damage: getFromRange(damage),
    gearClass,
    gems: [],
    ID: nanoid(),
    isEquipped: false,
    level,
    name: generateArtifact({
      query: {
        artifactClass: gearClass,
        subtype: "ranged",
        type: "weapon",
      },
      ...generatorParameters,
    }),
    price: getGearPrice({ factor, ...WEAPON_BASE }),
    range: getFromRange(range),
    rate: getFromRange(rate),
    staminaCost: getFromRange(staminaCost),
    weight: getFromRange(weight),
  };
}

export function generateShield({
  gearClass,
  level,
  ...generatorParameters
}: GeneratorParameters & {
  gearClass: ShieldClass;
  level: number;
}): Shield {
  const factor = getGrowthSigmoid(level);
  const { block, stagger, staminaCost, weight } = getShieldRanges({
    factor,
    gearClass,
  });

  return {
    block: getFromRange(block),
    gearClass,
    gems: [],
    ID: nanoid(),
    isEquipped: false,
    level,
    name: generateArtifact({
      query: {
        subtype: gearClass,
        type: "shield",
      },
      ...generatorParameters,
    }),
    price: getGearPrice({
      factor,
      ...SHIELD_SPECIFICATIONS[gearClass],
    }),
    stagger: stagger === undefined ? 0 : getFromRange(stagger),
    staminaCost: getFromRange(staminaCost),
    weight: getFromRange(weight),
  };
}
