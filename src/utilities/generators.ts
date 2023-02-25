import { ARMOR_SPECIFICATIONS, SHIELD_SPECIFICATIONS } from "@neverquest/data/gear";
import { LOCRA } from "@neverquest/LOCRA";
import {
  AffixTag,
  ArtifactType,
  ShieldType,
  WeaponClass,
  WeaponType,
} from "@neverquest/LOCRA/types";
import { Armor, Shield, Weapon } from "@neverquest/types";
import { ArmorClass, WeaponGrip } from "@neverquest/types/enums";
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
    penalty,
    protectionModifier,
    staminaCostModifier,
    weightModifier,
  } = ARMOR_SPECIFICATIONS[armorClass];
  const growthFactor = getGrowthSigmoid(level);

  return {
    armorClass,
    coinPrice: 4 + Math.round(400 * growthFactor),
    deflectionChance: deflectionChanceModifier
      ? deflectionChanceModifier * (0.1 + level / 5)
      : undefined,
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
    penalty,
    protection: 2 + Math.round(300 * growthFactor) * protectionModifier,
    scrapPrice: 3 + Math.round(1500 * growthFactor),
    staminaCost: (1 + Math.round(10 * growthFactor)) * staminaCostModifier,
    weight: (1 + Math.round(10 * growthFactor)) * weightModifier,
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
    coinPrice: 10 + Math.round(300 * growthFactor),
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
    scrapPrice: 5 + Math.round(2000 * growthFactor),
    staggerChance: (0.1 + Math.round(0.9 * growthFactor)) * staggerModifier,
    staminaCost: (1 + Math.round(20 * growthFactor)) * staminaCostModifier,
    type,
    weight: (1 + Math.round(10 * growthFactor)) * weightModifier,
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
  // TODO - create a WEAPON_SPECIFICATIONS?
  const abilityChanceModifier = 1 + level / 2;
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
    coinPrice: 2 + Math.round(200 * growthFactor),
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
    scrapPrice: 3 + Math.round(1000 * growthFactor),
    staminaCost: 1 + Math.round(25 * growthFactor),
    type,
    weaponClass,
    weight: 1 + Math.round(10 * growthFactor),
  };

  switch (weaponClass) {
    case WeaponClass.Blunt: {
      weapon.abilityChance = abilityChanceModifier * (0.1 + Math.round(0.8 * growthFactor));
      break;
    }
    case WeaponClass.Piercing: {
      weapon.abilityChance = abilityChanceModifier * (0.2 + Math.round(0.7 * growthFactor));
      break;
    }
    case WeaponClass.Slashing: {
      weapon.abilityChance = abilityChanceModifier * (0.15 + Math.round(0.85 * growthFactor));
      break;
    }
  }

  return weapon;
}
