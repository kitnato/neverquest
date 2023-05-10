import {
  ARMOR_SPECIFICATIONS,
  SHIELD_SPECIFICATIONS,
  WEAPON_SPECIFICATIONS,
} from "@neverquest/data/gear";
import { LOCRA } from "@neverquest/LOCRA";
import type {
  AffixTag,
  ArmorClass,
  ShieldSize,
  WeaponClass,
  WeaponModality,
} from "@neverquest/LOCRA/types";
import type { Armor, Shield, Weapon } from "@neverquest/types";
import { WeaponGrip } from "@neverquest/types/enums";
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
  const {
    deflectionChanceModifier,
    dodgeChanceModifier,
    dodgeCostModifier,
    protectionModifier,
    weightModifier,
  } = ARMOR_SPECIFICATIONS[gearClass];
  const growthFactor = getGrowthSigmoid(level);

  return {
    coinPrice: Math.round(600 * growthFactor),
    deflectionChance: (0.05 + 0.6 * growthFactor) * deflectionChanceModifier,
    dodgeChanceModifier,
    gearClass,
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
    protection: Math.round(300 * growthFactor * protectionModifier),
    scrapPrice: Math.round(3500 * growthFactor),
    staminaCost: Math.ceil(30 * growthFactor * dodgeCostModifier),
    weight: Math.ceil(50 * growthFactor * weightModifier),
  };
}

export function generateLocation({ allowNSFW, level }: { allowNSFW: boolean; level: number }) {
  return LOCRA.generateLocation({
    allowNSFW,
    hasPrefix: Math.random() < 0.8,
    hasSuffix: Math.random() < 0.1 * Math.round(level / 2),
  });
}

export function generateShield({
  allowNSFW,
  hasPrefix,
  hasSuffix,
  level,
  name,
  size,
  tags,
}: {
  allowNSFW: boolean;
  hasPrefix?: boolean;
  hasSuffix?: boolean;
  level: number;
  name?: string;
  size: ShieldSize;
  tags?: AffixTag[];
}): Shield {
  const { blockRange, staggerModifier, staminaCostModifier, weightModifier } =
    SHIELD_SPECIFICATIONS[size];
  const growthFactor = getGrowthSigmoid(level);

  return {
    blockChance: getFromRange(blockRange),
    coinPrice: Math.round(500 * growthFactor),
    level,
    name:
      name ??
      LOCRA.generateArtifact({
        allowNSFW,
        hasPrefix,
        hasSuffix,
        query: {
          subtype: size,
          type: "shield",
        },
        tags,
      }),
    scrapPrice: Math.round(3000 * growthFactor),
    size,
    staggerChance: (0.1 + 0.9 * growthFactor) * staggerModifier,
    staminaCost: Math.ceil(40 * growthFactor * staminaCostModifier),
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
    damage: {
      maximum: Math.round(1300 * growthFactor),
      minimum: Math.round(1000 * growthFactor),
    },
    rate: {
      maximum: 3500 - Math.round(3000 * growthFactor),
      minimum: 3300 - Math.round(3000 * growthFactor),
    },
  };

  return {
    abilityChance: abilityChance.minimum + Math.round(abilityChance.maximum * growthFactor),
    coinPrice: Math.round(400 * growthFactor),
    damage: getFromRange({ ...ranges.damage }),

    gearClass,
    // TODO
    grip: WeaponGrip.OneHanded,
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
    rate: getFromRange({ ...ranges.rate }),
    scrapPrice: Math.round(2500 * growthFactor),
    staminaCost: Math.ceil(50 * growthFactor),
    weight: Math.ceil(30 * growthFactor),
  };
}
