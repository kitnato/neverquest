import { ARMOR_SPECIFICATIONS, SHIELD_SPECIFICATIONS } from "@neverquest/data/gear";
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
  artifactClass,
  hasPrefix,
  hasSuffix,
  isNSFW,
  level,
  name,
  tags,
}: {
  artifactClass: ArmorClass;
  hasPrefix?: boolean;
  hasSuffix?: boolean;
  isNSFW: boolean;
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
  } = ARMOR_SPECIFICATIONS[artifactClass];
  const growthFactor = getGrowthSigmoid(level);

  return {
    artifactClass,
    coinPrice: Math.round(600 * growthFactor),
    deflectionChance: (0.05 + 0.6 * growthFactor) * deflectionChanceModifier,
    dodgeChanceModifier,
    name:
      name ??
      LOCRA.generateArtifact({
        hasPrefix,
        hasSuffix,
        isNSFW,
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

export function generateLocation({ isNSFW, level }: { isNSFW: boolean; level: number }) {
  return LOCRA.generateLocation({
    hasPrefix: Math.random() < 0.8,
    hasSuffix: Math.random() < 0.1 * Math.ceil(level / 2),
    isNSFW,
  });
}

export function generateShield({
  hasPrefix,
  hasSuffix,
  isNSFW,
  level,
  name,
  size,
  tags,
}: {
  hasPrefix?: boolean;
  hasSuffix?: boolean;
  isNSFW: boolean;
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
    name:
      name ??
      LOCRA.generateArtifact({
        hasPrefix,
        hasSuffix,
        isNSFW,
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
  artifactClass,
  hasPrefix,
  hasSuffix,
  isNSFW,
  level,
  modality,
  tags,
}: {
  artifactClass: WeaponClass;
  hasPrefix?: boolean;
  hasSuffix?: boolean;
  isNSFW: boolean;
  level: number;
  modality: WeaponModality;
  tags?: AffixTag[];
}): Weapon {
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
  const weapon = {
    abilityChance: 0,
    artifactClass,
    coinPrice: Math.round(400 * growthFactor),

    damage: getFromRange({ ...ranges.damage }),
    // TODO
    grip: WeaponGrip.OneHanded,
    modality,
    name: LOCRA.generateArtifact({
      hasPrefix,
      hasSuffix,
      isNSFW,
      query: {
        artifactClass: artifactClass,
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

  switch (artifactClass) {
    case "blunt": {
      weapon.abilityChance = 0.1 + Math.round(0.7 * growthFactor);
      break;
    }
    case "piercing": {
      weapon.abilityChance = 0.2 + Math.round(0.7 * growthFactor);
      break;
    }
    case "slashing": {
      weapon.abilityChance = 0.15 + Math.round(0.6 * growthFactor);
      break;
    }
  }

  return weapon;
}
