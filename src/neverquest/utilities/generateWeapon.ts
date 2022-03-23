import { Weapon, WeaponType } from "neverquest/env.d";
import { WEAPON_SPECIFICATIONS } from "neverquest/utilities/constants";
import { getFromRange } from "neverquest/utilities/helpers";
import SLIM from "locra";
import { SLIMCategory } from "locra/env";

export function generateWeapon({
  level,
  name,
  type,
}: {
  level: number;
  name?: string;
  type: WeaponType;
}): Weapon {
  const { damageModifier, rateRange, staminaCost, type: weaponType } = WEAPON_SPECIFICATIONS[type];
  const baseDamage = Math.ceil(level * damageModifier);

  return {
    damage: { minimum: baseDamage, maximum: baseDamage + level },
    name: name || SLIM.generate(SLIMCategory.Item),
    rate: getFromRange(rateRange),
    staminaCost,
    type: weaponType,
  };
}
