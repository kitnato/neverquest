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
  const { blockRange, staggerModifier, staminaCost, weight } = SHIELD_SPECIFICATIONS[type];

  return {
    blockChance: getFromRange(blockRange),
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
    staggerChance: (0.1 + Math.floor((level * 2) / 100)) * staggerModifier,
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
  const { damage, modifier, price, rate, staminaCost, weight } = getWeaponSpecifications(level);

  const weapon = {
    abilityChance: 0,
    bleedChance: 0,
    damage,
    // TODO
    grip: WeaponGrip.OneHanded,
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

  switch (weaponClass) {
    case WeaponClass.Blunt:
      weapon.abilityChance = modifier * (0.1 + Math.floor((level * 2) / 90));
      break;
    case WeaponClass.Piercing:
      weapon.abilityChance = modifier * (0.2 + Math.floor((level * 2) / 100));
      break;
    case WeaponClass.Slashing:
      weapon.abilityChance = modifier * (0.15 + Math.floor((level * 2) / 100));
      break;
  }

  return weapon;
}
