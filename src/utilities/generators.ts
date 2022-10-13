import { ARMOR_SPECIFICATIONS, SHIELD_SPECIFICATIONS } from "@neverquest/constants/gear";
import LOCRA from "@neverquest/locra";
import {
  AffixTag,
  ArtifactType,
  ShieldType,
  WeaponClass,
  WeaponType,
} from "@neverquest/locra/types";
import { Armor, Shield, Weapon } from "@neverquest/types";
import { ArmorClass, WeaponGrip } from "@neverquest/types/enums";
import { getFromRange, getWeaponSpecifications } from "@neverquest/utilities/helpers";

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
        query: {
          type: ArtifactType.Armor,
        },
        tags,
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
        query: {
          subtype: type,
          type: ArtifactType.Shield,
        },
        tags,
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
  const { damage, price, rate, staminaCost, weight } = getWeaponSpecifications(level);

  return {
    damage,
    grip: WeaponGrip.OneHanded, // TODO
    name:
      name ||
      LOCRA.generateArtifact({
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
    price,
    rate,
    staminaCost,
    type,
    weaponClass,
    weight,
  };
}
