import LOCRA from "locra";
import { AffixTag, ArtifactType, WeaponType } from "locra/env.d";
import { Weapon, WeaponWeight } from "neverquest/env.d";
import { WEAPON_SPECIFICATIONS } from "neverquest/utilities/constants";
import { getFromRange } from "neverquest/utilities/helpers";

export function generateWeapon({
  hasPrefix,
  hasSuffix,
  isNSFW,
  level,
  name,
  price,
  tags,
  type,
  weight,
}: {
  hasPrefix?: boolean;
  hasSuffix?: boolean;
  isNSFW: boolean;
  level: number;
  name?: string;
  price: number;
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
    price,
    rate: getFromRange(rateRange),
    staminaCost,
    type,
    weight,
  };
}
