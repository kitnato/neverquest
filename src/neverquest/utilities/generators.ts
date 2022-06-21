import LOCRA from "locra";
import { AffixTag, ArtifactType, ShieldType, WeaponType } from "locra/types";
import { Armor, ArmorClass, Shield, Weapon, WeaponClass } from "neverquest/types/core";
import {
  ARMOR_SPECIFICATIONS,
  SHIELD_SPECIFICATIONS,
  WEAPON_SPECIFICATIONS,
} from "neverquest/utilities/constants-equipment";
import { getFromRange } from "neverquest/utilities/helpers";

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
  const { protectionModifier, weight } = ARMOR_SPECIFICATIONS[armorClass];

  return {
    armorClass,
    name:
      name ||
      LOCRA.generateArtifact({
        hasPrefix,
        hasSuffix,
        isNSFW,
        tags,
        query: {
          type: ArtifactType.Armor,
        },
      }),
    price: level * 2 + Math.floor(level / 2),
    protection: Math.floor(level * protectionModifier),
    weight,
  };
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
  const { blockRange, staggerModifier, staminaCost, weight } = SHIELD_SPECIFICATIONS[type];

  return {
    block: getFromRange(blockRange),
    name:
      name ||
      LOCRA.generateArtifact({
        hasPrefix,
        hasSuffix,
        isNSFW,
        tags,
        query: {
          subtype: type,
          type: ArtifactType.Shield,
        },
      }),
    price: level * 2 + Math.ceil(level / 1.5),
    stagger: (800 + Math.floor(level * 10)) * staggerModifier,
    staminaCost,
    type,
    weight,
  };
}

export function generateWeapon({
  hasPrefix,
  hasSuffix,
  isNSFW,
  level,
  name,
  tags,
  type,
  weaponClass,
}: {
  hasPrefix?: boolean;
  hasSuffix?: boolean;
  isNSFW: boolean;
  level: number;
  name?: string;
  tags?: AffixTag[];
  type: WeaponType;
  weaponClass: WeaponClass;
}): Weapon {
  const { damageModifier, rateRange, staminaCost, weight } = WEAPON_SPECIFICATIONS[weaponClass];

  return {
    damage: Math.ceil(level * damageModifier),
    name:
      name ||
      LOCRA.generateArtifact({
        hasPrefix,
        hasSuffix,
        isNSFW,
        tags,
        query: {
          subtype: type,
          type: ArtifactType.Weapon,
        },
      }),
    price: level * 2 + Math.floor(level / 2),
    rate: getFromRange(rateRange),
    staminaCost,
    type,
    weaponClass,
    weight,
  };
}
