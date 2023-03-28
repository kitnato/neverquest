import { ARMOR_SPECIFICATIONS, SHIELD_SPECIFICATIONS } from "@neverquest/data/gear";
import { LOCRA } from "@neverquest/LOCRA";
import {
  AffixTag,
  ArmorClass,
  ArtifactType,
  ShieldType,
  WeaponClass,
  WeaponType,
} from "@neverquest/LOCRA/types";
import { Armor, Shield, Weapon } from "@neverquest/types";
import { WeaponGrip } from "@neverquest/types/enums";
import { getFromRange, getGrowthSigmoid } from "@neverquest/utilities/getters";

export function generateArmor({
  armorClass,
  hasPrefix,
  hasSuffix,
  isNSFW,
  level,
  name,
  tags,
}: {
  armorClass: ArmorClass;
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
  } = ARMOR_SPECIFICATIONS[armorClass];
  const growthFactor = getGrowthSigmoid(level);

  return {
    armorClass,
    coinPrice: Math.round(600 * growthFactor),
    deflectionChance: (0.05 + 0.6 * growthFactor) * deflectionChanceModifier,
    dodgeChanceModifier,
    name:
      name ||
      LOCRA.generateArtifact({
        hasPrefix,
        hasSuffix,
        isNSFW,
        query: {
          type: ArtifactType.Armor,
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
  tags,
  type,
}: {
  hasPrefix?: boolean;
  hasSuffix?: boolean;
  isNSFW: boolean;
  level: number;
  name?: string;
  tags?: AffixTag[];
  type: ShieldType;
}): Shield {
  const { blockRange, staggerModifier, staminaCostModifier, weightModifier } =
    SHIELD_SPECIFICATIONS[type];
  const growthFactor = getGrowthSigmoid(level);

  return {
    blockChance: getFromRange(blockRange),
    coinPrice: Math.round(500 * growthFactor),
    name:
      name ||
      LOCRA.generateArtifact({
        hasPrefix,
        hasSuffix,
        isNSFW,
        query: {
          subtype: type,
          type: ArtifactType.Shield,
        },
        tags,
      }),
    scrapPrice: Math.round(3000 * growthFactor),
    staggerChance: (0.1 + 0.9 * growthFactor) * staggerModifier,
    staminaCost: Math.ceil(40 * growthFactor * staminaCostModifier),
    type,
    weight: Math.ceil(40 * growthFactor * weightModifier),
  };
}

export function generateWeapon({
  hasPrefix,
  hasSuffix,
  isNSFW,
  level,
  tags,
  type,
  weaponClass,
}: {
  hasPrefix?: boolean;
  hasSuffix?: boolean;
  isNSFW: boolean;
  level: number;
  tags?: AffixTag[];
  type: WeaponType;
  weaponClass: WeaponClass;
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
    coinPrice: Math.round(400 * growthFactor),
    damage: getFromRange({ ...ranges.damage }),
    // TODO
    grip: WeaponGrip.OneHanded,
    name: LOCRA.generateArtifact({
      hasPrefix,
      hasSuffix,
      isNSFW,
      query: {
        subtype: type,
        type: ArtifactType.Weapon,
        weaponClass,
      },
      tags,
    }),
    ranges,
    rate: getFromRange({ ...ranges.rate }),
    scrapPrice: Math.round(2500 * growthFactor),
    staminaCost: Math.ceil(50 * growthFactor),
    type,
    weaponClass,
    weight: Math.ceil(30 * growthFactor),
  };

  switch (weaponClass) {
    case WeaponClass.Blunt: {
      weapon.abilityChance = 0.1 + Math.round(0.7 * growthFactor);
      break;
    }
    case WeaponClass.Piercing: {
      weapon.abilityChance = 0.2 + Math.round(0.7 * growthFactor);
      break;
    }
    case WeaponClass.Slashing: {
      weapon.abilityChance = 0.15 + Math.round(0.6 * growthFactor);
      break;
    }
  }

  return weapon;
}
