import LOCRA from "locra";
import { AffixTag, ArtifactType, ShieldType, WeaponType } from "locra/env";
import { Armor, ArmorWeight, Shield, Weapon, WeaponWeight } from "neverquest/env";
import {
  ARMOR_SPECIFICATIONS,
  SHIELD_SPECIFICATIONS,
  WEAPON_SPECIFICATIONS,
} from "neverquest/utilities/constants";
import { getFromRange } from "neverquest/utilities/helpers";

export function generateArmor({
  hasPrefix,
  hasSuffix,
  isNSFW,
  level,
  name,
  tags,
  weight,
}: {
  hasPrefix?: boolean;
  hasSuffix?: boolean;
  isNSFW: boolean;
  level: number;
  name?: string;
  tags?: AffixTag[];
  weight: ArmorWeight;
}): Armor {
  const { encumbrance, protectionModifier } = ARMOR_SPECIFICATIONS[weight];

  return {
    encumbrance,
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
  const { blockRange, encumbrance, staggerModifier } = SHIELD_SPECIFICATIONS[type];

  return {
    block: getFromRange(blockRange),
    encumbrance,
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
    stagger: (500 + Math.floor(level * 10)) * staggerModifier,
    type,
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
  weight,
}: {
  hasPrefix?: boolean;
  hasSuffix?: boolean;
  isNSFW: boolean;
  level: number;
  name?: string;
  tags?: AffixTag[];
  type: WeaponType;
  weight: WeaponWeight;
}): Weapon {
  const { damageModifier, encumbrance, rateRange, staminaCost } = WEAPON_SPECIFICATIONS[weight];

  return {
    damage: Math.ceil(level * damageModifier),
    encumbrance,
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
    weight,
  };
}
