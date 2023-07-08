import { nanoid } from "nanoid";

import {
  ARMOR_SPECIFICATIONS,
  SHIELD_SPECIFICATIONS,
  WEAPON_SPECIFICATIONS,
} from "@neverquest/data/inventory";
import { ATTACK_RATE_ATTENUATION } from "@neverquest/data/statistics";
import { LOCRA } from "@neverquest/LOCRA";
import type {
  AffixTag,
  ArmorClass,
  ShieldClass,
  WeaponClass,
  WeaponModality,
} from "@neverquest/LOCRA/types";
import type { Armor, Shield, Weapon } from "@neverquest/types";
import { getFromRange, getGrowthSigmoid } from "@neverquest/utilities/getters";

export function generateArmor({
  allowNSFW,
  gearClass,
  hasPrefix,
  hasSuffix,
  level,
  name,
  tags,
}: {
  allowNSFW: boolean;
  gearClass: ArmorClass;
  hasPrefix?: boolean;
  hasSuffix?: boolean;
  level: number;
  name?: string;
  tags?: AffixTag[];
}): Armor {
  const { deflectionRange, dodgeCostModifier, priceModifier, protectionModifier, weightModifier } =
    ARMOR_SPECIFICATIONS[gearClass];
  const growthFactor = getGrowthSigmoid(level);
  const ranges = {
    deflection: {
      maximum: deflectionRange.maximum - (deflectionRange.maximum / 2) * (1 - growthFactor),
      minimum: deflectionRange.minimum - (deflectionRange.minimum / 2) * (1 - growthFactor),
    },
  };

  return {
    // TODO - base to /data.
    coinPrice: Math.round(500 * growthFactor * priceModifier),
    deflection: getFromRange(ranges.deflection),
    gearClass,
    id: nanoid(),
    isEquipped: false,
    level,
    name:
      name ??
      LOCRA.generateArtifact({
        allowNSFW,
        hasPrefix,
        hasSuffix,
        query: {
          type: "armor",
        },
        tags,
      }),
    // TODO - base to /data.
    protection: Math.round(300 * growthFactor * protectionModifier),
    ranges,
    scrapPrice: Math.round(3500 * growthFactor * priceModifier),
    staminaCost: Math.ceil(25 * growthFactor * dodgeCostModifier),
    weight: Math.ceil(50 * growthFactor * weightModifier),
  };
}

export function generateWilderness({ allowNSFW, stage }: { allowNSFW: boolean; stage: number }) {
  const growthFactor = getGrowthSigmoid(stage);

  return LOCRA.generateLocation({
    allowNSFW,
    // TODO - base to /data.
    hasPrefix: Math.random() < 0.7 + 0.3 * growthFactor,
    hasSuffix: Math.random() < 0.1 + 0.7 * growthFactor,
  });
}

export function generateShield({
  allowNSFW,
  gearClass,
  hasPrefix,
  hasSuffix,
  level,
  name,
  tags,
}: {
  allowNSFW: boolean;
  gearClass: ShieldClass;
  hasPrefix?: boolean;
  hasSuffix?: boolean;
  level: number;
  name?: string;
  tags?: AffixTag[];
}): Shield {
  const { blockRange, staggerModifier, staminaCostModifier, weightModifier } =
    SHIELD_SPECIFICATIONS[gearClass];
  const growthFactor = getGrowthSigmoid(level);
  const ranges = {
    block: {
      maximum: blockRange.maximum - (blockRange.maximum / 2) * (1 - growthFactor),
      minimum: blockRange.minimum,
    },
  };

  return {
    block: getFromRange(ranges.block),
    // TODO - base to /data.
    coinPrice: Math.round(400 * growthFactor),
    gearClass,
    id: nanoid(),
    isEquipped: false,
    level,
    name:
      name ??
      LOCRA.generateArtifact({
        allowNSFW,
        hasPrefix,
        hasSuffix,
        query: {
          subtype: gearClass,
          type: "shield",
        },
        tags,
      }),
    ranges,
    // TODO - base to /data.
    scrapPrice: Math.round(3000 * growthFactor),
    stagger: (0.1 + 0.9 * growthFactor) * staggerModifier,
    staminaCost: Math.ceil(30 * growthFactor * staminaCostModifier),
    weight: Math.ceil(40 * growthFactor * weightModifier),
  };
}

export function generateWeapon({
  allowNSFW,
  gearClass,
  hasPrefix,
  hasSuffix,
  level,
  modality,
  tags,
}: {
  allowNSFW: boolean;
  gearClass: WeaponClass;
  hasPrefix?: boolean;
  hasSuffix?: boolean;
  level: number;
  modality: WeaponModality;
  tags?: AffixTag[];
}): Weapon {
  const { abilityChance } = WEAPON_SPECIFICATIONS[gearClass];
  const growthFactor = getGrowthSigmoid(level);
  const ranges = {
    ability: {
      maximum: abilityChance.maximum - (abilityChance.maximum / 2) * (1 - growthFactor),
      minimum: abilityChance.minimum,
    },
    damage: {
      // TODO - base to /data.
      maximum: Math.round(1200 * growthFactor),
      minimum: Math.round(1000 * growthFactor),
    },
    rate: {
      // TODO - base to /data.
      maximum: 3500 - Math.round(ATTACK_RATE_ATTENUATION * growthFactor),
      minimum: 3300 - Math.round(ATTACK_RATE_ATTENUATION * growthFactor),
    },
  };

  return {
    abilityChance: getFromRange(ranges.ability),
    // TODO - base to /data.
    coinPrice: Math.round(300 * growthFactor),
    damage: getFromRange(ranges.damage),
    gearClass,
    // TODO
    grip: "one-handed",
    id: nanoid(),
    isEquipped: false,
    level,
    modality,
    name: LOCRA.generateArtifact({
      allowNSFW,
      hasPrefix,
      hasSuffix,
      query: {
        artifactClass: gearClass,
        subtype: modality,
        type: "weapon",
      },
      tags,
    }),
    ranges,
    rate: getFromRange(ranges.rate),
    // TODO - base to /data.
    scrapPrice: Math.round(2500 * growthFactor),
    staminaCost: Math.ceil(40 * growthFactor),
    weight: Math.ceil(30 * growthFactor),
  };
}
