import LOCRA from "locra";
import { AffixTag, ArmorType, ArtifactType, WeaponType } from "locra/env.d";
import { Armor, Weapon, WeaponWeight } from "neverquest/env.d";
import { WEAPON_SPECIFICATIONS } from "neverquest/utilities/constants";
import { getFromRange } from "neverquest/utilities/helpers";

export function generateArmor({
  hasPrefix,
  hasSuffix,
  isNSFW,
  level,
  name,
  subtype,
  tags,
}: {
  hasPrefix?: boolean;
  hasSuffix?: boolean;
  isNSFW: boolean;
  level: number;
  name?: string;
  subtype?: ArmorType;
  tags?: AffixTag[];
}): Armor {
  const armorTypes = Object.values(ArmorType);

  return {
    name:
      name ||
      LOCRA.generateArtifact({
        hasPrefix,
        hasSuffix,
        isNSFW,
        tags,
        query: {
          subtype: subtype || armorTypes[Math.floor(Math.random() * armorTypes.length)],
          type: ArtifactType.Armor,
        },
      }),
    price: level * 2 + Math.floor(level / 2),
    value: level + 1,
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
