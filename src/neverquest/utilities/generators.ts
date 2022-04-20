import LOCRA from "locra";
import { AffixTag, ArtifactType, WeaponType } from "locra/env";
import { Armor, ArmorWeight, Weapon, WeaponWeight } from "neverquest/env";
import { ARMOR_SPECIFICATIONS, WEAPON_SPECIFICATIONS } from "neverquest/utilities/constants";
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
  weight: Exclude<ArmorWeight, ArmorWeight.None>;
}): Armor {
  const { protectionModifier } = ARMOR_SPECIFICATIONS[weight];

  return {
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
  weight: Exclude<WeaponWeight, WeaponWeight.None>;
}): Weapon {
  const { damageModifier, rateRange, staminaCost } = WEAPON_SPECIFICATIONS[weight];

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
    weight,
  };
}
