import { DAMAGE_BASE } from "@neverquest/constants";
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
import { getFromRange } from "@neverquest/utilities/getters";

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
  const { deflectionChanceModifier, penalty, protectionModifier, staminaCostModifier, weight } =
    ARMOR_SPECIFICATIONS[armorClass];

  return {
    armorClass,
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
    price: level * 2 + Math.floor(level / 2),
    protection: Math.round(level * 3 * protectionModifier),
    scrapCost: level * 3 + Math.floor(level / 2),
    staminaCost: staminaCostModifier * Math.floor(level / 2),
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
  const { blockRange, staggerModifier, staminaCostModifier, weight } = SHIELD_SPECIFICATIONS[type];

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
    scrapCost: level * 3 + Math.ceil(level / 1.5),
    staggerChance: (0.1 + Math.floor((level * 2) / 100)) * staggerModifier,
    staminaCost: Math.round(level * staminaCostModifier),
    type,
    weight,
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
  const weapon = {
    abilityChance: 0,
    damage: getFromRange({
      maximum: DAMAGE_BASE + level + Math.ceil(level / 2) * 3,
      minimum: DAMAGE_BASE + level + Math.ceil(level / 2),
    }),
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
    price: Math.floor(level * 1.5 + level / 2),
    rate: getFromRange({ maximum: 3300, minimum: 2800 }) - Math.floor(level / 2) * 50,
    scrapCost: Math.floor(level * 2.5 + level / 2),
    staminaCost: level + Math.floor(level / 2),
    type,
    weaponClass,
    weight: 1 + Math.floor(level / 4),
  };

  switch (weaponClass) {
    case WeaponClass.Blunt: {
      weapon.abilityChance = abilityChanceModifier * (0.1 + Math.floor((level * 2) / 90));
      break;
    }
    case WeaponClass.Piercing: {
      weapon.abilityChance = abilityChanceModifier * (0.2 + Math.floor((level * 2) / 100));
      break;
    }
    case WeaponClass.Slashing: {
      weapon.abilityChance = abilityChanceModifier * (0.15 + Math.floor((level * 2) / 100));
      break;
    }
  }

  return weapon;
}
