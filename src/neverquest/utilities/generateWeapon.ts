import LOCRA from "locra";
import { AffixTag, ArtifactType, WeaponType } from "locra/env.d";
import { Weapon, WeaponWeight } from "neverquest/env.d";
import { WEAPON_SPECIFICATIONS } from "neverquest/utilities/constants";
import { getFromRange } from "neverquest/utilities/helpers";

export function generateWeapon({
  cost,
  hasPrefix,
  hasSuffix,
  isNSFW,
  level,
  name,
  tags,
  type,
  weight,
}: {
  cost: number;
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
  const baseDamage = Math.ceil(level * damageModifier);

  return {
    cost,
    damage: { minimum: baseDamage, maximum: baseDamage + level },
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
    rate: getFromRange(rateRange),
    staminaCost,
    type,
    weight,
  };
}
